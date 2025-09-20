import { createFileRoute, useRouter } from '@tanstack/react-router'
import consola from 'consola'
import { Button } from 'react-aria-components'
import { useAddFlow } from 'src/hooks/flow'
import { useTranslations } from 'use-intl'

function component() {
  const t = useTranslations()
  const router = useRouter()
  const addFlow = useAddFlow()

  const onClickNew = async () => {
    const id = await addFlow()
    if (id) {
      router.navigate({ to: `/flow/${id}`, params: { id } })
    } else {
      consola.error(`failed to add flow id: ${id}`)
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
  component
})
