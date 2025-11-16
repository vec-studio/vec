import { createFileRoute, useRouter } from '@tanstack/react-router'
import consola from 'consola'
import { Button } from 'react-aria-components'
import { useTranslations } from 'use-intl'
import { useCreateFlow } from '../../hooks/flow'

function FlowIndexPage() {
  const t = useTranslations()
  const router = useRouter()
  const createFlow = useCreateFlow()

  const onClickNew = async () => {
    const id = await createFlow()
    if (id) {
      router.navigate({ to: `/flow/${id}`, params: { id } })
    } else {
      consola.error(`failed to create flow id: ${id}`)
    }
  }

  return (
    <div>
      <div>
        <Button onPress={onClickNew}>{t('flow.new')}</Button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_layout/flow/_layout/')({
  component: FlowIndexPage
})
