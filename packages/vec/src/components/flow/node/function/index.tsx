import { javascript } from '@codemirror/lang-javascript'
import { type EditorStateConfig } from '@codemirror/state'
import { type PressEvent } from '@react-types/shared'
import {
  Handle,
  NodeResizeControl,
  Position,
  type NodeProps,
  type NodeResizerProps,
  type OnConnect
} from '@xyflow/react'
import { EditorView, basicSetup } from 'codemirror'
import { MoveDiagonal2Icon } from 'lucide-react'
import { memo, useEffect, useRef } from 'react'
import { Button } from '@vec-studio/ui/src'
import { useUpdateFunctionNodeData } from '~/src/hooks/flow'
import { useTranslations } from 'use-intl'
import * as classNames from './index.css'

interface FunctionNodeProps extends NodeProps, NodeResizerProps {
  data: {
    fn: EditorStateConfig['doc']
  }
}

export const FunctionNode = memo<FunctionNodeProps>(props => {
  const t = useTranslations()
  const updateFunctionNodeData = useUpdateFunctionNodeData()
  const editorRef = useRef<EditorView>(null)
  const editorParentDOMRef = useRef<HTMLDivElement>(null)

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
    updateFunctionNodeData(props.id, { data: { fn: editorRef.current?.state.doc.toString() } })
  }

  return (
    <>
      <div className={classNames.rootClassName}>
        <div className={classNames.contentClassName} ref={editorParentDOMRef} />
        <div className={classNames.buttonGroupClassName}>
          <Button onPress={onPressSave}>{t('flow.node.function.action.save')}</Button>
        </div>
      </div>
      <Handle type="target" isConnectable={props.isConnectable} onConnect={onConnect} position={Position.Left} />
      <Handle type="source" isConnectable={props.isConnectable} position={Position.Right} />
      <NodeResizeControl style={{ background: 'transparent', border: 'none' }} minWidth={200} minHeight={150}>
        <MoveDiagonal2Icon />
      </NodeResizeControl>
    </>
  )
})
