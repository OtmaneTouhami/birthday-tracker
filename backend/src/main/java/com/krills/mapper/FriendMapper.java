package com.krills.mapper;

import com.krills.dto.FriendRequestDTO;
import com.krills.dto.FriendResponseDTO;
import com.krills.entity.Friend;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@ApplicationScoped
public class FriendMapper {

    public Friend toEntity(FriendRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        Friend friend = new Friend();
        friend.firstName = dto.firstName;
        friend.lastName = dto.lastName;
        friend.birthDate = dto.birthDate;

        return friend;
    }

    public FriendResponseDTO toDTO(Friend friend) {

        if (friend == null) {
            return null;
        }

        FriendResponseDTO dto = new FriendResponseDTO();
        dto.id = friend.id;
        dto.firstName = friend.firstName;
        dto.lastName = friend.lastName;
        dto.birthDate = friend.birthDate;

        LocalDate today = LocalDate.now();
        LocalDate nextBirthday = friend.birthDate.withYear(today.getYear());

        // Check if birthday is today
        if (nextBirthday.isEqual(today)) {
            dto.isBirthdayToday = true;
            dto.daysUntilBirthday = 0;
            dto.nextBirthday = today;
        }
        // If birthday already passed this year, calculate for next year
        else if (nextBirthday.isBefore(today)) {
            dto.isBirthdayToday = false;
            nextBirthday = nextBirthday.plusYears(1);
            dto.nextBirthday = nextBirthday;
            dto.daysUntilBirthday = (int) ChronoUnit.DAYS.between(today, nextBirthday);
        }
        // Birthday is upcoming this year
        else {
            dto.isBirthdayToday = false;
            dto.nextBirthday = nextBirthday;
            dto.daysUntilBirthday = (int) ChronoUnit.DAYS.between(today, nextBirthday);
        }

        return dto;
    }
}
