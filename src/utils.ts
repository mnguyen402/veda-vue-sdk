/**
 * @ignore
 * Helper function to bind methods to itself, useful when using Vue's `provide` / `inject` API's.
 */
export function bindPluginMethods(plugin: any, exclude: string[]) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(plugin))
        .filter(method => !exclude.includes(method))
        // eslint-disable-next-line security/detect-object-injection
        .forEach(method => (plugin[method] = plugin[method].bind(plugin)));
}