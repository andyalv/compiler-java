package dev.andyalv.api.compile;

import dev.andyalv.compiler.CompilationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(CompileRequestException.class)
	public ResponseEntity<CompileErrorResponse> handleBadRequest(CompileRequestException exception) {
		return ResponseEntity.badRequest().body(new CompileErrorResponse(exception.getMessage()));
	}

	@ExceptionHandler(CompilationException.class)
	public ResponseEntity<CompileErrorResponse> handleCompilationError(CompilationException exception) {
		return ResponseEntity.badRequest().body(new CompileErrorResponse(exception.getMessage()));
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<CompileErrorResponse> handleUnreadableBody() {
		return ResponseEntity.badRequest().body(new CompileErrorResponse("Invalid JSON request body."));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<CompileErrorResponse> handleUnexpectedError(Exception exception) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new CompileErrorResponse("Internal server error."));
	}
}
