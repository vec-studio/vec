import { defaultTheme, Provider as SpectrumProvider } from '@adobe/react-spectrum'
import { createFileRoute, Outlet } from '@tanstack/react-router'

function component() {
  return (
    <SpectrumProvider theme={defaultTheme}>
      <Outlet />
    </SpectrumProvider>
  )
}

export const Route = createFileRoute('/_layout')({
  component
})
