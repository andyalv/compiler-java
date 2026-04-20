import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatColumnType } from "@/lib/compiler/formatters"
import type { DatabaseSchema, TableDefinition } from "@/types/compiler"

function TableSchemaBlock({ table }: { table: TableDefinition }) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-medium text-white/90">{table.name}</h4>
        <Badge className="border border-white/10 bg-white/8 px-2 py-0.5 text-[0.65rem] uppercase text-white/55 hover:bg-white/8">
          tabla
        </Badge>
      </div>

      <div className="space-y-2 text-sm text-white/70">
        {table.columns.length > 0 ? (
          table.columns.map((column) => (
            <div key={`${table.name}-${column.name}`} className="flex flex-wrap gap-2">
              <span className="text-white/88">{column.name}</span>
              <span className="text-white/45">{formatColumnType(column)}</span>
            </div>
          ))
        ) : (
          <p className="text-white/35">Sin columnas definidas.</p>
        )}

        {table.relationships.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {table.relationships.map((relationship) => (
              <Badge
                key={`${table.name}-rel-${relationship}`}
                className="border border-white/10 bg-white/8 px-2 py-0.5 text-[0.65rem] uppercase text-white/55 hover:bg-white/8"
              >
                relacion {relationship}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function SchemaPanel({ schema }: { schema: DatabaseSchema | null }) {
  return (
    <Card className="border border-white/10 bg-white/4 shadow-none">
      <CardHeader className="px-5">
        <CardTitle className="text-sm tracking-[0.2em] uppercase text-white/92">
          Esquema actual
        </CardTitle>
        <CardDescription className="text-xs text-white/45">
          Vista jerarquica de las bases de datos, tablas, columnas y relaciones detectadas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-5 pb-5">
        {!schema ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-4 py-6 text-sm text-white/35">
            Aqui aparecera la estructura detectada de la base de datos.
          </div>
        ) : (
          <>
            {schema.databases.length > 0 ? (
              <div className="space-y-4">
                {schema.databases.map((database) => (
                  <section key={database.name} className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-medium text-white/90">{database.name}</h3>
                      <Badge className="border border-white/10 bg-white/8 px-2 py-0.5 text-[0.65rem] uppercase text-white/55 hover:bg-white/8">
                        base de datos
                      </Badge>
                    </div>

                    <div className="grid gap-3 lg:grid-cols-2">
                      {database.tables.map((table) => (
                        <TableSchemaBlock key={`${database.name}-${table.name}`} table={table} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : null}

            {schema.orphanTables.length > 0 ? (
              <section className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-medium text-white/90">Tablas sin base de datos</h3>
                  <Badge className="border border-white/10 bg-white/8 px-2 py-0.5 text-[0.65rem] uppercase text-white/55 hover:bg-white/8">
                    huerfanas
                  </Badge>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  {schema.orphanTables.map((table) => (
                    <TableSchemaBlock key={`orphan-${table.name}`} table={table} />
                  ))}
                </div>
              </section>
            ) : null}

            {schema.databases.length === 0 && schema.orphanTables.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-4 py-6 text-sm text-white/35">
                No se detectaron bases de datos ni tablas en el esquema.
              </div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  )
}
