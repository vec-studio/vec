import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      customViteReactPlugin: true,
      spa: {
        enabled: true
      },
      tsr: {
        routesDirectory: './src/routes',
        virtualRouteConfig: './src/routes.ts',
        target: 'react'
      }
    }),
    viteReact()
  ],
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
