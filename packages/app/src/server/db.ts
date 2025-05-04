import { DuckDBInstance } from '@duckdb/node-api'
import { env } from 'std-env'

const instance = await DuckDBInstance.create(env.DUCKDB_PATH)
export const connection = await instance.connect()
