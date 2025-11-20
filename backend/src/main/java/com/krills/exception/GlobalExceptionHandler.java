package com.krills.exception;

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
        if (exception instanceof ConstraintViolationException) {
            return handleConstraintViolation((ConstraintViolationException) exception);
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
