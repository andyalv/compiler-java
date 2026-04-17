grammar root;

@lexer::header {
    package dev.andyalv.compiler;
}

@parser::header {
    package dev.andyalv.compiler;

    import java.util.ArrayList;
    import java.util.List;
    import java.util.HashMap;
    import java.util.Map;
}
@members {
    List<Table> tables = new ArrayList<Table>();
    Table currentTable = null;
    Column currentColumn = null;
    List<String> sqlLines = new ArrayList<String>();

    Map<String, String> datatypeMapping = new HashMap<String, String>() {{
        put("integer", "INTEGER");
        put("numeric", "NUMERIC");
        put("string", "VARCHAR");
        put("date", "DATE");
    }};

    public void generateTableSQL(Table table) {
        // No table defined, skip SQL generation
        if (table == null) return;

        // No columns defined, skip SQL generation
        if (table.columns.isEmpty()) return;

        String sql_statement = "CREATE TABLE IF NOT EXISTS " + table.name + " (";
        sql_statement += table.name + "_key SERIAL PRIMARY KEY";

        for (Column col : table.columns) {
            String precision = (col.precision != null) ? "(" + col.precision + ")" : "";
            sql_statement += ", " + col.name + " " + col.dataType + precision;
        }

        for (String rel : table.relationships) {
            sql_statement += ", fk_" + rel + " INTEGER REFERENCES " + rel + "(" + rel + "_key)";
        }

        sql_statement += ");";

        sqlLines.add(sql_statement);
    }

    public String getSQL() {
        return String.join("\n", sqlLines);
    }

    public void printSQL() {
        for (String line : sqlLines) {
            System.out.println(line);
        }
    }
}

start : statement+ ;

statement : 
        CREATE_DATABASE ID {
            sqlLines.add("CREATE DATABASE " + $ID.text + ";");
        }
        | connectionDef
        | tableDef
        ;

connectionDef: 
            useDatabaseDef tableDef*
            CLOSECON {
                sqlLines.add("/q");
            }
            ;

useDatabaseDef: USE_DATABASE ID {
        sqlLines.add("/c " + $ID.text);
    }
    ;

// Table definition with fields
tableDef: 
    TABLE ID START  {
        // Code to create data structure for the table
        Table t = new Table($ID.text);
        tables.add(t);
        currentTable = t;
    }
    fieldDef+
    END {
        generateTableSQL(currentTable); // Generate SQL for the current table
        currentTable = null; // Reset current table after finishing definition
    }
    ;

// ID {Update current column} dataType precisionDef? ;
fieldDef: 
    ID { 
        currentColumn = new Column();
        currentColumn.name = $ID.text;
    }
    dataType precisionDef? {
        if (currentColumn.precision == null && currentColumn.dataType.equals("VARCHAR"))
            currentColumn.dataType = "TEXT"; // Default to TEXT if no precision specified for string type

        currentTable.columns.add(currentColumn);
        currentColumn = null; // Reset current column after adding to table
    }
    | RELATIONSHIP ID {
        String id = $ID.text;
        boolean relationshipExists = false;

        // Check if ID is an existing table
        for (Table t : tables) {
            if (!t.name.equals(id))
                continue;
           
            currentTable.relationships.add(t.name);
            relationshipExists = true;
            return; // Exit after finding the matching table
        }

        if (!relationshipExists) {
            throw new RuntimeException("Relationship target '" + id + "' does not exist.");
        }

    }
    ;


dataType: 
    INTEGER     { currentColumn.dataType = datatypeMapping.get($INTEGER.text); }
    | NUMERIC   { currentColumn.dataType = datatypeMapping.get($NUMERIC.text); }
    | STRING    { currentColumn.dataType = datatypeMapping.get($STRING.text); }
    | DATE      { currentColumn.dataType = datatypeMapping.get($DATE.text); }
  ;

// Precision definition for numeric and string types (e.g. '0,2' or '255')
precisionDef: 
        a=NUM ',' b=NUM     { currentColumn.precision = $a.text + "," + $b.text; }
        | NUM               { currentColumn.precision = $NUM.text; }
        ;


// Data type tokens
INTEGER         : 'integer'             ;
NUMERIC         : 'numeric'             ;
STRING          : 'string'              ;
DATE            : 'date'                ;

// Table and relationship tokens
TABLE           : 'table'               ;
RELATIONSHIP    : 'relationship'        ;

// Control flow tokens
START           : 'start'               ;
END             : 'end'                 ;

// Connection and database tokens
USE_DATABASE    : 'with'                ;
CLOSECON        : 'closecon'            ;
CREATE_DATABASE : 'create database'   ;

// Basic tokens
NUM: ('0'..'9')+ ;
ID:  ('a'..'z'|'A'..'Z'|'_') ('a'..'z'|'A'..'Z'|'0'..'9'|'_')* ;  
WS:  (' ' | '\n' | '\t' | '\r')+   {$channel=HIDDEN; } ;  // Whitespace