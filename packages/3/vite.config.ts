import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'VueForward3',
      fileName: 'vue-forward-3',
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      'components': resolve(__dirname, '../components'),
    },
  },
})
