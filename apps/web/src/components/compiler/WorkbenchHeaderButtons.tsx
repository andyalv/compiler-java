import {
  CheckCircle2Icon,
  ClipboardIcon,
  DownloadIcon,
  LoaderCircleIcon,
  PlayIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

type WorkbenchHeaderProps = {
  copied: boolean
  compiledSql: string
  errorMessage: string
  isCompiling: boolean
  hasSchema: boolean
  onCopy: () => void
  onDownloadSql: () => void
  onDownloadSchema: () => void
  onCompile: () => void
}

export function WorkbenchHeaderButtons({
  copied,
  compiledSql,
  errorMessage,
  isCompiling,
  hasSchema,
  onCopy,
  onDownloadSql,
  onDownloadSchema,
  onCompile,
}: WorkbenchHeaderProps) {
  const hasError = Boolean(errorMessage)
  const canUseSql = Boolean(compiledSql) && !hasError && !isCompiling
  const canUseSchema = hasSchema && !hasError && !isCompiling

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={!canUseSql}
        onClick={onCopy}
        className="border-white/12 bg-white/6 text-white hover:bg-white/10"
      >
        {copied ? <CheckCircle2Icon /> : <ClipboardIcon />}
        {copied ? "Copiado" : "Copiar SQL"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={!canUseSql}
        onClick={onDownloadSql}
        className="border-white/12 bg-white/6 text-white hover:bg-white/10"
      >
        <DownloadIcon />
        Descargar TXT
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={!canUseSchema}
        onClick={onDownloadSchema}
        className="border-white/12 bg-white/6 text-white hover:bg-white/10"
      >
        <DownloadIcon />
        Descargar esquema
      </Button>
      <Button
        size="sm"
        disabled={isCompiling}
        onClick={onCompile}
        className="bg-white text-black hover:bg-white/88"
      >
        {isCompiling ? <LoaderCircleIcon className="animate-spin" /> : <PlayIcon />}
        {isCompiling ? "Compilando" : "Compilar"}
      </Button>
    </div>
  )
}
