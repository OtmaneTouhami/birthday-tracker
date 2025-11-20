package com.krills.mapper;

import com.krills.dto.ProfileResponseDTO;
import com.krills.dto.RegisterRequestDTO;
import com.krills.entity.User;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserMapper {
    public User toUser(RegisterRequestDTO dto) {
        if (dto == null) return null;

        User user = new User();
        user.username = dto.username;
        user.email = dto.email;
        user.birthDate = dto.birthDate;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;

        return user;
    }

    public ProfileResponseDTO toDTO(User user) {
        if (user == null) return null;

        ProfileResponseDTO dto = new ProfileResponseDTO();
        dto.id = user.id;
        dto.username = user.username;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.birthDate = user.birthDate;

        return dto;
    }
}
