import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      tsr: {
        routesDirectory: './src/routes',
        virtualRouteConfig: './src/routes.ts',
        target: 'react'
      }
    })
  ],
  resolve: {
    alias: {
      public: fileURLToPath(new URL('public', import.meta.url)),
      src: fileURLToPath(new URL('src', import.meta.url)),
      '@vec/auth': fileURLToPath(new URL('../auth/src', import.meta.url)),
      '@vec/db': fileURLToPath(new URL('../db/src', import.meta.url)),
      '@vec/form': fileURLToPath(new URL('../form/src', import.meta.url)),
      '@vec/zero': fileURLToPath(new URL('../zero/src', import.meta.url))
    }
  },
  ssr: {
    noExternal: ['@adobe/react-spectrum', '@react-spectrum/*', '@spectrum-icons/*']
  }
})
