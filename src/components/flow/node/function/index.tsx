import { View } from '@adobe/react-spectrum'
import { javascript } from '@codemirror/lang-javascript'
import { type DOMRefValue } from '@react-types/shared'
import { Handle, Position, type HandleProps } from '@xyflow/react'
import { EditorView, basicSetup } from 'codemirror'
import { type EditorStateConfig } from '@codemirror/state'
import { memo, useEffect, useRef } from 'react'

interface FunctionNodeProps extends HandleProps {
  data: {
    fn: EditorStateConfig['doc']
  }
}

export const FunctionNode = memo<FunctionNodeProps>(({ data, isConnectable }) => {
  const editorParentRef = useRef<DOMRefValue<HTMLElement>>(null)
  const editorRef = useRef<EditorView>(undefined)

  useEffect(() => {
    if (editorRef.current) return
    editorRef.current = new EditorView({
      doc: data.fn,
      extensions: [basicSetup, javascript()],
      parent: editorParentRef.current?.UNSAFE_getDOMNode()!
    })
  }, [])

  return (
    <View>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={params => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <View height="5rem" width="10rem" ref={editorParentRef}></View>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
    </View>
  )
})
