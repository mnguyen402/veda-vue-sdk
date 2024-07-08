import type { Ref } from 'vue';
import type { AuthVueState } from './AuthState.ts';


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

export interface AuthVueClient {


    isAuthenticated: Ref<boolean>;
    // user: Ref<User | undefined>;


    getClientSecret(clientId: string): Promise<string>;
    getClientAuthBase64(clientId: string | null, clientSec: string | null): Promise<string>;
    fetchAuthorizationEndpoint(): Promise<void>;
    fetchToken({code}: TokenRequest): Promise<TokenResponse>;
    fetchUserInfo(): Promise<UserInfoResponse>;
    handleRedirect(): Promise<void>;
}