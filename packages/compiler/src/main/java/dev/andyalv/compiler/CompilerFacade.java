package dev.andyalv.compiler;

import org.antlr.runtime.*;

public class CompilerFacade {
    public String compile(String source) throws CompilationException {
        if (source == null || source.isBlank()) {
            throw new CompilationException("Source code cannot be empty.");
        }

        try {
            ANTLRStringStream input = new ANTLRStringStream(source);
            rootLexer lexer = new rootLexer(input);
            CommonTokenStream tokens = new CommonTokenStream(lexer);
            rootParser parser = new rootParser(tokens);
            parser.start();

            if (parser.hasErrors()) {
                throw new CompilationException(parser.getErrors());
            }

            return parser.getSQL();
        } catch (CompilationException e) {
            throw e;
        } catch (RuntimeException e) {
            String message = e.getMessage();
            if (message != null && !message.isBlank()) {
                throw new CompilationException(message, e);
            }

            throw e;
        } catch (RecognitionException e) {
            throw new CompilationException(e.getMessage(), e);
        }
    }
}
