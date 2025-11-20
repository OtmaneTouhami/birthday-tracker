package com.krills.exception;

import java.time.LocalDateTime;
import java.util.Map;

public class ErrorResponse {
    public String message;
    public int status;
    public LocalDateTime timestamp;
    public Map<String, String> errors;

    public ErrorResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponse(String message, int status, Map<String, String> errors) {
        this.message = message;
        this.status = status;
        this.errors = errors;
        this.timestamp = LocalDateTime.now();
    }
}
