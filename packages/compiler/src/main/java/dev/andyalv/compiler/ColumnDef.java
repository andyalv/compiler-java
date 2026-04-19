package dev.andyalv.compiler;

public class ColumnDef {
    String name;
    String dataType;
    String precision; // For numeric and string types to store precision or length

    public ColumnDef(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return (precision == null) ? String.format("%s %s", name, dataType) : String.format("%s %s(%s)", name, dataType, precision);
    }

    public String getName() {
        return name;
    }

    public String getDataType() {
        return dataType;
    }

    public String getPrecision() {
        return precision;
    }
}
