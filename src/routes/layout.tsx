import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Provider as VECUIThemeProvider } from '@vec-studio/ui'

function Layout() {
  return (
    <VECUIThemeProvider>
      <Outlet />
    </VECUIThemeProvider>
  )
}

export const Route = createFileRoute('/_layout')({
  component: Layout
})
