import type { InjectionKey } from "vue";
import AuthVueClient from "./AuthClient.ts";

/**
 * @ignore
 */
export const VEDA_TOKEN = '$veda';

// make AuhVueClient as an Injection key to inject into Vue components
export const VEDA_INJECTION_KEY: InjectionKey<AuthVueClient> =
    Symbol(VEDA_TOKEN);