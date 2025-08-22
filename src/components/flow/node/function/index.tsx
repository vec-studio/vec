import { Flex, View, Button } from '@adobe/react-spectrum'
import { javascript } from '@codemirror/lang-javascript'
import { type EditorStateConfig } from '@codemirror/state'
import { type PressEvent, type DOMRef } from '@react-types/shared'
import { Handle, NodeResizer, Position, type NodeProps, type NodeResizerProps, type OnConnect } from '@xyflow/react'
import { EditorView, basicSetup } from 'codemirror'
import { memo, useEffect, useRef } from 'react'
import { useUpdateFunctionNode } from 'src/hooks/flow'
import { useTranslations } from 'use-intl'

interface FunctionNodeProps extends NodeProps, NodeResizerProps {
  data: {
    fn: EditorStateConfig['doc']
  }
}

export const FunctionNode = memo<FunctionNodeProps>(props => {
  const t = useTranslations()
  const updateFunctionNode = useUpdateFunctionNode()
  const editorRef = useRef<EditorView>(null)
  const editorParentDOMRef = useRef<HTMLElement>(null)
  const editorParentRef: DOMRef = r => {
    editorParentDOMRef.current = r?.UNSAFE_getDOMNode() || null
  }

  // initialize codemirror
  useEffect(() => {
    if (editorRef.current) return

    const baseEheme = EditorView.baseTheme({
      '&': {},
      '&.cm-editor': {
        height: '100%',
        position: 'absolute !important',
        width: '100%'
      },
      '&.cm-focused': {
        outline: 'none'
      }
    })

    editorRef.current = new EditorView({
      doc: props.data.fn,
      extensions: [basicSetup, baseEheme, javascript()],
      parent: editorParentDOMRef.current!
    })
  }, [])

  const onConnect: OnConnect = params => {}

  const onPressSave = (e: PressEvent) => {
    updateFunctionNode(props.id, { data: { fn: editorRef.current?.state.doc.toString() } })
  }

  return (
    <>
      <View
        backgroundColor="static-white"
        borderColor="default"
        borderRadius="medium"
        borderWidth="thin"
        height="100%"
        minHeight={150}
        minWidth={200}
        overflow="hidden"
        position="relative"
        width="100%"
      >
        <Flex direction="column" height="100%" position="absolute" width="100%">
          <View flex={1} position="relative" ref={editorParentRef} />
          <View padding="size-100">
            <Flex justifyContent="end">
              <Button variant="secondary" onPress={onPressSave}>
                {t('flow.node.function.action.save')}
              </Button>
            </Flex>
          </View>
        </Flex>
      </View>
      <Handle type="target" isConnectable={props.isConnectable} onConnect={onConnect} position={Position.Left} />
      <Handle type="source" isConnectable={props.isConnectable} position={Position.Right} />
      <NodeResizer isVisible={props.selected} minHeight={150} minWidth={200} />
    </>
  )
})
