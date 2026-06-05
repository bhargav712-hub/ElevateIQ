package com.elevateiq.backend.repository;

import com.elevateiq.backend.models.StudentActivity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentActivityRepository extends MongoRepository<StudentActivity, String> {
    List<StudentActivity> findByStudentId(String studentId);
}
