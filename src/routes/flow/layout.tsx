import { View } from '@adobe/react-spectrum'
import { createFileRoute, Outlet } from '@tanstack/react-router'

function component() {
  return (
    <View height="100vh">
      <Outlet />
    </View>
  )
}

export const Route = createFileRoute('/_layout/flow/_layout')({
  component
})
