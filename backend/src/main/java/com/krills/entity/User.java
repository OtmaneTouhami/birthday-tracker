package com.krills.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.UserDefinition;
import io.quarkus.security.jpa.Username;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@UserDefinition
public class User extends PanacheEntityBase {
    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    public UUID id;

    @Username
    @NotBlank
    @Column(unique = true)
    public String username;

    @Email
    @NotBlank
    @Column(unique = true)
    public String email;

    @Password
    @NotBlank
    public String password;

    @NotBlank
    @Column(name = "first_name")
    public String firstName;

    @NotBlank
    @Column(name = "last_name")
    public String lastName;

    @Column(name = "birth_date")
    public LocalDate birthDate;

    @Roles
    @Column(name = "role")
    public String role = "user";

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<Friend> friends = new ArrayList<>();
}
