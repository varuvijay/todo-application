package com.s13sh.todo.repository;

import com.s13sh.todo.entity.Session;
import com.s13sh.todo.entity.User;

import jakarta.servlet.http.HttpSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, User> {


    Optional<Session> findBySessionId(String sessionId);

    boolean existsBySessionId(HttpSession session);
}
