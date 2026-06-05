package com.elevateiq.backend.controllers;

import com.elevateiq.backend.models.StudentActivity;
import com.elevateiq.backend.models.StudentCourseProgress;
import com.elevateiq.backend.models.UpcomingClass;
import com.elevateiq.backend.repository.StudentActivityRepository;
import com.elevateiq.backend.repository.StudentCourseProgressRepository;
import com.elevateiq.backend.repository.UpcomingClassRepository;
import com.elevateiq.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    StudentCourseProgressRepository progressRepository;

    @Autowired
    UpcomingClassRepository upcomingClassRepository;

    @Autowired
    StudentActivityRepository activityRepository;

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

        List<StudentCourseProgress> progressList = progressRepository.findByStudentId(studentId);
        List<UpcomingClass> upcomingClasses = upcomingClassRepository.findByStudentId(studentId);
        List<StudentActivity> recentActivities = activityRepository.findByStudentId(studentId);

        // Calculate stats
        int enrolledCount = progressList.size();
        
        double totalProgress = 0;
        int totalAttended = 0;
        int totalClasses = 0;
        
        for(StudentCourseProgress p : progressList) {
            totalProgress += p.getProgress();
            totalAttended += p.getAttended();
            totalClasses += p.getTotal();
        }

        String overallProgress = enrolledCount > 0 ? Math.round(totalProgress / enrolledCount) + "%" : "0%";
        String attendanceRate = totalClasses > 0 ? Math.round((totalAttended * 100.0) / totalClasses) + "%" : "0%";
        
        Map<String, Object> response = new HashMap<>();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("enrolledCount", enrolledCount);
        stats.put("overallProgress", overallProgress);
        stats.put("upcomingTestsCount", 0); // Placeholder
        stats.put("attendanceRate", attendanceRate);
        
        response.put("stats", stats);
        response.put("upcomingClasses", upcomingClasses);
        response.put("recentActivities", recentActivities);
        response.put("courseProgress", progressList);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/upcoming-classes")
    public ResponseEntity<?> getUpcomingClasses() {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(upcomingClassRepository.findByStudentId(studentId));
    }

    @GetMapping("/activities")
    public ResponseEntity<?> getActivities() {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(activityRepository.findByStudentId(studentId));
    }

    @GetMapping("/progress")
    public ResponseEntity<?> getProgress() {
        String studentId = getLoggedInUserId();
        if (studentId == null) return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(progressRepository.findByStudentId(studentId));
    }
}
