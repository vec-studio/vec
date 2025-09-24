import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          outputPath: 'index.html',
          crawlLinks: true,
          retryCount: 3
        }
      },
      router: {
        generatedRouteTree: './src/routeTree.gen.ts',
        virtualRouteConfig: './src/routes.ts'
      }
    }),
    viteReact()
  ],
  resolve: {
    alias: {
      public: fileURLToPath(new URL('public', import.meta.url)),
      src: fileURLToPath(new URL('src', import.meta.url))
    }
  }
})
