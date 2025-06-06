package com.s13sh.todo.repository;

import com.s13sh.todo.entity.Session;
import com.s13sh.todo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task,Long> {


    List<Task> findAllByUserId(Long userId);


    Optional<Object> findByIdAndUserId(Long id, Long userId);

    Optional<Object> deleteByIdAndUserId(Long id, Long userId);
}
