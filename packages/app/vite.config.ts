import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tanstackStart()],
  resolve: {
    alias: {
      public: fileURLToPath(new URL('public', import.meta.url)),
      src: fileURLToPath(new URL('src', import.meta.url))
    }
  },
  ssr: {
    noExternal: ['@adobe/react-spectrum', '@react-spectrum/*', '@spectrum-icons/*']
  }
})
