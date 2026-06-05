package com.elevateiq.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student_activities")
public class StudentActivity {
    @Id
    private String id;
    private String studentId;
    private String action;
    private String time;
    private String type; // e.g. "success", "info"

    public StudentActivity() {}

    public StudentActivity(String studentId, String action, String time, String type) {
        this.studentId = studentId;
        this.action = action;
        this.time = time;
        this.type = type;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
