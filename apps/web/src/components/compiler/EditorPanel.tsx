import type { ReactNode } from "react"

import CodeMirror from "@uiw/react-codemirror"
import { oneDark } from "@codemirror/theme-one-dark"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type EditorPanelProps = {
  title: string
  description: string
  value: string
  onChange?: (value: string) => void
  editable: boolean
  placeholder: string
  extensions: unknown[]
  action?: ReactNode
}

export function EditorPanel({
  title,
  description,
  value,
  onChange,
  editable,
  placeholder,
  extensions,
  action,
}: EditorPanelProps) {
  return (
    <Card className="border border-white/10 bg-white/5 shadow-none backdrop-blur-sm">
      <CardHeader className="gap-2 px-5">
        <div className="space-y-1">
          <CardTitle className="text-sm tracking-[0.2em] uppercase text-white/92">{title}</CardTitle>
          <CardDescription className="text-xs text-white/45">{description}</CardDescription>
        </div>
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent className="px-0">
        <div className="relative min-h-[26rem] border-y border-white/8 bg-black/30">
          {!value ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center text-sm leading-6 text-white/28">
              {placeholder}
            </div>
          ) : null}
          <CodeMirror
            value={value}
            onChange={onChange}
            theme={oneDark}
            editable={editable}
            basicSetup={{
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: editable,
              bracketMatching: false,
            }}
            extensions={extensions as never[]}
            height="416px"
            className="text-[13px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}
