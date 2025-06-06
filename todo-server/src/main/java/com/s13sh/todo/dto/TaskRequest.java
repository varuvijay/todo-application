package com.s13sh.todo.dto;

import com.s13sh.todo.entity.TaskStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskRequest {

    private String name;

    private String description;

    private TaskStatus status;



}
