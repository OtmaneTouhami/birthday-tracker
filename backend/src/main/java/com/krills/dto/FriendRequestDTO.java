package com.krills.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;

public class FriendRequestDTO {

    @NotBlank
    public String firstName;

    @NotBlank
    public String lastName;

    @NotNull
    @Past
    public LocalDate birthDate;

}