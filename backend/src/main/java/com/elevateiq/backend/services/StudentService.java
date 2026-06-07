package com.elevateiq.backend.services;

import com.elevateiq.backend.models.StudentActivity;
import com.elevateiq.backend.models.StudentCourseProgress;
import com.elevateiq.backend.models.UpcomingClass;
import com.elevateiq.backend.repository.StudentActivityRepository;
import com.elevateiq.backend.repository.StudentCourseProgressRepository;
import com.elevateiq.backend.repository.UpcomingClassRepository;
import com.elevateiq.backend.repository.UserRepository;
import com.elevateiq.backend.models.Course;
import com.elevateiq.backend.repository.CourseRepository;
import com.elevateiq.backend.models.User;
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

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    UserRepository userRepository;

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

    public List<Map<String, Object>> getEnrolledCourses(String studentId) {
        List<StudentCourseProgress> progressList = progressRepository.findByStudentId(studentId);
        List<Map<String, Object>> result = new java.util.ArrayList<>();
        for (StudentCourseProgress progress : progressList) {
            Map<String, Object> map = new HashMap<>();
            map.put("progress", progress);
            
            if (progress.getCourseId() != null) {
                courseRepository.findById(progress.getCourseId()).ifPresent(course -> {
                    map.put("course", course);
                });
            }
            result.add(map);
        }
        return result;
    }

    public Map<String, Object> getEnrolledCourseDetails(String studentId, String courseId) throws Exception {
        StudentCourseProgress progress = progressRepository.findByStudentIdAndCourseId(studentId, courseId)
                .orElseThrow(() -> new Exception("Enrollment not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new Exception("Course not found"));
                
        Map<String, Object> map = new HashMap<>();
        map.put("progress", progress);
        map.put("course", course);
        return map;
    }

    public void markModuleCompleted(String studentId, String courseId, String moduleTitle) throws Exception {
        StudentCourseProgress progress = progressRepository.findByStudentIdAndCourseId(studentId, courseId)
                .orElseThrow(() -> new Exception("Enrollment not found"));
                
        List<String> completedModules = progress.getCompletedModules();
        if (completedModules == null) {
            completedModules = new java.util.ArrayList<>();
        }
        
        if (!completedModules.contains(moduleTitle)) {
            completedModules.add(moduleTitle);
            progress.setCompletedModules(completedModules);
            
            // Recalculate progress
            int total = progress.getTotal() > 0 ? progress.getTotal() : 1;
            int progressPercent = (int) Math.round((completedModules.size() * 100.0) / total);
            progress.setProgress(Math.min(progressPercent, 100));
            progress.setAttended(completedModules.size());
            
            progressRepository.save(progress);
        }
    }

    public void enrollCourse(String studentId, String courseId) throws Exception {
        // 1. Validate User and Course
        User user = userRepository.findById(studentId)
                .orElseThrow(() -> new Exception("User not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new Exception("Course not found"));

        // 2. Prevent Duplicate Enrollment
        if (user.getEnrolledCourses() != null && user.getEnrolledCourses().contains(courseId)) {
            throw new Exception("Already enrolled in this course");
        }

        // 3. Add to User's enrolled courses list
        if (user.getEnrolledCourses() == null) {
            user.setEnrolledCourses(new java.util.ArrayList<>());
        }
        user.getEnrolledCourses().add(courseId);
        userRepository.save(user);

        // 4. Create empty Course Progress tracker
        int totalModules = course.getSyllabus() != null ? course.getSyllabus().size() : 10;
        StudentCourseProgress progress = new StudentCourseProgress(studentId, courseId, course.getTitle(), 0, 0, totalModules);
        progressRepository.save(progress);

        // 5. Create Enrollment Activity
        StudentActivity activity = new StudentActivity(studentId, "Enrolled in Course: " + course.getTitle(), "Just now", "success");
        activityRepository.save(activity);
    }
}
