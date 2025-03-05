import { type H3EventContext } from '@tanstack/react-start/server'

namespace NodeJS {
  interface ProcessEnv extends Env {}
}

declare module 'h3' {
  interface H3EventContext {}
}
