import { View } from '@adobe/react-spectrum'
import { javascript } from '@codemirror/lang-javascript'
import { type EditorStateConfig } from '@codemirror/state'
import { type DOMRef } from '@react-types/shared'
import { Handle, NodeResizer, Position, type NodeProps, type NodeResizerProps, type OnConnect } from '@xyflow/react'
import { EditorView, basicSetup } from 'codemirror'
import { memo, useEffect, useRef } from 'react'

interface FunctionNodeProps extends NodeProps, NodeResizerProps {
  data: {
    fn: EditorStateConfig['doc']
  }
}

export const FunctionNode = memo<FunctionNodeProps>(props => {
  const editorRef = useRef<EditorView>(null)
  const editorParentDOMRef = useRef<HTMLElement>(null)
  const editorParentRef: DOMRef = r => {
    editorParentDOMRef.current = r?.UNSAFE_getDOMNode() || null
  }

  // initialize codemirror
  useEffect(() => {
    if (editorRef.current) return

    const baseEheme = EditorView.baseTheme({
      '&': {
        height: '100%',
        width: '100%',
        position: 'absolute'
      }
    })

    editorRef.current = new EditorView({
      doc: props.data.fn,
      extensions: [basicSetup, baseEheme, javascript()],
      parent: editorParentDOMRef.current!
    })
  }, [])

  const onConnect: OnConnect = params => {}

  return (
    <>
      <View
        backgroundColor="static-white"
        borderColor="default"
        borderRadius="medium"
        borderWidth="thin"
        height="100%"
        minHeight="10rem"
        overflow="hidden"
        position="relative"
        ref={editorParentRef}
        width="100%"
        minWidth="15rem"
      />
      <Handle type="target" isConnectable={props.isConnectable} onConnect={onConnect} position={Position.Left} />
      <Handle type="source" isConnectable={props.isConnectable} position={Position.Right} />
      <NodeResizer isVisible={props.selected} />
    </>
  )
})
