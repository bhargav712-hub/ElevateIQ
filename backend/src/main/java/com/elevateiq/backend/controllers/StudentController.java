package com.elevateiq.backend.controllers;

import com.elevateiq.backend.services.StudentService;
import com.elevateiq.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    private String getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            return ((UserDetailsImpl) authentication.getPrincipal()).getId();
        }
        return null;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats() {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");

        return ResponseEntity.ok(studentService.getDashboardStats(studentId));
    }

    @GetMapping("/upcoming-classes")
    public ResponseEntity<?> getUpcomingClasses() {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(studentService.getUpcomingClasses(studentId));
    }

    @GetMapping("/activities")
    public ResponseEntity<?> getActivities() {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(studentService.getActivities(studentId));
    }

    @GetMapping("/progress")
    public ResponseEntity<?> getProgress() {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(studentService.getProgress(studentId));
    }

    @GetMapping("/courses")
    public ResponseEntity<?> getEnrolledCourses() {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(studentService.getEnrolledCourses(studentId));
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<?> getEnrolledCourseDetails(@PathVariable String courseId) {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");
        try {
            return ResponseEntity.ok(studentService.getEnrolledCourseDetails(studentId, courseId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/courses/{courseId}/modules/complete")
    public ResponseEntity<?> markModuleCompleted(@PathVariable String courseId, @RequestBody java.util.Map<String, String> payload) {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");
        String moduleTitle = payload.get("moduleTitle");
        if (moduleTitle == null) return ResponseEntity.badRequest().body("moduleTitle is required");
        try {
            studentService.markModuleCompleted(studentId, courseId, moduleTitle);
            return ResponseEntity.ok(new java.util.HashMap<String, String>() {{ put("message", "Module marked as completed"); }});
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<?> enrollCourse(@PathVariable String courseId) {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");
        
        try {
            studentService.enrollCourse(studentId, courseId);
            return ResponseEntity.ok("Enrolled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
