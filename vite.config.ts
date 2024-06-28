import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import nodePolyfills from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [vue(), dts({insertTypesEntry: true,})],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled into your library
      external: ['vue', 'axios', 'buffer', 'uuid'],
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        globals: {
          vue: 'vue',
          axios: 'axios',
          buffer: 'Buffer',
          uuid: 'uuid',
          '@vueuse/core': 'VueUse',
        },
      },
    },
  },
});
