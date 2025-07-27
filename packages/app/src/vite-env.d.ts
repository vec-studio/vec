/// <reference types="vite/client" />

interface ViteTypeOptions {}

interface ImportMetaEnv {
  readonly VITE_CONSOLA_LEVEL: string
  readonly VITE_ZERO_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
