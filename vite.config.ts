/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-forward',
      name: 'VueForward',
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'vuex'],
      output: {
        globals: {
          vue: 'Vue',
          vuex: 'Vuex',
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      logLevel: 'silent',
    }),
  ],
  test: {
    coverage: {
      exclude: ['packages'],
    },
    environment: 'happy-dom',
  },
})
