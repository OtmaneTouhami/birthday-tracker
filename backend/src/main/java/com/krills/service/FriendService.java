package com.krills.service;

import com.krills.dto.FriendRequestDTO;
import com.krills.dto.FriendResponseDTO;
import com.krills.entity.Friend;
import com.krills.entity.User;
import com.krills.mapper.FriendMapper;
import com.krills.repository.FriendRepository;
import com.krills.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
public class FriendService {

    @Inject
    FriendRepository friendRepository;

    @Inject
    UserRepository userRepository;

    @Inject
    FriendMapper mapper;

    @Transactional
    public FriendResponseDTO createFriend(UUID userId, FriendRequestDTO dto) {
        User user = userRepository.findByIdOptional(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Friend friend = mapper.toEntity(dto);
        friend.user = user;

        friendRepository.persist(friend);

        return mapper.toDTO(friend);
    }

    public List<FriendResponseDTO> getUpcomingBirthdays(UUID userId) {
        List<Friend> friends = friendRepository.findByUserId(userId);

        return friends.stream()
                .map(friend -> mapper.toDTO(friend))
                .sorted(Comparator.comparing(dto -> dto.daysUntilBirthday))
                .collect(Collectors.toList());
    }

    public List<FriendResponseDTO> getAllFriends(UUID userId) {
        return friendRepository.findByUserId(userId).stream()
                .map(friend -> mapper.toDTO(friend))
                .collect(Collectors.toList());
    }

    @Transactional
    public FriendResponseDTO updateFriend(UUID userId, UUID friendId, FriendRequestDTO dto) {
        Friend friend = friendRepository.findByIdOptional(friendId)
                .orElseThrow(() -> new NotFoundException("Friend not found"));

        if (!friend.user.id.equals(userId)) {
            throw new WebApplicationException("Unauthorized", Response.Status.FORBIDDEN);
        }

        friend.firstName = dto.firstName;
        friend.lastName = dto.lastName;
        friend.birthDate = dto.birthDate;

        return mapper.toDTO(friend);
    }

    @Transactional
    public void deleteFriend(UUID userId, UUID friendId) {
        Friend friend = friendRepository.findByIdOptional(friendId)
                .orElseThrow(() -> new NotFoundException("Friend not found"));

        if (!friend.user.id.equals(userId)) {
            throw new WebApplicationException("Unauthorized", Response.Status.FORBIDDEN);
        }

        friendRepository.delete(friend);
    }
}
