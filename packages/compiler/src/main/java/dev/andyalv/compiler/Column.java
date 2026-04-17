package dev.andyalv.compiler;

public class Column {
    String name;
    String dataType;
    String precision; // For numeric and string types to store precision or length

    public Column(String name, String dataType) {
        this(name, dataType, null);
    }

    public Column(String name, String dataType, String precision) {
        this.name = name;
        this.dataType = dataType;
        this.precision = precision;
    }

    public Column() {}

}
