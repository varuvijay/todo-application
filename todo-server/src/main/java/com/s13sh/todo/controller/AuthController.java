package com.s13sh.todo.controller;

import com.s13sh.todo.dto.UserRequest;
import com.s13sh.todo.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173/", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> registerUser(@RequestBody @Valid UserRequest request) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(userService.registerUser(request));
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> loginUser(@RequestBody UserRequest request, HttpSession session) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(userService.loginUser(request, session));
	}

	@PostMapping("/logout")
	public ResponseEntity<Map<String, String>> logoutUser(
			HttpSession session,
			@RequestHeader("X-Session-ID") String sessionId) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(userService.logoutUser(session, sessionId));
	}
}
