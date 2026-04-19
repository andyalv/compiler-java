package dev.andyalv.compiler;

import java.util.ArrayList;
import java.util.List;

public class DatabaseSchema {
    List<TableDef> orphanTables = new ArrayList<>();
    List<DatabaseDef> databases =  new ArrayList<>();

    public List<TableDef> getOrphanTables() {
        return orphanTables;
    }

    public List<DatabaseDef> getDatabases() {
        return databases;
    }

    public DatabaseDef getDatabase(String name) {
        for (DatabaseDef database : databases) {
            if (database.getName().equals(name)) {
                return database;
            }
        }
        return null;
    }

    public void addDatabase(DatabaseDef database) {
        databases.add(database);
    }

    public void addOrphanTable(TableDef table) {
        orphanTables.add(table);
    }

    @Override
    public String toString() {
        return "{" + "orphanTables=" + orphanTables + ", databases=" + databases + '}';
    }

}
