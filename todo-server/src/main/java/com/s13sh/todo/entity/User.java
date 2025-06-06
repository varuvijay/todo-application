package com.s13sh.todo.entity;

import com.s13sh.todo.dto.UserRequest;
import com.s13sh.todo.helper.AES;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private java.lang.Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @CreationTimestamp
    private LocalDateTime createdTime;

    // Default constructor
    public User() {
    }

    // Constructor for UserRequest
    public User(UserRequest request) {
        this.username = request.getUsername();
        this.password = AES.encrypt(request.getPassword());
        this.email = request.getEmail();
    }
}
