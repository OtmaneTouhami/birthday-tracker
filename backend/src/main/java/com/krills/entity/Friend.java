package com.krills.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "friends")
public class Friend extends PanacheEntityBase {
    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    public UUID id;

    @NotBlank
    @Column(name = "first_name")
    public String firstName;

    @NotBlank
    @Column(name = "last_name")
    public String lastName;

    @NotNull
    @Past
    @Column(name = "birth_date")
    public LocalDate birthDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    public User user;
}
