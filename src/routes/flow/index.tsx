import { Grid, View } from '@adobe/react-spectrum'
import { createFileRoute } from '@tanstack/react-router'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { ButtonLink } from 'src/components'
import { useTranslations } from 'use-intl'

function component() {
  const t = useTranslations()
  const [id] = useState(nanoid())

  return (
    <Grid>
      <View>
        <ButtonLink to={`/flow/$id`} params={{ id }} variant="secondary">
          {t('flow.new')}
        </ButtonLink>
      </View>
    </Grid>
  )
}

export const Route = createFileRoute('/_layout/flow/_layout/')({
  component
})
