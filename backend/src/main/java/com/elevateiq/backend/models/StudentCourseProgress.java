package com.elevateiq.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.ArrayList;

@Document(collection = "student_course_progress")
public class StudentCourseProgress {
    @Id
    private String id;
    private String studentId;
    private String courseId;
    private String courseName; // In frontend `course.name`, simplified for now to string rather than joined doc
    private Integer progress; // Frontend uses `progress`
    private Integer attended; // For attendance
    private Integer total;    // For attendance
    private List<String> completedModules;

    public StudentCourseProgress() {}

    public StudentCourseProgress(String studentId, String courseId, String courseName, Integer progress, Integer attended, Integer total) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.courseName = courseName;
        this.progress = progress;
        this.attended = attended;
        this.total = total;
        this.completedModules = new ArrayList<>();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
    public Integer getAttended() { return attended; }
    public void setAttended(Integer attended) { this.attended = attended; }
    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }
    public List<String> getCompletedModules() { return completedModules; }
    public void setCompletedModules(List<String> completedModules) { this.completedModules = completedModules; }
}
