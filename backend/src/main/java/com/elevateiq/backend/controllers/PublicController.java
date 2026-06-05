package com.elevateiq.backend.controllers;

import com.elevateiq.backend.models.Course;
import com.elevateiq.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    CourseRepository courseRepository;

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable String id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return ResponseEntity.ok(course.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/faq")
    public ResponseEntity<?> getFaq() {
        // Hardcoded FAQs to serve the public pages dynamically from backend
        return ResponseEntity.ok(List.of(
            Map.of("q", "Do I need prior coding experience?", "a", "No, our programs are designed for beginners. We start from the absolute basics."),
            Map.of("q", "Is there placement assistance?", "a", "Yes, we provide 100% placement assistance, resume building, and mock interviews."),
            Map.of("q", "What is the duration of the courses?", "a", "Typically our courses range from 3 to 6 months depending on the program."),
            Map.of("q", "Are the classes live or recorded?", "a", "We provide a mix of interactive live classes and recorded sessions for revision.")
        ));
    }
}
