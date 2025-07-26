import { type Zero } from '@rocicorp/zero'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { type Mutators } from '@vec/zero/mutators'
import { type Schema } from '@vec/zero/schema'
import { ErrorComponent } from './components/error'
import { NotFoundComponent } from './components/not-found'
import { type SessionContextType } from './components/with-session'
import { routeTree } from './routeTree.gen'
import { type RouterContext } from './routes/root'

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}

export function createRouter() {
  const router = createTanStackRouter({
    context: {
      zero: undefined as unknown as Zero<Schema, Mutators>, // populated in ZeroInit,
      session: undefined as unknown as SessionContextType // populated in SessionProvider
    } satisfies RouterContext,
    defaultErrorComponent: ErrorComponent,
    // It is fine to call Zero multiple times for same query, Zero dedupes the
    // queries internally.
    defaultPreloadStaleTime: 0,
    // We don't want TanStack skipping any calls to us. We want to be asked to
    // preload every link. This is fine because Zero has its own internal
    // deduping and caching.
    defaultPreloadGcTime: 0,
    defaultNotFoundComponent: () => <NotFoundComponent />,
    routeTree,
    scrollRestoration: true
  })

  return router
}
