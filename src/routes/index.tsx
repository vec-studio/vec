import { createFileRoute } from '@tanstack/react-router'

function IndexPage() {
  return <></>
}

export const Route = createFileRoute('/_layout/')({
  component: IndexPage
})
