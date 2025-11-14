import { index, layout, rootRoute, route } from '@tanstack/virtual-file-routes'

export const routes = rootRoute('root.tsx', [
  layout('layout.tsx', [
    index('index.tsx'),
    route('flow', [layout('flow/layout.tsx', [index('flow/index.tsx'), route('$id', 'flow/id.tsx')])]),
    route('table', [layout('table/layout.tsx', [index('table/index.tsx')])])
  ])
])
