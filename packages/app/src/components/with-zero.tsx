import { type Zero } from '@rocicorp/zero'
import { ZeroProvider } from '@rocicorp/zero/react'
import { useRouter } from '@tanstack/react-router'
import { createMutators, type Mutators } from '@vec/zero/mutators'
import { schema, type Schema } from '@vec/zero/schema'
import { type PropsWithChildren, useMemo } from 'react'
import { vars } from 'src/vars'

export function WithZero(props: PropsWithChildren) {
  const router = useRouter()
  const { session } = router.options.context

  const opts = useMemo(() => {
    return {
      schema,
      userID: session.data?.userID ?? 'anon',
      auth: session.zeroAuth,
      server: vars.zeroURL,
      mutators: createMutators(session.data?.userID ? { sub: session.data.userID } : undefined),
      init: (zero: Zero<Schema, Mutators>) => {
        router.update({
          context: {
            ...router.options.context,
            zero
          }
        })

        router.invalidate()
      }
    }
  }, [session.data?.userID, router])

  return <ZeroProvider {...opts}>{props.children}</ZeroProvider>
}
