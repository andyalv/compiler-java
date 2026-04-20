import type { CompileErrorResponse, CompileResponse } from "@/types/compiler"

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL.replace(/\/$/, "")

export async function compileSource(source: string) {
  const response = await fetch(`${API_BASE_URL}/compile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ source }),
  })

  const payload = (await response.json().catch(() => null)) as
    | (CompileResponse & CompileErrorResponse)
    | null

  if (!response.ok) {
    throw new Error(payload?.error || "No se pudo completar la compilacion.")
  }

  return {
    sql: payload?.sql || "",
    schema: payload?.schema || null,
  }
}
