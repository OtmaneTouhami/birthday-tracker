package com.krills.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class ProfileRequestDTO {
    @NotBlank(message = "Username is required")
    public String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    public String email;

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
