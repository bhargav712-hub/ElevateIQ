package com.elevateiq.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private String name;
    private String role; // "student", "trainer", "employee", "admin"
    private String avatar;

    // For Student
    private List<Integer> enrolledCourses;
    
    // For Trainer
    private List<Integer> assignedCourses;
    
    // For Employee
    private String department;

    public User(String email, String password, String name, String role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }
}
