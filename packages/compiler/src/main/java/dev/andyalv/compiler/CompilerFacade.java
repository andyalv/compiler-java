package dev.andyalv.compiler;
import org.antlr.runtime.*;

public class CompilerFacade {
    public String compile(String source) throws Exception {
        try {
            ANTLRStringStream input = new ANTLRStringStream(source);
            rootLexer lexer = new rootLexer(input);
            CommonTokenStream tokens = new CommonTokenStream(lexer);
            rootParser parser = new rootParser(tokens);
            parser.start();
            return parser.getSQL();
        } catch (Exception e) {
            throw new Exception("An error occurred while compiling source code", e);
        }
    }
}
