import { defineConfig } from '@tanstack/react-start/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        src: fileURLToPath(new URL('src', import.meta.url)),
        public: fileURLToPath(new URL('public', import.meta.url))
      }
    },
    plugins: [vanillaExtractPlugin()]
  },
  tsr: {
    appDirectory: './src',
    autoCodeSplitting: true,
    routesDirectory: './src',
    target: 'react',
    virtualRouteConfig: './routes.ts'
  }
})
