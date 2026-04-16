
import java.util.List;
import java.util.ArrayList;

public class Table {
    String name;
    List<Column> columns;
    List<String> relationships; // To store relationships with other tables

    public Table(String name) {
        this.name = name;
        this.columns = new ArrayList<>();
        this.relationships = new ArrayList<>();
    }
}
