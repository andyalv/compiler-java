export type ColumnDefinition = {
  name: string
  dataType: string
  precision: string | null
}

export type TableDefinition = {
  name: string
  columns: ColumnDefinition[]
  relationships: string[]
}

export type DatabaseDefinition = {
  name: string
  tables: TableDefinition[]
}

export type DatabaseSchema = {
  databases: DatabaseDefinition[]
  orphanTables: TableDefinition[]
}

export type CompileResponse = {
  sql: string
  schema: DatabaseSchema
}

export type CompileErrorResponse = {
  error?: string
}
