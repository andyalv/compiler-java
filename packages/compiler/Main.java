
import org.antlr.runtime.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ANTLRInputStream input = new ANTLRInputStream(System.in);
        rootLexer lexer = new rootLexer(input);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        rootParser parser = new rootParser(tokens);
        parser.start();
    }
}
