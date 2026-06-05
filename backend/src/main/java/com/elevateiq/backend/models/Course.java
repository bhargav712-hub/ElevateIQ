package com.elevateiq.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "courses")
public class Course {
    @Id
    private String id;
    
    // Explicit numeric ID to match the frontend mock data easier, or we can just use the mongo string ID. 
    // The frontend uses numbers (e.g. `1`, `2`) for IDs in mock data. 
    // Let's keep a separate `courseId` field for numerical compatibility, or just use `id` as String and the frontend will adapt.
    // Actually, it's safer to use String id and let Mongo generate it, and we will update the seeder to use string IDs.
    
    private String title;
    private String category;
    private Double price;
    private Double originalPrice;
    private String duration;
    private Double rating;
    private Integer students; // The frontend calls it `students`, but we called it `studentsCount` in the plan. I will stick to `students` to match frontend exact structure.
    private String imagePath;
    private List<String> features;
    private String description;
    private List<CourseModule> syllabus;

    public Course() {
    }

    public Course(String title, String category, Double price, Double originalPrice, String duration, Double rating, Integer students, String imagePath, List<String> features, String description, List<CourseModule> syllabus) {
        this.title = title;
        this.category = category;
        this.price = price;
        this.originalPrice = originalPrice;
        this.duration = duration;
        this.rating = rating;
        this.students = students;
        this.imagePath = imagePath;
        this.features = features;
        this.description = description;
        this.syllabus = syllabus;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getStudents() {
        return students;
    }

    public void setStudents(Integer students) {
        this.students = students;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<CourseModule> getSyllabus() {
        return syllabus;
    }

    public void setSyllabus(List<CourseModule> syllabus) {
        this.syllabus = syllabus;
    }

    public static class CourseModule {
        private Integer module;
        private String title;
        private String duration;

        public CourseModule() {}

        public CourseModule(Integer module, String title, String duration) {
            this.module = module;
            this.title = title;
            this.duration = duration;
        }

        public Integer getModule() { return module; }
        public void setModule(Integer module) { this.module = module; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }
    }
}
