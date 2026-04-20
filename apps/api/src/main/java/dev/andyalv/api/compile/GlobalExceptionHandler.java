package dev.andyalv.api.compile;

import dev.andyalv.compiler.CompilationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler({CompileRequestException.class, CompilationException.class, HttpMessageNotReadableException.class})
	public ResponseEntity<CompileErrorResponse> handleBadRequest(Exception exception) {
		String message = exception instanceof HttpMessageNotReadableException
				? "Invalid JSON request body."
				: exception.getMessage();

		return error(HttpStatus.BAD_REQUEST, message);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<CompileErrorResponse> handleUnexpectedError() {
		return error(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error.");
	}

	private ResponseEntity<CompileErrorResponse> error(HttpStatus status, String message) {
		return ResponseEntity.status(status).body(new CompileErrorResponse(message));
	}
}
