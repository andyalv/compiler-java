grammar root;

@header {
    import java.util.ArrayList;
    import java.util.List;
    import java.util.HashMap;
    import java.util.Map;
}

@members {
    List<Table> tables = new ArrayList<Table>();
    Table currentTable = null;
    Column currentColumn = null;

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

        String sql_statement = "CREATE TABLE " + table.name + " (";
        sql_statement += table.name + "_key INTEGER AUTOINCREMENT NOT NULL";

        for (Column col : table.columns) {
            String precision = (col.precision != null) ? "(" + col.precision + ")" : "";
            sql_statement += ", " + col.name + " " + col.dataType + precision;
        }

        sql_statement += ";";

        System.out.println(sql_statement);
    }

    public void generateSQL() {
        for (Table table : tables) {
            generateTableSQL(table);
        }
    }
}

start : statement+ ;

statement : connectionDef
          | tableDef { generateSQL(); } // Generate SQL after processing all statements
          ;

connectionDef: 
                createDatabaseDef
                | useDatabaseDef tableDef* {
                    generateSQL(); // Generate SQL after processing connection and table definitions
                } 
                CLOSECON {
                    System.out.println("/q");
                }
                ;

createDatabaseDef: 
    CREATE_DATABASE ID {
        System.out.println("CREATE DATABASE " + $ID.text + ";");
    }
    ;

useDatabaseDef: USE_DATABASE ID {
        System.out.println("/c " + $ID.text);
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
        // Handle relationship definition if needed
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