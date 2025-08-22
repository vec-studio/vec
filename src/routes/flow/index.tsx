import { Button, Grid, View } from '@adobe/react-spectrum'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import consola from 'consola'
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
    <Grid>
      <View>
        <Button onPress={onClickNew} variant="secondary">
          {t('flow.new')}
        </Button>
      </View>
    </Grid>
  )
}

export const Route = createFileRoute('/_layout/flow/_layout/')({
  component
})
