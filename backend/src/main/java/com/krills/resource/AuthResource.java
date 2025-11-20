package com.krills.resource;

import com.krills.dto.AuthRequestDTO;
import com.krills.dto.AuthResponseDTO;
import com.krills.dto.RegisterRequestDTO;
import com.krills.service.AuthService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    AuthService authService;

    @POST
    @Path("/register")
    public AuthResponseDTO register(@Valid RegisterRequestDTO request) {
        return authService.register(request);
    }

    @POST
    @Path("/login")
    public AuthResponseDTO login(@Valid AuthRequestDTO request) {
        return authService.login(request);
    }
}