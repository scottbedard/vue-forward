import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'VueForward2',
      fileName: 'vue-forward-2',
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      'components': resolve(__dirname, '../components'),
    },
  },
})
