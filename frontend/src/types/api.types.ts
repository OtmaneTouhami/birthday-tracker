// Constraint Violation Error (Validation Errors - 400)
export interface ConstraintViolation {
  field: string;
  message: string;
}

export interface ConstraintViolationError {
  title: "Constraint Violation";
  status: 400;
  violations: ConstraintViolation[];
}

// Business Error (401, 403, 404, 409, 500)
export interface BusinessError {
  message: string;
  status: number;
  timestamp: string;
  errors: null;
}

// Legacy format (kept for compatibility)
export interface ErrorResponse {
  message: string;
  status: number;
  timestamp: string;
  errors?: Record<string, string>;
}

// Union type for API errors
export type ApiErrorResponse = ConstraintViolationError | BusinessError;

// Type for processed errors
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string>;
}

// Type guard functions
export function isConstraintViolationError(
  error: any
): error is ConstraintViolationError {
  return (
    error?.title === "Constraint Violation" && Array.isArray(error?.violations)
  );
}

export function isBusinessError(error: any): error is BusinessError {
  return (
    typeof error?.message === "string" &&
    typeof error?.status === "number" &&
    error?.errors === null
  );
}

// Helper to extract clean field name from "methodName.paramName.fieldName"
export function extractFieldName(fullFieldPath: string): string {
  const parts = fullFieldPath.split(".");
  return parts[parts.length - 1];
}

// Parse API error into a consistent format
export function parseApiError(error: any): ApiError {
  const responseData = error?.response?.data || error;

  // Handle Constraint Violation errors
  if (isConstraintViolationError(responseData)) {
    const fieldErrors: Record<string, string> = {};

    responseData.violations.forEach((violation) => {
      const fieldName = extractFieldName(violation.field);
      fieldErrors[fieldName] = violation.message;
    });

    // Create a combined message from all violations
    const messages = responseData.violations.map((v) => v.message);

    return {
      message: messages[0] || "Validation failed",
      status: responseData.status,
      errors: fieldErrors,
    };
  }

  // Handle Business errors
  if (isBusinessError(responseData)) {
    return {
      message: responseData.message,
      status: responseData.status,
    };
  }

  // Fallback for other error types
  return {
    message:
      responseData?.message || error?.message || "An unexpected error occurred",
    status: error?.response?.status || error?.status,
    errors: responseData?.errors,
  };
}
