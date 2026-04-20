import { AlertCircleIcon, SparklesIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CompilationStatus({ errorMessage }: { errorMessage: string }) {
  return (
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
            <AlertDescription className="text-white/45"/>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
