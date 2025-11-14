import { defineConfig } from 'drizzle-kit'
import { vars } from './src/vars'

export default defineConfig({
  schema: './src/db/schema/index.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: vars.dbURL
  }
})
