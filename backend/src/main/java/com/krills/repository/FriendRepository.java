package com.krills.repository;

import com.krills.entity.Friend;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class FriendRepository implements PanacheRepositoryBase<Friend, UUID> {

    public List<Friend> findByUserId(UUID userId) {
        return list("user.id", userId);
    }
}
