import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { useDebouncedCallback } from '@tanstack/react-pacer/debouncer'
import { useQueryClient } from '@tanstack/react-query'
import { useIsFirstRender } from '@uidotdev/usehooks'
import { applyNodeChanges, useNodes, useReactFlow } from '@xyflow/react'
import { type NodeBase, type NodeChange } from '@xyflow/system'
import { type Dispatch, useCallback, useMemo } from 'react'
import { flowNodeSchema } from 'src/schema/flow-node'
import {
  add as addFlowNodeServerFunction,
  list as listFlowNodeServerFunction,
  update as updateFlowNodeServerFunction
} from 'src/server/flow-node'
import { useFlowContext } from './index'

// react-flow nodes
export function useFlowNodes() {
  const flowContext = useFlowContext()
  const flowNodeCollection = useFlowNodeCollection()

  const nodeQuery = useLiveQuery(q =>
    q.from({ node: flowNodeCollection }).where(({ node }) => eq(node.flowId, flowContext.id))
  )

  const nodes = nodeQuery.data.map(v => v.data)

  return nodes
}

// react-flow node loads first time
export function useFlowNodesFirstLoad(setNodes: Dispatch<React.SetStateAction<NodeBase[]>>) {
  const isFirstRender = useIsFirstRender()

  const flowNodeCollection = useFlowNodeCollection()

  if (isFirstRender) {
    flowNodeCollection.onFirstReady(() => {
      const data = Array.from(flowNodeCollection.state, ([k, v]) => v.data)
      setNodes(data)
    })
  }
}

// react-flow change node
export function useOnNodesChange(setNodes: Dispatch<React.SetStateAction<NodeBase[]>>) {
  const nodes = useNodes()
  const flowContext = useFlowContext()
  const flowNodeCollection = useFlowNodeCollection()

  const debouncedInsert = useDebouncedCallback(data => flowNodeCollection.insert(data), { wait: 500 })
  const debouncedUpdate = useDebouncedCallback<
    <T extends typeof flowNodeCollection.update<NodeBase>>(
      id: Parameters<T>[0],
      callback: Parameters<T>[2]
    ) => ReturnType<T> | unknown
  >((id, callback) => flowNodeCollection.update(id, callback), { wait: 500 })

  const onNodesChange = useCallback(
    async (changes: NodeChange[]) => {
      const changedNodes = applyNodeChanges(changes, nodes)
      setNodes(changedNodes)

      for (const change of changes) {
        switch (change.type) {
          case 'add': {
            const changedNode = changedNodes.find(v => v.id === change.item.id)!
            debouncedInsert({ id: changedNode.id, data: changedNode, flowId: flowContext.id })
            break
          }
          case 'replace': {
            const changedNode = changedNodes.find(v => v.id === change.item.id)!
            debouncedUpdate(changedNode.id, prevNode => {
              prevNode.data = changedNode
            })
            break
          }
          default: {
            const changedNode = changedNodes.find(v => v.id === change.id)!
            debouncedUpdate(changedNode.id, prevNode => {
              prevNode.data = changedNode
            })
          }
        }
      }
    },
    [nodes, flowContext.id]
  )

  return onNodesChange
}

// add node
export function useAddNode() {
  const { addNodes } = useReactFlow()

  const addNode = useCallback(async (node: NodeBase) => {
    addNodes(node)
  }, [])

  return addNode
}

// add function node
export function useAddFunctionNode() {
  const { addNodes } = useReactFlow()

  const addFunctionNode = useCallback(async (node: NodeBase) => {
    addNodes(node)
  }, [])

  return addFunctionNode
}

// update function node data
export function useUpdateFunctionNodeData() {
  const { updateNode } = useReactFlow()

  const updateFunctionNodeData = useCallback(async (id: NodeBase['id'], node: Partial<NodeBase>) => {
    updateNode(id, node)
  }, [])

  return updateFunctionNodeData
}

// node tanstack-db collection
export function useFlowNodeCollection() {
  const queryClient = useQueryClient()

  const flowContext = useFlowContext()

  const flowNodeCollection = useMemo(
    () =>
      createCollection(
        queryCollectionOptions({
          id: 'flow-node',
          queryClient,
          queryKey: ['flow-node', flowContext.id],
          queryFn: async () => await listFlowNodeServerFunction({ data: { flowId: flowContext.id } }),
          getKey: item => item.id,
          schema: flowNodeSchema,
          onInsert: async ({ transaction }) => {
            const { modified } = transaction.mutations[0]
            await addFlowNodeServerFunction({ data: modified })
          },
          onUpdate: async ({ transaction }) => {
            const { original, modified } = transaction.mutations[0]
            await updateFlowNodeServerFunction({ data: modified })
          },
          onDelete: async ({ transaction }) => {
            const { original } = transaction.mutations[0]
          }
        })
      ),
    [flowContext.id]
  )

  // a new collections doesn't start syncing until you call collection.preload() or you query it
  if (!flowNodeCollection.isReady()) flowNodeCollection.preload()

  return flowNodeCollection
}
