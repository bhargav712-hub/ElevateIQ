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
}
