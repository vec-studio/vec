import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@vec/db': fileURLToPath(new URL('../db/src/index.ts', import.meta.url))
    }
  }
})
