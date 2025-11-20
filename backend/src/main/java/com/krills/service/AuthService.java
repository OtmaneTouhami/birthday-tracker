package com.krills.service;

import com.krills.dto.AuthRequestDTO;
import com.krills.dto.AuthResponseDTO;
import com.krills.dto.RegisterRequestDTO;
import com.krills.entity.User;
import com.krills.mapper.UserMapper;
import com.krills.repository.UserRepository;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.time.Duration;
import java.util.HashSet;

@ApplicationScoped
public class AuthService {

    @Inject
    UserRepository userRepository;

    @Inject
    UserMapper mapper;

    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO request) {
        if (userRepository.existsByUsername(request.username)) {
            throw new WebApplicationException("Username already exists", Response.Status.CONFLICT);
        }

        if (userRepository.existsByEmail(request.email)) {
            throw new WebApplicationException("Email already exists", Response.Status.CONFLICT);
        }

        User user = mapper.toUser(request);
        user.password = BcryptUtil.bcryptHash(request.password);
        user.role = "user";

        userRepository.persist(user);

        String token = generateToken(user);
        return new AuthResponseDTO(token, user.id, user.username);
    }

    public AuthResponseDTO login(AuthRequestDTO request) {
        User user = userRepository.findByUsername(request.username)
                .orElseThrow(() -> new WebApplicationException("Invalid credentials", Response.Status.UNAUTHORIZED));

        if (!BcryptUtil.matches(request.password, user.password)) {
            throw new WebApplicationException("Invalid credentials", Response.Status.UNAUTHORIZED);
        }

        String token = generateToken(user);
        return new AuthResponseDTO(token, user.id, user.username);
    }

    private String generateToken(User user) {
        return Jwt.issuer("birthday-tracker")
                .upn(user.username)
                .subject(user.id.toString())
                .groups(new HashSet<>(java.util.Arrays.asList(user.role.split(","))))
                .expiresIn(Duration.ofHours(24))
                .sign();
    }
}