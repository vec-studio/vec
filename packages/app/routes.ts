import { index, layout, rootRoute, route } from '@tanstack/virtual-file-routes'

export const routes = rootRoute('root.tsx', [
  layout('pages/layout.tsx', [
    index('pages/index.tsx'),
    route('flow', [layout('pages/flow/layout.tsx', [index('pages/flow/index.tsx')])]),
    route('table', [layout('pages/table/layout.tsx', [index('pages/table/index.tsx')])])
  ])
])
