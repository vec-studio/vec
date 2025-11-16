import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
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
        generatedRouteTree: './routeTree.gen.ts',
        virtualRouteConfig: './src/routes.ts'
      }
    }),
    viteReact(),
    vanillaExtractPlugin()
  ]
})
