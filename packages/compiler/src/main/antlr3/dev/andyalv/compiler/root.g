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
    DatabaseSchema schema = new DatabaseSchema();

    DatabaseDef currentDatabase = null;
    TableDef currentTable = null;
    ColumnDef currentColumn = null;

    // Global list of tables for relationship validation, this will be populated as tables are defined and used to validate relationships
    List<TableDef> tables = new ArrayList<TableDef>();

    List<String> sqlLines = new ArrayList<String>();
    List<String> errors = new ArrayList<String>();

    Map<String, String> datatypeMapping = new HashMap<String, String>() {{
        put("integer", "INTEGER");
        put("numeric", "NUMERIC");
        put("string", "VARCHAR");
        put("date", "DATE");
    }};

    @Override
    public void displayRecognitionError(String[] tokenNames, RecognitionException e) {
        String message = getErrorMessage(e, tokenNames);
        String errorMessage = "Syntax error at line " + e.line + ", position " + e.charPositionInLine + ": " + message;
        errors.add(errorMessage);
    }

    public CompilationResultDef getCompilation() {
        return new CompilationResultDef(schema, errors, sqlLines);
    }

    public String generateTableSQL(TableDef table) {
        // No table defined, skip SQL generation
        if (table == null) return null;

        // No columns defined, skip SQL generation
        if (table.columns.isEmpty() && table.relationships.isEmpty()) return null;

        String sql_statement = "CREATE TABLE IF NOT EXISTS " + table.name + " (";
        sql_statement += table.name + "_key SERIAL PRIMARY KEY";

        for (ColumnDef col : table.columns) {
            String precision = (col.precision != null) ? "(" + col.precision + ")" : "";
            sql_statement += ", " + col.name + " " + col.dataType + precision;
        }

        for (String rel : table.relationships) {
            sql_statement += ", fk_" + rel + " INTEGER REFERENCES " + rel + "(" + rel + "_key)";
        }

        sql_statement += ");";

        return sql_statement;
    }

    public void appendTableToSQL(TableDef table) {
        String sql = generateTableSQL(table);
        if (sql != null) sqlLines.add(sql);
    }

    public void printStringList(List<String> source) {
        for (String row : source) {
            System.out.println(row);
        }
    }
}

start : statement+ ;

statement : 
        CREATE_DATABASE ID {
            schema.addDatabase(new DatabaseDef($ID.text));
            sqlLines.add("CREATE DATABASE " + $ID.text + ";");
        }
        | connectionDef
        | tableDef
        ;

connectionDef: 
            useDatabaseDef tableDef*
            | CLOSECON {
                currentDatabase = null; // Reset current database context on close connection
                sqlLines.add("\\q");
            }
            ;

useDatabaseDef: USE_DATABASE ID {
        // If database already exists in schema, set as current context,
        // this will return null if it doesn't exist, which we will handle by creating a new database context
        currentDatabase = schema.getDatabase($ID.text);

        // If database doesn't exist, create new context and add to schema
        if (currentDatabase == null) {
            currentDatabase = new DatabaseDef($ID.text);
            schema.addDatabase(currentDatabase);
        }

        sqlLines.add("\\c " + $ID.text);
    }
    ;

// Table definition with fields
tableDef: 
    TABLE ID START  {
        currentTable = new TableDef($ID.text);

        if (currentDatabase != null)
            currentDatabase.addTable(currentTable); // Add to current database context if exists
        else
            schema.addOrphanTable(currentTable); // Add to schema as orphan table if no database context

        tables.add(currentTable); // Add to global tables list for relationship validation
    }
    fieldDef+
    END {
        appendTableToSQL(currentTable); // Append Table SQL after finishing definition to SQL lines list
        currentTable = null; // Reset current table after finishing definition
    }
    ;

// ID {Update current column} dataType precisionDef? ;
fieldDef: 
    ID {
        // Create new column definition with the ID as the column name, this will be updated with data type and precision in subsequent rules
        currentColumn = new ColumnDef($ID.text);
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
        for (TableDef table : tables) {
            if (!table.name.equals(id)) continue;

            currentTable.relationships.add(table.name);
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
