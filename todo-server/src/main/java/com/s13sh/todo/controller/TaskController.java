package com.s13sh.todo.controller;

import com.s13sh.todo.dto.TaskRequest;
import com.s13sh.todo.dto.UserRequest;
import com.s13sh.todo.repository.TaskRepository;
import com.s13sh.todo.service.TaskService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    TaskService taskService;

    @PostMapping("/")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody TaskRequest taskRequest,@RequestHeader("X-Session-ID") String sessionId) {
        System.err.println(taskRequest.toString());
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(taskService.createTask(taskRequest, sessionId));
    }

    @GetMapping("/")
    public ResponseEntity< Object> getAllTask(@RequestHeader("X-Session-ID") String sessionId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(taskService.getALlTask( sessionId));
    }

    @GetMapping("/{id}")
    public ResponseEntity< Object> getAllTask(@PathVariable Long id,@RequestHeader("X-Session-ID") String sessionId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(taskService.getTaskByid(id, sessionId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateTask(@PathVariable Long id,@RequestBody TaskRequest taskRequest,@RequestHeader("X-Session-ID") String sessionId) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(taskService.updateTask(taskRequest, sessionId,id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTask(@PathVariable Long id,@RequestHeader("X-Session-ID") String sessionId) {
        System.out.println(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(taskService.deleteTask(sessionId , id));
    }

}
