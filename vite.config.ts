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
      external: ['vue', 'vue2', 'vuex'],
      output: {
        globals: {
          vue: 'Vue',
          vue2: 'Vue',
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
