package com.krills.exception;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.Map;
import java.util.stream.Collectors;

@Provider
public class GlobalExceptionHandler implements ExceptionMapper<Exception> {

    @Override
    public Response toResponse(Exception exception) {

        Throwable cause = exception.getCause();

        if (exception instanceof ConstraintViolationException) {
            return handleConstraintViolation((ConstraintViolationException) exception);
        } else if (exception instanceof InvalidFormatException) {
            return handleInvalidFormat((InvalidFormatException) exception);
        } else if (exception instanceof JsonParseException) {
            return handleJsonParseException((JsonParseException) exception);
        } else if (exception instanceof JsonMappingException) {
            return handleJsonMappingException((JsonMappingException) exception);
        } else if (cause instanceof InvalidFormatException) {
            return handleInvalidFormat((InvalidFormatException) cause);
        } else if (cause instanceof JsonParseException) {
            return handleJsonParseException((JsonParseException) cause);
        } else if (cause instanceof JsonMappingException) {
            return handleJsonMappingException((JsonMappingException) cause);
        } else if (exception instanceof NotFoundException) {
            return handleNotFound((NotFoundException) exception);
        } else if (exception instanceof WebApplicationException) {
            return handleWebApplicationException((WebApplicationException) exception);
        } else {
            return handleGenericException(exception);
        }
    }

    private Response handleConstraintViolation(ConstraintViolationException exception) {
        Map<String, String> errors = exception.getConstraintViolations()
                .stream()
                .collect(Collectors.toMap(
                        this::getPropertyName,
                        ConstraintViolation::getMessage,
                        (existing, replacement) -> existing
                ));

        ErrorResponse errorResponse = new ErrorResponse(
                "Validation failed",
                Response.Status.BAD_REQUEST.getStatusCode(),
                errors
        );

        return Response.status(Response.Status.BAD_REQUEST)
                .entity(errorResponse)
                .build();
    }

    private Response handleInvalidFormat(InvalidFormatException exception) {
        String fieldName = exception.getPath().isEmpty() ? "unknown" :
                exception.getPath().get(exception.getPath().size() - 1).getFieldName();
        String message = String.format("Invalid value for field '%s': %s", fieldName, exception.getValue());

        ErrorResponse errorResponse = new ErrorResponse(
                message,
                Response.Status.BAD_REQUEST.getStatusCode(),
                Map.of(fieldName, "Invalid format: " + exception.getTargetType().getSimpleName() + " expected")
        );

        return Response.status(Response.Status.BAD_REQUEST)
                .entity(errorResponse)
                .build();
    }

    private Response handleJsonParseException(JsonParseException exception) {
        ErrorResponse errorResponse = new ErrorResponse(
                "Invalid JSON format: " + exception.getOriginalMessage(),
                Response.Status.BAD_REQUEST.getStatusCode(),
                null
        );

        return Response.status(Response.Status.BAD_REQUEST)
                .entity(errorResponse)
                .build();
    }

    private Response handleJsonMappingException(JsonMappingException exception) {
        String fieldName = exception.getPath().isEmpty() ? "unknown" :
                exception.getPath().get(exception.getPath().size() - 1).getFieldName();

        ErrorResponse errorResponse = new ErrorResponse(
                "Invalid JSON mapping for field '" + fieldName + "': " + exception.getOriginalMessage(),
                Response.Status.BAD_REQUEST.getStatusCode(),
                Map.of(fieldName, "Invalid value")
        );

        return Response.status(Response.Status.BAD_REQUEST)
                .entity(errorResponse)
                .build();
    }

    private Response handleNotFound(NotFoundException exception) {
        ErrorResponse errorResponse = new ErrorResponse(
                exception.getMessage() != null ? exception.getMessage() : "Resource not found",
                Response.Status.NOT_FOUND.getStatusCode(),
                null
        );

        return Response.status(Response.Status.NOT_FOUND)
                .entity(errorResponse)
                .build();
    }

    private Response handleWebApplicationException(WebApplicationException exception) {
        String message = exception.getMessage();
        int status = exception.getResponse().getStatus();

        ErrorResponse errorResponse = new ErrorResponse(
                message != null ? message : "An error occurred",
                status,
                null
        );

        return Response.status(status)
                .entity(errorResponse)
                .build();
    }

    private Response handleGenericException(Exception exception) {
        System.err.println("Unhandled exception type: " + exception.getClass().getName());
        System.err.println("Exception message: " + exception.getMessage());
        exception.printStackTrace();

        ErrorResponse errorResponse = new ErrorResponse(
                "An unexpected error occurred",
                Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(),
                null
        );

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(errorResponse)
                .build();
    }

    private String getPropertyName(ConstraintViolation<?> violation) {
        String path = violation.getPropertyPath().toString();
        String[] parts = path.split("\\.");
        return parts[parts.length - 1];
    }
}
