package com.krills.service;

import com.krills.dto.ChangePasswordRequestDTO;
import com.krills.dto.ProfileRequestDTO;
import com.krills.dto.ProfileResponseDTO;
import com.krills.entity.User;
import com.krills.mapper.UserMapper;
import com.krills.repository.UserRepository;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.util.UUID;

@ApplicationScoped
public class ProfileService {

    @Inject
    UserRepository userRepository;

    @Inject
    UserMapper mapper;

    public ProfileResponseDTO getProfile(UUID userId) {
        User user = findById(userId);
        return mapper.toDTO(user);
    }

    @Transactional
    public ProfileResponseDTO updateProfile(UUID userId, ProfileRequestDTO dto) {
        User user = findById(userId);

        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.birthDate = dto.birthDate;
        user.email = dto.email;
        user.username = dto.username;

        return mapper.toDTO(user);
    }

    @Transactional
    public void deleteProfile(UUID userId) {
        User user = findById(userId);
        userRepository.delete(user);
    }

    @Transactional
    public void changePassword(UUID userId, ChangePasswordRequestDTO dto) {
        User user = findById(userId);

        if (!BcryptUtil.matches(dto.oldPassword, user.password)) {
            throw new WebApplicationException("Invalid old password", Response.Status.UNAUTHORIZED);
        }

        user.password = BcryptUtil.bcryptHash(dto.newPassword);
    }

    public User findById(UUID id) {
        return userRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }
}
