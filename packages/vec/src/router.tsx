import { createRouter } from '@tanstack/react-router'
import { ErrorComponent } from './components/error'
import { NotFoundComponent } from './components/not-found'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    defaultPreload: 'intent',
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: () => <NotFoundComponent />,
    routeTree,
    scrollRestoration: true
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
