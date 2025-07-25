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
      },
      spa: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      public: fileURLToPath(new URL('public', import.meta.url)),
      src: fileURLToPath(new URL('src', import.meta.url)),
      '@vec/auth': fileURLToPath(new URL('../auth/src/index.ts', import.meta.url)),
      '@vec/db': fileURLToPath(new URL('../db/src/index.ts', import.meta.url)),
      '@vec/zero': fileURLToPath(new URL('../zero/src/index.ts', import.meta.url))
    }
  },
  ssr: {
    noExternal: ['@adobe/react-spectrum', '@react-spectrum/*', '@spectrum-icons/*']
  }
})
