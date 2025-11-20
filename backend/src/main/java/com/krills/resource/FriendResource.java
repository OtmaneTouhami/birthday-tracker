package com.krills.resource;

import com.krills.dto.FriendRequestDTO;
import com.krills.dto.FriendResponseDTO;
import com.krills.service.FriendService;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.List;
import java.util.UUID;

@Path("/api/friends")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class FriendResource {

    @Inject
    FriendService friendService;

    @Inject
    JsonWebToken jwt;

    @GET
    public List<FriendResponseDTO> getAllFriends() {
        UUID userId = UUID.fromString(jwt.getSubject());
        return friendService.getAllFriends(userId);
    }

    @GET
    @Path("/upcoming")
    public List<FriendResponseDTO> getUpcomingBirthdays() {
        UUID userId = UUID.fromString(jwt.getSubject());
        return friendService.getUpcomingBirthdays(userId);
    }

    @POST
    public FriendResponseDTO createFriend(@Valid FriendRequestDTO dto) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return friendService.createFriend(userId, dto);
    }

    @PUT
    @Path("/{id}")
    public FriendResponseDTO updateFriend(@PathParam("id") UUID friendId, @Valid FriendRequestDTO dto) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return friendService.updateFriend(userId, friendId, dto);
    }

    @DELETE
    @Path("/{id}")
    public void deleteFriend(@PathParam("id") UUID friendId) {
        UUID userId = UUID.fromString(jwt.getSubject());
        friendService.deleteFriend(userId, friendId);
    }
}