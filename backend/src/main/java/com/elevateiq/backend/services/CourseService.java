package com.elevateiq.backend.services;

import com.elevateiq.backend.models.Course;
import com.elevateiq.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(String id) {
        return courseRepository.findById(id);
    }

    public List<Map<String, String>> getFaq() {
        return List.of(
            Map.of("q", "Do I need prior coding experience?", "a", "No, our programs are designed for beginners. We start from the absolute basics."),
            Map.of("q", "Is there placement assistance?", "a", "Yes, we provide 100% placement assistance, resume building, and mock interviews."),
            Map.of("q", "What is the duration of the courses?", "a", "Typically our courses range from 3 to 6 months depending on the program."),
            Map.of("q", "Are the classes live or recorded?", "a", "We provide a mix of interactive live classes and recorded sessions for revision.")
        );
    }
}
