package com.s13sh.todo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Data
@Entity
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String sessionId;


    private java.lang.Long userId;

    @CreationTimestamp
    private LocalDateTime created_at;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionStatus status;

    // Default constructor
    public Session() {

    }



    public Session(String id, java.lang.Long id1, SessionStatus sessionStatus) {
        this.sessionId = id;
        this.userId = id1;
        this.status = sessionStatus;
    }
}
