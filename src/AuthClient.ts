import type { App, Ref } from 'vue';

import axios, { AxiosInstance} from "axios";
import {Buffer} from "buffer";
import { ref } from 'vue';
import { VEDA_INJECTION_KEY, VEDA_TOKEN } from './token';
import {bindPluginMethods} from './utils';

export interface Config {
    clientId: string;
    clientSecret: string;
    vedaAuthBaseUrl: string;
    redirectUri: string;
}

export interface Data {
    custos_client_secret: string;
    authorization_endpoint: string;
}

export interface TokenRequest {
    code: string;
    redirect_uri?: string;
    grant_type?: string;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
}

export interface UserInfoResponse {
    sub: string;
    name: string;
    email: string;
    preferred_username: string;
}

class AuthVueClient {

    private config: Config;
    private axiosInstance: AxiosInstance;
    public isAuthenticated: Ref<boolean>;
    public user: Ref<UserInfoResponse | null>;

    constructor(config: Config) {
        this.config = config;
        this.axiosInstance = axios.create({
            baseURL: this.config.vedaAuthBaseUrl,
            withCredentials: false,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        bindPluginMethods(this, ['constructor']);

        this.isAuthenticated = ref(false);
        this.user = ref(null);
    }
    install(app: App) {
        app.config.globalProperties[VEDA_TOKEN] = this;
        app.provide(VEDA_INJECTION_KEY, this as AuthVueClient);
    }

    private async getClientSecret(clientId: string) {
        const response = await this.axiosInstance.get<Data>('/identity-management/credentials',
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
                },
                params: {
                    'client_id': clientId
                }
            });
        return response.data.custos_client_secret;
    }

    private async getClientAuthBase64(clientId: string | null = null, clientSec: string | null = null){
        if (clientId === null && clientSec === null) {
            clientId = this.config.clientId;
            clientSec = this.config.clientSecret;
        } else if (clientId !== null && clientSec === null) {
            clientSec = await this.getClientSecret(clientId);
        }

        let clientAuthBase64 = `${clientId}:${clientSec}`;
        clientAuthBase64 = Buffer.from(clientAuthBase64).toString('base64');
        return `Bearer ${clientAuthBase64}`;
    }

    private async fetchAuthorizationEndpoint(): Promise<void> {
        const openIdConfigEndpoint = "/identity-management/.well-known/openid-configuration";
        const redirectUri = this.config.redirectUri;
        const {data: {authorization_endpoint}}= await this.axiosInstance.get(openIdConfigEndpoint,
            {params: {'client_id': this.config.clientId,}});
        window.location.href = `${authorization_endpoint}?response_type=code&client_id=${this.config.clientId}&redirect_uri=${redirectUri}&scope=openid&kc_idp_hint=oidc`;
    }

    private async fetchToken({code}: TokenRequest): Promise<TokenResponse> {
        const clientAuthBase64 = await this.getClientAuthBase64();

        const {data} = await this.axiosInstance.post("/identity-management/token", {
            code: code,
            redirect_uri: this.config.redirectUri,
            grant_type: 'authorization_code'
        }, {
            headers: {
                'Authorization': clientAuthBase64
            }
        });
        return data;
    }
    private async fetchUserInfo(): Promise<UserInfoResponse> {
        const clientAuthBase64 = await this.getClientAuthBase64();
        const {data} = await this.axiosInstance.get("/user-management/userinfo", {
            params: {
                'access_token': sessionStorage.getItem('access_token')
            },
            headers: {
                'Authorization': clientAuthBase64
            }
        });
        this.user.value = data;
        this.isAuthenticated.value = true;
        return data;
    }
    private async handleRedirect(): Promise<void> {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
            return;
        }
        const tokenResponse = await this.fetchToken({ code });
        sessionStorage.setItem('access_token', tokenResponse.access_token);
        sessionStorage.setItem('refresh_token', tokenResponse.refresh_token);
    }

    private async logout(){
        const clientAuthBase64 = await this.getClientAuthBase64();
        const refreshToken = sessionStorage.getItem('refresh_token');
        const {data} = await this.axiosInstance.post("/identity-management/user/logout", {
            refresh_token: refreshToken,
        }, {
            headers: {
                'Authorization': clientAuthBase64
            }
        });
        this.isAuthenticated.value = false;
        this.user.value = null;
        return data;
    }
}
export default AuthVueClient;