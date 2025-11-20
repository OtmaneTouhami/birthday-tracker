package com.krills.resource;

import com.krills.dto.ChangePasswordRequestDTO;
import com.krills.dto.ProfileRequestDTO;
import com.krills.dto.ProfileResponseDTO;
import com.krills.service.ProfileService;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.Map;
import java.util.UUID;

@Path("/api/me")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class ProfileResource {

    @Inject
    ProfileService profileService;

    @Inject
    JsonWebToken jwt;

    @GET
    public ProfileResponseDTO getProfile() {
        UUID userId = UUID.fromString(jwt.getSubject());
        return profileService.getProfile(userId);
    }

    @PUT
    public ProfileResponseDTO updateProfile(@Valid ProfileRequestDTO dto) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return profileService.updateProfile(userId, dto);
    }

    @PATCH
    @Path("/password")
    public Response changePassword(@Valid ChangePasswordRequestDTO dto) {
        UUID userId = UUID.fromString(jwt.getSubject());
        profileService.changePassword(userId, dto);
        return Response.ok().entity(Map.of("message", "Password changed successfully")).build();
    }

    @DELETE
    public Response deleteProfile() {
        UUID userId = UUID.fromString(jwt.getSubject());
        profileService.deleteProfile(userId);
        return Response.noContent().build();
    }
}