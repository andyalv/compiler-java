import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { compileSource } from "@/lib/compiler/api"
import { editorExtensions, sqlEditorExtensions } from "@/lib/compiler/codemirror"
import { downloadTextFile } from "@/lib/compiler/downloads"
import { formatSchemaAsText } from "@/lib/compiler/formatters"
import type { DatabaseSchema } from "@/types/compiler"

import { CompilationStatus } from "./CompilationStatus"
import { EditorPanel } from "./EditorPanel"
import { SchemaPanel } from "./SchemaPanel"
import { WorkbenchHeaderButtons } from "./WorkbenchHeaderButtons"

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

export function CompilerWorkbench() {
  const [source, setSource] = useState(EXAMPLE_SOURCE)
  const [compiledSql, setCompiledSql] = useState("")
  const [schema, setSchema] = useState<DatabaseSchema | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [isCompiling, setIsCompiling] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleCompile() {
    const trimmedSource = source.trim()

    if (!trimmedSource) {
      setCompiledSql("")
      setSchema(null)
      setErrorMessage("Escribe instrucciones antes de compilar.")
      return
    }

    setIsCompiling(true)
    setCopied(false)

    try {
      const payload = await compileSource(trimmedSource)
      setCompiledSql(payload.sql)
      setSchema(payload.schema)
      setErrorMessage("")
    } catch (error) {
      setCompiledSql("")
      setSchema(null)
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

  function handleDownloadSql() {
    if (!compiledSql || errorMessage) {
      return
    }

    downloadTextFile("comandos-compilados.txt", compiledSql)
  }

  function handleDownloadSchema() {
    if (!schema || errorMessage) {
      return
    }

    downloadTextFile("esquema-bd.txt", formatSchemaAsText(schema))
  }

  return (
    <div className="space-y-6 px-5 py-6 sm:px-7 lg:px-8 lg:py-8">

      <header className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

          { /* Title and description */ }
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium tracking-[-0.04em] text-white sm:text-xl">
                Workspace del compilador
              </h2>
              <Badge className="border border-white/10 bg-white/8 px-2.5 py-1 text-[0.65rem] uppercase text-white/55 hover:bg-white/8">
                react + codemirror
              </Badge>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-white/48">
              Escribe instrucciones, compila a PostgreSQL y revisa la estructura detectada sin salir de esta pagina.
            </p>
          </div>

          { /* Header buttons */ }
          <WorkbenchHeaderButtons
            copied={copied}
            compiledSql={compiledSql}
            errorMessage={errorMessage}
            isCompiling={isCompiling}
            hasSchema={Boolean(schema)}
            onCopy={handleCopy}
            onDownloadSql={handleDownloadSql}
            onDownloadSchema={handleDownloadSchema}
            onCompile={handleCompile}
          />
        </div>

        <Separator className="bg-white/8" />
      </header>

      { /* Editor panels */ }
      <section className="grid gap-4 lg:grid-cols-2">
        <EditorPanel
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

        <EditorPanel
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

      { /* Schema panel */ }
      <section>
        <SchemaPanel schema={schema} />
      </section>

      { /* Compilation status */ }
      <section>
        <CompilationStatus errorMessage={errorMessage} />
      </section>
    </div>
  )
}
