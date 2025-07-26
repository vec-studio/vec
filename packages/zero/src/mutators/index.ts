import { CustomMutatorDefs } from '@rocicorp/zero'
import { type AuthData } from '../permissions'
import { type Schema } from '../schema'

export function createMutators(authData: AuthData | undefined) {
  return {} as const satisfies CustomMutatorDefs<Schema>
}

export type Mutators = ReturnType<typeof createMutators>
