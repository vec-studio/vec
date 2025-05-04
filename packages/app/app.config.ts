import { defineConfig } from '@tanstack/react-start/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  tsr: {
    appDirectory: './src',
    autoCodeSplitting: true,
    routesDirectory: './src/routes',
    target: 'react',
    virtualRouteConfig: './src/routes.ts'
  },
  vite: {
    resolve: {
      alias: {
        public: fileURLToPath(new URL('public', import.meta.url)),
        src: fileURLToPath(new URL('src', import.meta.url))
      }
    },
    ssr: {
      noExternal: ['@adobe/react-spectrum', '@react-spectrum/*', '@spectrum-icons/*']
    }
  }
})
