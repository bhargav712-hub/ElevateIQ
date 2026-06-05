package com.elevateiq.backend.repository;

import com.elevateiq.backend.models.UpcomingClass;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UpcomingClassRepository extends MongoRepository<UpcomingClass, String> {
    List<UpcomingClass> findByStudentId(String studentId);
}
