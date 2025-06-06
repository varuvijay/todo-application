package com.s13sh.todo.service;

import com.s13sh.todo.dto.TaskRequest;

import java.util.Map;

public interface TaskService {
    Map<String, Object> createTask(TaskRequest taskRequest, String sessionId);

    Object getALlTask(String sessionId);

    Object getTaskByid(Long id, String sessionId);

    Object updateTask(TaskRequest taskRequest, String sessionId, Long id);

    Object deleteTask(String sessionId, Long id);
}
