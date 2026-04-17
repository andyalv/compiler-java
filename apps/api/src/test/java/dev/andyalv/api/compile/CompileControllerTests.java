package dev.andyalv.api.compile;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class CompileControllerTests {

	private final MockMvc mockMvc = MockMvcBuilders
			.standaloneSetup(new CompileController(new CompileService()))
			.setControllerAdvice(new GlobalExceptionHandler())
			.build();

	@Test
	void returnsSqlWhenCompilationSucceeds() throws Exception {
		String body = """
				{
				  \"source\": \"create database enterprise\\nwith enterprise\\ntable depto\\n    start\\n       name string 40\\n    end\\nclosecon\"
				}
				""";

		mockMvc.perform(post("/compile")
					.contentType(MediaType.APPLICATION_JSON)
					.content(body))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.sql").value("CREATE DATABASE enterprise;\n/c enterprise\nCREATE TABLE IF NOT EXISTS depto (depto_key SERIAL PRIMARY KEY, name VARCHAR(40));\n/q"));
	}

	@Test
	void returnsBadRequestWhenSourceIsBlank() throws Exception {
		mockMvc.perform(post("/compile")
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"source\":\"   \"}"))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.error").value("Field 'source' is required."));
	}

	@Test
	void returnsBadRequestWhenCompilationFails() throws Exception {
		String body = """
				{
				  \"source\": \"create database enterprise\\nwith enterprise\\ntable empleado\\n    start\\n       relationship depto\\n    end\\nclosecon\"
				}
				""";

		mockMvc.perform(post("/compile")
					.contentType(MediaType.APPLICATION_JSON)
					.content(body))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.error").value("Relationship target 'depto' does not exist."));
	}
}
