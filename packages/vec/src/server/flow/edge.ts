import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { db } from 'src/db'
import { flowEdge } from 'src/db/schema/flow-edge'
import { flowEdgeSchema } from 'src/schema/flow-edge'

export const listFlowEdgeServerFn = createServerFn()
  .inputValidator(flowEdgeSchema.pick({ flowId: true }).partial({ flowId: true }).optional())
  .handler(async ({ data }) => {
    let where

    if (data?.flowId) {
      const x = eq(flowEdge.flowId, data.flowId)
      where = where ? and(where, x) : x
    }

    const result = await db.select().from(flowEdge).where(where)

    return result
  })

export const addFlowEdgeServerFn = createServerFn({ method: 'POST' })
  .inputValidator(flowEdgeSchema.pick({ id: true, data: true, flowId: true }))
  .handler(async ({ data }) => {
    const result = await db.insert(flowEdge).values(data).returning().get()
    return result
  })

export const updateFlowEdgeServerFn = createServerFn({ method: 'POST' })
  .inputValidator(flowEdgeSchema.pick({ id: true, data: true }))
  .handler(async ({ data }) => {
    const result = await db.update(flowEdge).set(data).where(eq(flowEdge.id, data.id)).returning().get()

    return result
  })

export const deleteFlowEdgeServerFn = createServerFn({ method: 'POST' })
  .inputValidator(flowEdgeSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.delete(flowEdge).where(eq(flowEdge.id, data.id)).returning().get()
    return result
  })
