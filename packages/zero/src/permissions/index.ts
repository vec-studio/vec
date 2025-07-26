import { ANYONE_CAN_DO_ANYTHING, definePermissions, type PermissionsConfig } from '@rocicorp/zero'
import { type Schema, schema } from '../schema'

export type AuthData = {}

export const permissions = definePermissions<unknown, Schema>(schema, () => {
  return {
    record: ANYONE_CAN_DO_ANYTHING
  } satisfies PermissionsConfig<AuthData, Schema>
})

export type Permissions = typeof permissions
