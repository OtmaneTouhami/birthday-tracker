package com.krills.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class RegisterRequestDTO {
    @NotBlank(message = "Username is required")
    public String username;

    @Email(message = "Email must be valid")
    @NotBlank(message = "Email is required")
    public String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    public String password;

    @NotBlank(message = "First name is required")
    @Size(min = 1, max = 255)
    public String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 1, max = 255)
    public String lastName;

    @NotNull(message = "Birth date is required")
    @Past(message = "Birth date must be in the past")
    public LocalDate birthDate;
}
