package dev.andyalv.api.compile;

import dev.andyalv.compiler.CompilationException;
import dev.andyalv.compiler.CompilerFacade;
import org.springframework.stereotype.Service;

@Service
public class CompileService {

	private final CompilerFacade compilerFacade = new CompilerFacade();

	public String compile(CompileRequest request) throws CompileRequestException, CompilationException {
		if (request == null) {
			throw new CompileRequestException("Request body is required.");
		}

		String source = request.source();
		if (source == null || source.isBlank()) {
			throw new CompileRequestException("Field 'source' is required.");
		}

		return compilerFacade.compile(source.trim());
	}
}
