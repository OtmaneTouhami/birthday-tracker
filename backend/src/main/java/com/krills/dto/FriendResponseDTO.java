package com.krills.dto;

import java.time.LocalDate;
import java.util.UUID;

public class FriendResponseDTO {
    public UUID id;
    public String firstName;
    public String lastName;
    public LocalDate birthDate;
    public Integer daysUntilBirthday;
    public LocalDate nextBirthday;
    public Boolean isBirthdayToday;

    public FriendResponseDTO() {};

    public FriendResponseDTO(
            UUID id,
            String firstName,
            String lastName,
            LocalDate birthDate,
            Integer daysUntilBirthday,
            LocalDate nextBirthday,
            Boolean isBirthdayToday
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.daysUntilBirthday = daysUntilBirthday;
        this.nextBirthday = nextBirthday;
        this.isBirthdayToday = isBirthdayToday;
    }
}