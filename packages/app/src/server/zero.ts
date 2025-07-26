import { Zero } from '@rocicorp/zero'
import { schema } from '@vec/sync'
import { vars } from '../vars'

const zero = new Zero({
  userID: 'anon',
  server: vars.zeroURL,
  schema
})

export { zero }
