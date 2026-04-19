package dev.andyalv.compiler;

import java.util.ArrayList;
import java.util.List;

public class DatabaseDef {
    String name;
    List<TableDef> tables = new ArrayList<>();

    public DatabaseDef(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public List<TableDef> getTables() {
        return tables;
    }

    public void addTable(TableDef table) {
        tables.add(table);
    }

    @Override
    public String toString() {
        return "{" + "name='" + name + '\'' + ", tables=" + tables + '}';
    }
}
