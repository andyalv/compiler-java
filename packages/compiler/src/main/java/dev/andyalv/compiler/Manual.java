package dev.andyalv.compiler;

import org.antlr.runtime.*;

public class Manual {
    public static void main(String[] args) throws Exception {
        CompilerFacade facade = new CompilerFacade();
        String correct_input = """
                create database enterprise
                with enterprise
                table depto
                    start
                       name string 40
                       department_code string 10
                       number   integer
                       responsabilities string
                    end
                table empleado
                    start
                       name string 40
                       age integer
                       birth_date date
                       salary integer
                       relationship depto
                    end
                closecon
                """;
        String relationship_error = """
                create database enterprise
                with enterprise
                table empleado
                    start
                       relationship depto
                    end
                closecon
                """;
        String sintax_error = """
                create database enterprise
                with enterprise
                table empleado
                    start
                       salary numeric 6,
                    end
                closecon
                """;
        CompilationResultDef compilation = facade.compile(correct_input);
        System.out.println(compilation);
    }
}
