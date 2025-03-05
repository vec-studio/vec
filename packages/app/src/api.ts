import { createStartAPIHandler, defaultAPIRoutesHandler } from '@tanstack/react-start/api'

export default createStartAPIHandler(
  defaultAPIRoutesHandler({
    routes: {}
  })
)
