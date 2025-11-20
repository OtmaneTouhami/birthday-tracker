package com.krills.dto;

import java.util.UUID;

public class AuthResponseDTO {
    public String token;
    public UUID userId;
    public String username;

    public AuthResponseDTO(String token, UUID userId, String username) {
        this.token = token;
        this.userId = userId;
        this.username = username;
    }
}