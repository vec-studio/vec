import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'
import { user } from './user'
import { times } from './shared/times'

export const session = sqliteTable('session', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  //
  ...times,
  //
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ip_address'),
  token: text('token').notNull().unique(),
  userAgent: text('user_agent')
})

export const account = sqliteTable('account', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  //
  ...times,
  //
  accessToken: text('access_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
  idToken: text('id_token'),
  password: text('password'),
  refreshToken: text('refresh_token'),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope: text('scope')
})

export const verification = sqliteTable('verification', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  //
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull()
})

export const jwks = sqliteTable('jwks', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  //
  ...times,
  //
  privateKey: text('private_key').notNull(),
  publicKey: text('public_key').notNull()
})
