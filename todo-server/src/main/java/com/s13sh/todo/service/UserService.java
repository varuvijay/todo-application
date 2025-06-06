package com.s13sh.todo.service;

import com.s13sh.todo.dto.UserRequest;
import jakarta.servlet.http.HttpSession;

import java.util.Map;

public interface UserService {

	Map<String, String> registerUser(UserRequest request);

	Map<String, Object> loginUser(UserRequest request, HttpSession session);

	Map<String, String> logoutUser(HttpSession session, String sessionId);
}
