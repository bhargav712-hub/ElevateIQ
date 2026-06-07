# ElevateIQ Backend Architecture & Implementation Summary

This document provides a comprehensive overview of the backend built for the ElevateIQ Learning Management System (LMS).

## 🏗️ Core Technologies & Architecture
- **Framework**: Java Spring Boot.
- **Database**: MongoDB (Atlas) accessed via Spring Data MongoDB.
- **Security**: Spring Security integrated with custom JWT (JSON Web Tokens) for stateless authentication.
- **Design Pattern**: **Service Layer Architecture**.
  - **Controllers** act strictly as routing layers handling HTTP request/response mappings.
  - **Services** house 100% of the business logic, database transactions, and data manipulation.

---

## 🗄️ Database Models & Entities
We have established a robust set of MongoDB collections to drive the platform:

### 1. `User`
- **Purpose**: Core identity and authentication model.
- **Fields**: `email`, `password` (BCrypt encoded), `name`, `role` (`student`, `trainer`, `employee`, `admin`).
- **Associations**: Contains an `enrolledCourses` array (List of String IDs) dynamically tracking what courses a student has joined.

### 2. `Course`
- **Purpose**: Represents the public course catalog.
- **Fields**: `title`, `category`, `price`, `duration`, `rating`, `imagePath`, `features`, `description`.
- **Nested Documents**: Includes a `CourseModule` inner class (Syllabus) containing `module` (number), `title`, `duration`, and `videoUrl`.

### 3. `StudentCourseProgress`
- **Purpose**: A dedicated tracker provisioned instantly when a student enrolls in a course.
- **Fields**: `studentId`, `courseId`, `courseName`, `progress` (calculated percentage), `attended`, `total` (modules).
- **Tracking**: Includes a `completedModules` array (List of Strings) tracking exactly which modules the student has explicitly checked off.

### 4. `StudentActivity`
- **Purpose**: An audit log for real-time feed updates.
- **Fields**: `studentId`, `action` (e.g., "Enrolled in Course"), `time`, `type` (success, info).

### 5. `UpcomingClass`
- **Purpose**: Manages live class schedules for students.
- **Fields**: `studentId`, `topic`, `date`, `time`, `instructor`, `link`.

---

## 🚀 API Endpoints & Controllers

### 1. Authentication (`AuthController`)
- **`POST /api/auth/register`**: Registers a new user, hashes the password, and saves them to the DB.
- **`POST /api/auth/login`**: Authenticates credentials and returns a JWT token for the frontend to store in LocalStorage.

### 2. Public Catalog (`CourseController` / Public API)
- **`GET /api/public/courses`**: Fetches the full array of `Course` documents to populate the public-facing catalog and homepage.
- **`GET /api/public/courses/{id}`**: Fetches a single, detailed course document (including syllabus and pricing) for the public course details page.

### 3. Student Dashboard & Engine (`StudentController`)
*(Note: All endpoints here require a valid JWT token in the Authorization header)*
- **`GET /api/student/dashboard`**: Aggregates data from `progress`, `activities`, and `upcomingClasses` to populate the student's main overview.
- **`GET /api/student/upcoming-classes`**: Returns scheduled live classes.
- **`GET /api/student/activities`**: Returns the student's activity feed.
- **`POST /api/student/enroll/{courseId}`**: The enrollment engine. Validates the course, adds it to the user's profile, provisions a 0% `StudentCourseProgress` tracker, and fires a "Success" activity log.

### 4. My Courses & Video Player Engine (`StudentController`)
- **`GET /api/student/courses`**: Joins the student's `StudentCourseProgress` trackers with the actual `Course` documents to render the "My Courses" grid with accurate progress bars.
- **`GET /api/student/courses/{courseId}`**: Returns the specific course details (videos, syllabus) alongside the student's specific module completion data for the Video Player interface.
- **`POST /api/student/courses/{courseId}/modules/complete`**: Receives a `moduleTitle` payload. Adds that module to the `completedModules` array, recalculates the overall percentage completion, and updates the database.

---

## 🔒 Security Implementations
- **Stateless JWT**: Tokens are generated on login (`JwtUtils.java`) and validated on every secured request via a custom `AuthTokenFilter`.
- **CORS Configuration**: Endpoints are annotated with `@CrossOrigin(origins = "*", maxAge = 3600)` to seamlessly allow Vite/React frontend requests.
- **Role-Based Access**: Infrastructure is prepared to enforce role-based API protection (e.g., `hasRole('STUDENT')`).

---

## 💡 Summary of Backend Flow
When a user registers, they are routed through the `AuthController`. When they browse courses, they hit the public endpoints. The moment they click **Enroll**, the `StudentService` orchestrates a multi-step transaction: modifying the `User` document, creating a `StudentCourseProgress` document, and logging a `StudentActivity`. As they watch videos and check off modules, the backend mathematically updates their progress document in real-time, serving as the single source of truth for the React frontend.
