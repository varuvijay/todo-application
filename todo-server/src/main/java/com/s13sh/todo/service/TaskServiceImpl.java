package com.s13sh.todo.service;

import com.s13sh.todo.dto.TaskRequest;
import com.s13sh.todo.entity.Session;
import com.s13sh.todo.entity.SessionStatus;
import com.s13sh.todo.entity.Task;
import com.s13sh.todo.exception.InvalidException;
import com.s13sh.todo.repository.SessionRepository;
import com.s13sh.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private TaskRepository taskRepository;


    @Override
    public Map<String, Object> createTask(TaskRequest taskRequest, String sessionId) {
        Session session = checkSession(sessionId);
        Task newTask = taskRepository.save(new Task(taskRequest, session.getUserId()));

        return Map.of(
                "status", "true",
                "message", "Task has been created",
                "data", newTask
        );
    }

    @Override
    public Object getALlTask(String sessionId) {
        Session session = checkSession(sessionId);

        List<Task> newTask = (List<Task>) taskRepository.findAllByUserId(session.getUserId());
        if (newTask.isEmpty())
            return Map.of("message", "No task found");  

        return newTask;
    }

    @Override
    public Object getTaskByid(Long id, String sessionId) {
        Session session = checkSession(sessionId);

        return taskRepository.findByIdAndUserId(id, session.getUserId())
                .orElseThrow(() -> new InvalidException("Task not found for this user"));
    }

    @Override
    public Object updateTask(TaskRequest taskRequest, String sessionId, Long id) {
        Session session = checkSession(sessionId);

        Task task = (Task) taskRepository.findByIdAndUserId(id, session.getUserId())
                .orElseThrow(() -> new InvalidException("Task not found for this user"));

        task.setName(taskRequest.getName());
        task.setStatus(taskRequest.getStatus());
        task.setDescription(taskRequest.getDescription());

        return taskRepository.save(task);
    }

    @Override
    public Object deleteTask(String sessionId, Long id) {
        Session session = checkSession(sessionId);

        Task task = (Task) taskRepository.findByIdAndUserId(id, session.getUserId())
                .orElseThrow(() -> new InvalidException("Task not found for this user"));
        taskRepository.delete(task);

        return Map.of("message", "the task has been deleted");
    }


    public Session checkSession(String sessionId) {
        Session session = sessionRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new InvalidException("Invalid session Id"));

        if (!session.getStatus().equals(SessionStatus.active))
            throw new InvalidException("Session is not active");

        return session;
    }


}


//
//
//
//
//
//
//    Great question! This is using **Java Streams** to **convert a list of `Task` objects into a list of `TaskResponse` objects**. Let’s break it down step by step! 🚀
//
//            ---
//
//            ### **🔍 The Full Line**
//            ```java
//tasks.stream()
//        .map(TaskResponse::new)
//    .collect(Collectors.toList());
//```
//
//        ### **🛠 Step-by-Step Breakdown**
//            | **Part** | **What It Does** |
//            |---------|-----------------|
//            | `tasks.stream()` | Converts the `List<Task>` into a **stream** (a pipeline of operations). |
//            | `.map(TaskResponse::new)` | **Transforms** each `Task` into a `TaskResponse`. |
//            | `.collect(Collectors.toList())` | Converts the **stream** back into a `List<TaskResponse>`. |
//
//            ---
//
//            ## **📌 Understanding Each Part in Detail**
//
//            ### **1️⃣ `tasks.stream()` - What is a Stream?**
//            - A **Stream** in Java is like a pipeline where you can process a collection **step by step**.
//            - Instead of using `for` loops, streams allow you to **transform, filter, and collect** data in a clean way.
//
//### **2️⃣ `.map(TaskResponse::new)` - What is `map()` Doing?**
//            - `map()` is **transforming** each `Task` object into a `TaskResponse` object.
//- `TaskResponse::new` is **a constructor reference**, which is the same as:
//            ```java
//            .map(task -> new TaskResponse(task))
//            ```
//    Meaning, for each `task` in the list, it's calling:
//            ```java
//  new TaskResponse(task);
//  ```
//    This assumes your `TaskResponse` class has a **constructor** like:
//            ```java
//    public class TaskResponse {
//        private Long id;
//        private String name;
//        private String description;
//        private LocalDateTime createdAt;
//
//        public TaskResponse(Task task) {
//            this.id = task.getId();
//            this.name = task.getName();
//            this.description = task.getDescription();
//            this.createdAt = task.getCreatedAt();
//        }
//    }
//  ```
//
//          ### **3️⃣ `.collect(Collectors.toList())` - What is `collect()` Doing?**
//            - Since `.map()` creates a **stream**, we need to turn it **back into a List**.
//            - `Collectors.toList()` gathers all `TaskResponse` objects into a **List<TaskResponse>`.
//            - Without `collect()`, the result would stay inside the stream.
//
//---
//
//        ## **💡 Full Example**
//    Imagine you have a **list of tasks** and want to transform them into `TaskResponse`:
//
//            ```java
//    List<Task> tasks = List.of(
//            new Task(1L, "Task 1", "Description 1", LocalDateTime.now()),
//            new Task(2L, "Task 2", "Description 2", LocalDateTime.now())
//    );
//
//    List<TaskResponse> taskResponses = tasks.stream()
//            .map(TaskResponse::new)
//            .collect(Collectors.toList());
//
//System.out.println(taskResponses);  // List<TaskResponse>
//```
//
//        ---
//
//        ## **✨ TL;DR - What This Code Does**
//            ```java
//tasks.stream()
//        .map(TaskResponse::new)
//    .collect(Collectors.toList());
//```
//        ✔ **Converts** `List<Task>` → `List<TaskResponse>`
//            ✔ Uses **Streams** for a clean transformation
//✔ **Avoids for-loops**, making code shorter and more readable
//
//---
//
//        ## **🤔 Alternative (Without Streams)**
//    If you **don’t** use streams, you would do:
//            ```java
//    List<TaskResponse> taskResponses = new ArrayList<>();
//for (Task task : tasks) {
//        taskResponses.add(new TaskResponse(task));
//    }
//return taskResponses;
//```
//        💡 **Both work, but streams are cleaner!** 🚀
//
//            ---
//
//            ## **🔎 Want More Practice?**
//    Want some **small stream exercises** to try? Just ask! 😊