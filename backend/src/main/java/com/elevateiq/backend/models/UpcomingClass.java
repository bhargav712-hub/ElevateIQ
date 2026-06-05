package com.elevateiq.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "upcoming_classes")
public class UpcomingClass {
    @Id
    private String id;
    private String title;
    private String time;
    private String trainer; // Frontend uses 'trainer', we mapped it to trainerName in plan, but let's stick to frontend property `trainer`
    private String status;
    private String studentId; // to associate with a specific student, or we could just link to the course

    public UpcomingClass() {
    }

    public UpcomingClass(String title, String time, String trainer, String status, String studentId) {
        this.title = title;
        this.time = time;
        this.trainer = trainer;
        this.status = status;
        this.studentId = studentId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getTrainer() { return trainer; }
    public void setTrainer(String trainer) { this.trainer = trainer; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
}
