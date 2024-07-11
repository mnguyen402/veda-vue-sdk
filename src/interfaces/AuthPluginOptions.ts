export interface AuthPluginOptions {
    authClient?: {
        name: string;
        version: string;
        env?: { [key: string]: string };
    };
    skipRedirectCallback?: boolean;
    errorPath?: string;
}