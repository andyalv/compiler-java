import { useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView } from "@codemirror/view"
import { sql } from "@codemirror/lang-sql"
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ClipboardIcon,
  LoaderCircleIcon,
  PlayIcon,
  SparklesIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const EXAMPLE_SOURCE = `create database enterprise
with enterprise
table depto
    start
       name string 40
       department_code string 10
       number integer
       responsabilities string
    end
table empleado
    start
       name string 40
       age integer
       birth_date date
       salary integer
       relationship depto
    end
closecon`

const editorTheme = EditorView.theme({
  "&": {
    height: "100%",
    backgroundColor: "transparent",
  },
  ".cm-scroller": {
    fontFamily: "'Geist Variable', sans-serif",
    lineHeight: "1.65",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    color: "rgba(255,255,255,0.28)",
    border: "none",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "transparent",
  },
  ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "rgba(255,255,255,0.72)",
  },
  ".cm-content": {
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },
})

const editorExtensions = [editorTheme, EditorView.lineWrapping]
const sqlEditorExtensions = [editorTheme, EditorView.lineWrapping, sql()]

const API_BASE_URL = (import.meta.env.PUBLIC_API_BASE_URL || "http://localhost:8080").replace(/\/$/, "")

function EditorShell({
  title,
  description,
  value,
  onChange,
  editable,
  placeholder,
  extensions,
  action,
}: {
  title: string
  description: string
  value: string
  onChange?: (value: string) => void
  editable: boolean
  placeholder: string
  extensions: unknown[]
  action?: React.ReactNode
}) {
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

export function CompilerWorkbench() {
  const [source, setSource] = useState(EXAMPLE_SOURCE)
  const [compiledSql, setCompiledSql] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isCompiling, setIsCompiling] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleCompile() {
    const trimmedSource = source.trim()

    if (!trimmedSource) {
      setCompiledSql("")
      setErrorMessage("Escribe instrucciones antes de compilar.")
      return
    }

    setIsCompiling(true)
    setCopied(false)

    try {
      const response = await fetch(`${API_BASE_URL}/compile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source: trimmedSource }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(payload?.error || "No se pudo completar la compilacion.")
      }

      setCompiledSql(payload?.sql || "")
      setErrorMessage("")
    } catch (error) {
      setCompiledSql("")
      setErrorMessage(
        error instanceof Error ? error.message : "No se pudo conectar con el compilador."
      )
    } finally {
      setIsCompiling(false)
    }
  }

  async function handleCopy() {
    if (!compiledSql || errorMessage) {
      return
    }

    await navigator.clipboard.writeText(compiledSql)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-md">
          <div className="space-y-6 px-5 py-6 sm:px-7 lg:px-8 lg:py-8">
            <header className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl space-y-3">
                  <Badge className="w-fit border border-white/12 bg-white/8 px-3 py-1 text-[0.65rem] font-medium tracking-[0.28em] uppercase text-white/70 hover:bg-white/8">
                    compilador web
                  </Badge>
                  <div className="space-y-2">
                    <h1 className="text-3xl leading-none font-medium tracking-[-0.06em] text-white sm:text-4xl lg:text-[3.4rem]">
                      Escribe el lenguaje y compila a PostgreSQL.
                    </h1>
                    <p className="max-w-xl text-sm leading-6 text-white/48 sm:text-[0.95rem]">
                      Un solo flujo: entrada a la izquierda, SQL generado a la derecha y errores abajo.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!compiledSql || Boolean(errorMessage) || isCompiling}
                    onClick={handleCopy}
                    className="border-white/12 bg-white/6 text-white hover:bg-white/10"
                  >
                    {copied ? <CheckCircle2Icon /> : <ClipboardIcon />}
                    {copied ? "Copiado" : "Copiar SQL"}
                  </Button>
                  <Button
                    size="sm"
                    disabled={isCompiling}
                    onClick={handleCompile}
                    className="bg-white text-black hover:bg-white/88"
                  >
                    {isCompiling ? <LoaderCircleIcon className="animate-spin" /> : <PlayIcon />}
                    {isCompiling ? "Compilando" : "Compilar"}
                  </Button>
                </div>
              </div>

              <Separator className="bg-white/8" />

            </header>

            <section className="grid gap-4 lg:grid-cols-2">
              <EditorShell
                title="Fuente"
                description="Editor principal para el lenguaje de alto nivel."
                value={source}
                onChange={setSource}
                editable={true}
                placeholder="Escribe aqui las instrucciones del lenguaje fuente."
                extensions={editorExtensions}
                action={
                  <Badge className="border border-white/10 bg-white/8 px-2.5 py-1 text-[0.65rem] uppercase text-white/55 hover:bg-white/8">
                    editable
                  </Badge>
                }
              />

              <EditorShell
                title="SQL compilado"
                description="Salida de solo lectura lista para seleccionar o copiar."
                value={compiledSql}
                editable={false}
                placeholder="Aqui aparecera el segmento compilado cuando la API responda correctamente."
                extensions={sqlEditorExtensions}
                action={
                  <Badge className="border border-white/10 bg-white/8 px-2.5 py-1 text-[0.65rem] uppercase text-white/55 hover:bg-white/8">
                    solo lectura
                  </Badge>
                }
              />
            </section>

            <section>
              <Card className="border border-white/10 bg-white/4 shadow-none">
                <CardHeader className="px-5">
                  <CardTitle className="text-sm tracking-[0.2em] uppercase text-white/92">
                    Estado de compilacion
                  </CardTitle>
                  <CardDescription className="text-xs text-white/45">
                    Mensajes directos del compilador o del transporte HTTP.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  {errorMessage ? (
                    <Alert variant="destructive" className="border border-red-400/20 bg-red-500/8 text-red-100">
                      <AlertCircleIcon className="mt-0.5 size-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription className="text-red-100/82">{errorMessage}</AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="border border-white/10 bg-black/20 text-white/72">
                      <SparklesIcon className="mt-0.5 size-4 text-white/55" />
                      <AlertTitle>Sin errores</AlertTitle>
                      <AlertDescription className="text-white/45">
                        El placeholder permanecera aqui hasta que la compilacion falle o la API responda con un mensaje de error.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
