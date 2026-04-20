import type { ColumnDefinition, DatabaseSchema } from "@/types/compiler"

export function formatColumnType(column: ColumnDefinition) {
  return column.precision ? `${column.dataType}(${column.precision})` : column.dataType
}

export function formatSchemaAsText(schema: DatabaseSchema | null) {
  if (!schema) {
    return "No hay esquema disponible."
  }

  const lines: string[] = []

  for (const database of schema.databases) {
    lines.push(`Base de datos: ${database.name}`)

    for (const table of database.tables) {
      lines.push(`  Tabla: ${table.name}`)

      for (const column of table.columns) {
        lines.push(`    - ${column.name}: ${formatColumnType(column)}`)
      }

      for (const relationship of table.relationships) {
        lines.push(`    - Relacion: ${relationship}`)
      }

      lines.push("")
    }
  }

  if (schema.orphanTables.length > 0) {
    lines.push("Tablas sin base de datos")

    for (const table of schema.orphanTables) {
      lines.push(`  Tabla: ${table.name}`)

      for (const column of table.columns) {
        lines.push(`    - ${column.name}: ${formatColumnType(column)}`)
      }

      for (const relationship of table.relationships) {
        lines.push(`    - Relacion: ${relationship}`)
      }

      lines.push("")
    }
  }

  return lines.length > 0 ? lines.join("\n").trim() : "No se detectaron bases de datos ni tablas en el esquema."
}
