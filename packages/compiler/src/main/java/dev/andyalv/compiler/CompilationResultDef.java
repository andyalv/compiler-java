package dev.andyalv.compiler;

import java.util.ArrayList;
import java.util.List;

public class CompilationResultDef {
    DatabaseSchema schema;
    List<String> errors = new ArrayList<>();
    List<String> sql = new ArrayList<>();

    public CompilationResultDef(DatabaseSchema schema, List<String> errors, List<String> sql) {
        this.schema = schema;
        this.errors = errors;
        this.sql = sql;
    }

    public boolean hasErrors() {
        return !errors.isEmpty();
    }

    public List<String> getErrors() {
        return errors;
    }

    public List<String> getSql() {
        return sql;
    }

    public DatabaseSchema getSchema() {
        return schema;
    }

    @Override
    public String toString() {
        return "{" + "schema=" + schema + ", errors=" + errors + ", sql=" + sql + '}';
    }
}
