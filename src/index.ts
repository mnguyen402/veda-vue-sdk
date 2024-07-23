import { inject } from 'vue';
import { VEDA_INJECTION_KEY, VEDA_TOKEN } from './token';
import AuthVueClient from "./AuthClient.ts";
import type {Config }from "./AuthClient.ts";

export { VEDA_INJECTION_KEY } from './token';

// declare this interface to ensure VEDA_TOKEN is a global property within Vue components
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        [VEDA_TOKEN]: AuthVueClient;
    }
}

export function createAuth(
    config: Config,
) {
    return new AuthVueClient(config);
}

//returns an instance of AuthVueClient, instead of calling injection everytime, calling useAuth is faster
export function useAuth(): AuthVueClient {
    return inject(VEDA_INJECTION_KEY) as AuthVueClient;
}
