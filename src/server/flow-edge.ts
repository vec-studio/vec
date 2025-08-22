import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { db } from 'src/db'
import { flowEdge } from 'src/db/schema/flow-edge'
import { flowEdgeSchema } from 'src/schema/flow-edge'

export const list = createServerFn()
  .validator(flowEdgeSchema.pick({ flowId: true }).partial({ flowId: true }).optional())
  .handler(async ({ data }) => {
    let where

    if (data?.flowId) {
      const x = eq(flowEdge.flowId, data.flowId)
      where = where ? and(where, x) : x
    }

    const result = await db.select().from(flowEdge).where(where)

    return result
  })

export const add = createServerFn({ method: 'POST' })
  .validator(
    flowEdgeSchema.pick({ id: true, data: true, flowId: true }).required({ id: true, data: true, flowId: true })
  )
  .handler(async ({ data }) => {
    const result = await db.insert(flowEdge).values(data).returning().get()
    return result
  })

export const update = createServerFn({ method: 'POST' })
  .validator(
    flowEdgeSchema.pick({ id: true, data: true, flowId: true }).required({ id: true, data: true, flowId: true })
  )
  .handler(async ({ data }) => {
    const result = await db
      .update(flowEdge)
      .set(data)
      .where(and(eq(flowEdge.id, data.id), eq(flowEdge.flowId, data.flowId)))
      .returning()
      .get()

    return result
  })
