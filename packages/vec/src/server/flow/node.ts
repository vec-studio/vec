import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { db } from '~/src/db'
import { flowNode } from '~/src/db/schema/flow-node'
import { flowNodeSchema } from '~/src/schema/flow-node'

export const listFlowNodeServerFn = createServerFn()
  .inputValidator(flowNodeSchema.pick({ flowId: true }).partial({ flowId: true }).optional())
  .handler(async ({ data }) => {
    let where

    if (data?.flowId) {
      const x = eq(flowNode.flowId, data.flowId)
      where = where ? and(where, x) : x
    }

    const result = await db.select().from(flowNode).where(where)

    return result
  })

export const addFlowNodeServerFn = createServerFn({ method: 'POST' })
  .inputValidator(flowNodeSchema.pick({ id: true, data: true, flowId: true }))
  .handler(async ({ data }) => {
    const result = await db.insert(flowNode).values(data).returning().get()
    return result
  })

export const updateFlowNodeServerFn = createServerFn({ method: 'POST' })
  .inputValidator(flowNodeSchema.pick({ id: true, data: true }))
  .handler(async ({ data }) => {
    const result = await db.update(flowNode).set(data).where(eq(flowNode.id, data.id)).returning().get()

    return result
  })

export const deleteFlowNodeServerFn = createServerFn({ method: 'POST' })
  .inputValidator(flowNodeSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.delete(flowNode).where(eq(flowNode.id, data.id)).returning().get()
    return result
  })
