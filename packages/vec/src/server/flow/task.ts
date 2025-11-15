import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { db } from '~/src/db'
import { flowTask } from '~/src/db/schema/flow-task'
import { flowTaskSchema } from '~/src/schema/flow-task'

export const listFlowTaskServerFn = createServerFn()
  .inputValidator(flowTaskSchema.pick({ flowId: true }).partial({ flowId: true }).optional())
  .handler(async ({ data }) => {
    let where

    if (data?.flowId) {
      const x = eq(flowTask.flowId, data.flowId)
      where = where ? and(where, x) : x
    }

    const result = await db.select().from(flowTask).where(where)

    return result
  })

export const addFlowTaskServerFn = createServerFn({ method: 'POST' })
  .inputValidator(flowTaskSchema.pick({ id: true, flowId: true, flowNodeId: true, data: true }))
  .handler(async ({ data }) => {
    const result = await db.insert(flowTask).values(data).returning().get()
    return result
  })

export const updateFlowTaskServerFn = createServerFn({ method: 'POST' })
  .inputValidator(flowTaskSchema.pick({ id: true, data: true }))
  .handler(async ({ data }) => {
    const result = await db.update(flowTask).set(data).where(eq(flowTask.id, data.id)).returning().get()

    return result
  })

export const deleteFlowTaskServerFn = createServerFn({ method: 'POST' })
  .inputValidator(flowTaskSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.delete(flowTask).where(eq(flowTask.id, data.id)).returning().get()
    return result
  })
