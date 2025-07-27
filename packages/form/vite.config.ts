import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: ['@adobe/react-spectrum', '@react-spectrum/*', '@spectrum-icons/*']
  }
})
