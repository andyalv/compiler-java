package dev.andyalv.compiler;

import org.antlr.runtime.*;

public class CompilerFacade {
    public CompilationResultDef compile(String source) throws CompilationException, Exception {
        if (source == null || source.isBlank()) throw new Exception("Source code cannot be empty.");

        ANTLRStringStream input = new ANTLRStringStream(source);
        rootLexer lexer = new rootLexer(input);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        rootParser parser = new rootParser(tokens);
        parser.start();

        CompilationResultDef compilation = parser.getCompilation();

        if (compilation.hasErrors()) throw new CompilationException(String.join("\n", compilation.getErrors()));

        return compilation;
    }
}
