/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['packages'],
    },
    environment: 'happy-dom',
  },
})
