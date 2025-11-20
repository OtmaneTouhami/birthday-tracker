package com.krills.dto;

import java.time.LocalDate;
import java.util.UUID;

public class ProfileResponseDTO {
    public UUID id;
    public String username;
    public String email;
    public String firstName;
    public String lastName;
    public LocalDate birthDate;

    public ProfileResponseDTO() {};

    public ProfileResponseDTO(
            UUID id,
            String username,
            String email,
            String firstName,
            String lastName,
            LocalDate birthDate
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }
}
