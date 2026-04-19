package dev.andyalv.compiler;

import java.util.List;
import java.util.ArrayList;

public class TableDef {
    String name;
    List<ColumnDef> columns;
    List<String> relationships; // To store relationships with other tables

    public TableDef(String name) {
        this.name = name;
        this.columns = new ArrayList<>();
        this.relationships = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "{name=" + name + ", columns=" + columns + ", relationships=" + relationships + '}';
    }

    public String getName() {
        return name;
    }

    public List<ColumnDef> getColumns() {
        return columns;
    }

    public List<String> getRelationships() {
        return relationships;
    }
}
