import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { type PropsWithChildren } from 'react'
import { IntlProvider } from 'use-intl'
import { initLocaleServerFn } from '~/src/server'

export function WithIntl(props: PropsWithChildren) {
  const initLocale = useServerFn(initLocaleServerFn)
  const query = useQuery({ queryKey: ['initLocale'], queryFn: () => initLocale() })

  if (query.isError) return null
  if (query.isPending) return null
  return <IntlProvider {...query.data}>{props.children}</IntlProvider>
}
