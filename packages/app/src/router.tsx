import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { ErrorComponent } from './components/error'
import { NotFoundComponent } from './components/not-found'
import { routeTree } from './routeTree.gen'

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}

export function createRouter() {
  const router = createTanStackRouter({
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: () => <NotFoundComponent />,
    routeTree,
    scrollRestoration: true,
    defaultSsr: false
  })

  return router
}
