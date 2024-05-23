/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-forward',
      name: 'VueForward',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
          vuex: 'Vuex',
        },
      },
    },
  },
  test: {
    coverage: {
      exclude: ['packages'],
    },
    environment: 'happy-dom',
  },
})
