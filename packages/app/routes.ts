import { index, layout, rootRoute, route } from '@tanstack/virtual-file-routes'

export const routes = rootRoute('root.tsx', [layout('pages/layout.tsx', [index('pages/index.tsx')])])
