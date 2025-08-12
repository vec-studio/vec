import { createCollection, createLiveQueryCollection, eq, localStorageCollectionOptions } from '@tanstack/react-db'
import { flowSchema } from 'src/schema/flow'
import { flowEdgeCollection } from './edge'
import { flowNodeCollection } from './node'

export const flowCollection = createCollection(
  localStorageCollectionOptions({
    id: 'flow',
    storageKey: 'vec-collection-flow',
    getKey: item => item.id,
    schema: flowSchema
  })
)

export const flowNodeEdgeCollection = createLiveQueryCollection(q =>
  q
    .from({ flow: flowCollection })
    .leftJoin({ node: flowNodeCollection }, ({ flow, node }) => eq(flow.id, node.flowId))
    .leftJoin({ edge: flowEdgeCollection }, ({ flow, edge }) => eq(flow.id, edge.flowId))
)

export { flowNodeCollection, flowEdgeCollection }
