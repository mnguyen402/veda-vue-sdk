import { inject } from 'vue';
import { VEDA_INJECTION_KEY, VEDA_TOKEN } from './token';
import {AuthVueClient, Config} from "@/interfaces/AuthClient.ts";
export { VEDA_INJECTION_KEY } from './token'; // exporting to ensure the injection key is exported from token only


// declare this interface to ensure VEDA_TOKEN is a global property within Vue components
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        [VEDA_TOKEN]: AuthVueClient;
    }
}

// return an instance of AuthPlugin with the config for client
export function createAuth(config: Config) {

}

//@returns an instance of AuthVueClient, instead of calling injection everytime, calling useAuth0 is faster
export function useAuth(): AuthVueClient {
    return inject(VEDA_INJECTION_KEY) as AuthVueClient;
}