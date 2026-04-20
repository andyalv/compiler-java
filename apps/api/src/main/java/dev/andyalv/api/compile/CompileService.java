package dev.andyalv.api.compile;

import dev.andyalv.compiler.CompilationException;
import dev.andyalv.compiler.CompilationResultDef;
import dev.andyalv.compiler.CompilerFacade;
import org.springframework.stereotype.Service;

@Service
public class CompileService {

	private final CompilerFacade compilerFacade = new CompilerFacade();

	public CompileResponse compile(CompileRequest request)
			throws Exception {
		if (request == null) {
			throw new CompileRequestException("Request body is required.");
		}

		String source = request.source();
		if (source == null || source.isBlank()) {
			throw new CompileRequestException("Field 'source' is required.");
		}

		CompilationResultDef compilation;
		try {
			compilation = compilerFacade.compile(source.trim());
		} catch (RuntimeException exception) {
			String message = exception.getMessage();
			throw new CompilationException(
					message == null || message.isBlank() ? "Compilation failed." : message,
					exception);
		}

		String sql = String.join("\n", compilation.getSql());
		return new CompileResponse(sql, compilation.getSchema());
	}
}
