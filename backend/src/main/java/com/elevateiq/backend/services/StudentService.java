package com.elevateiq.backend.services;

import com.elevateiq.backend.models.StudentActivity;
import com.elevateiq.backend.models.StudentCourseProgress;
import com.elevateiq.backend.models.UpcomingClass;
import com.elevateiq.backend.repository.StudentActivityRepository;
import com.elevateiq.backend.repository.StudentCourseProgressRepository;
import com.elevateiq.backend.repository.UpcomingClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudentService {

    @Autowired
    StudentCourseProgressRepository progressRepository;

    @Autowired
    UpcomingClassRepository upcomingClassRepository;

    @Autowired
    StudentActivityRepository activityRepository;

    public Map<String, Object> getDashboardStats(String studentId) {
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

        return response;
    }

    public List<UpcomingClass> getUpcomingClasses(String studentId) {
        return upcomingClassRepository.findByStudentId(studentId);
    }

    public List<StudentActivity> getActivities(String studentId) {
        return activityRepository.findByStudentId(studentId);
    }

    public List<StudentCourseProgress> getProgress(String studentId) {
        return progressRepository.findByStudentId(studentId);
    }
}
