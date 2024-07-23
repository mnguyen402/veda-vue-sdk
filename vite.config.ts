import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts';
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [vue(), dts(), nodePolyfills()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es']
    },
    rollupOptions: {
      // externalize dependencies that shouldn't be bundled into the library
      external: ['vue', 'axios', 'buffer', 'uuid'],

      input: {
        main: resolve(__dirname, 'src/main.ts')
      },

      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',

        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
