import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { db } from 'src/db'
import { flowNode } from 'src/db/schema/flow-node'
import { flowNodeSchema } from 'src/schema/flow-node'

export const list = createServerFn()
  .validator(flowNodeSchema.pick({ flowId: true }).partial({ flowId: true }).optional())
  .handler(async ({ data }) => {
    let where

    if (data?.flowId) {
      const x = eq(flowNode.flowId, data.flowId)
      where = where ? and(where, x) : x
    }

    const result = await db.select().from(flowNode).where(where)

    return result
  })

export const add = createServerFn({ method: 'POST' })
  .validator(flowNodeSchema.pick({ id: true, data: true, flowId: true }))
  .handler(async ({ data }) => {
    const result = await db.insert(flowNode).values(data).returning().get()
    return result
  })

export const update = createServerFn({ method: 'POST' })
  .validator(flowNodeSchema.pick({ id: true, data: true, flowId: true }))
  .handler(async ({ data }) => {
    const result = await db
      .update(flowNode)
      .set(data)
      .where(and(eq(flowNode.id, data.id), eq(flowNode.flowId, data.flowId)))
      .returning()
      .get()

    return result
  })
