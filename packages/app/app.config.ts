import { defineConfig } from '@tanstack/react-start/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  tsr: {
    appDirectory: './src',
    autoCodeSplitting: true,
    routesDirectory: './src',
    target: 'react',
    virtualRouteConfig: './routes.ts'
  },
  vite: {
    plugins: [vanillaExtractPlugin()],
    resolve: {
      alias: {
        public: fileURLToPath(new URL('public', import.meta.url)),
        src: fileURLToPath(new URL('src', import.meta.url))
      }
    }
  }
})
