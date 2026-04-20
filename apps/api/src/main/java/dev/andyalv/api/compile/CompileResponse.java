package dev.andyalv.api.compile;

import dev.andyalv.compiler.DatabaseSchema;

public record CompileResponse(String sql, DatabaseSchema schema) {
}
