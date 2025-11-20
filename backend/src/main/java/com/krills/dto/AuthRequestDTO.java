package com.krills.dto;

import jakarta.validation.constraints.NotBlank;

public class AuthRequestDTO {
    @NotBlank
    public String username;

    @NotBlank
    public String password;
}
