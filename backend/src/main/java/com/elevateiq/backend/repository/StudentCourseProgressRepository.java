package com.elevateiq.backend.repository;

import com.elevateiq.backend.models.StudentCourseProgress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentCourseProgressRepository extends MongoRepository<StudentCourseProgress, String> {
    List<StudentCourseProgress> findByStudentId(String studentId);
    Optional<StudentCourseProgress> findByStudentIdAndCourseId(String studentId, String courseId);
}
