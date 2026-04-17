package dev.andyalv.api.compile;

import dev.andyalv.compiler.CompilationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/compile")
@CrossOrigin(origins = "*")
public class CompileController {

	private final CompileService compileService;

	public CompileController(CompileService compileService) {
		this.compileService = compileService;
	}

	@PostMapping
	public ResponseEntity<CompileResponse> compile(@RequestBody CompileRequest request)
			throws CompileRequestException, CompilationException {
		String sql = compileService.compile(request);
		return ResponseEntity.ok(new CompileResponse(sql));
	}
}
