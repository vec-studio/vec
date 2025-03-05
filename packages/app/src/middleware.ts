import { createMiddleware } from '@tanstack/react-start'

export const contextMiddleware = createMiddleware().server(async ({ next, context = {} }) => {
  return next({
    context: {
      ...context
      // TODO
    }
  })
})
