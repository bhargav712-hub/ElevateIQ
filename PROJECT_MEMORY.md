# ElevateIQ Project Memory 🧠

This document serves as the master record of everything we have built in the ElevateIQ Learning Management System (LMS) up to this point. It outlines our tech stack, architectural decisions, database models, and completed features.

## 🛠️ Tech Stack & Architecture
- **Frontend**: React (Vite), Framer Motion for animations.
- **Backend**: Java Spring Boot.
- **Database**: MongoDB (Atlas).
- **Security**: Spring Security with JWT (JSON Web Tokens).
- **Backend Architecture**: We have strictly adhered to a highly scalable **Service Layer Architecture**. 
  - **Controllers** are kept extremely thin, strictly handling HTTP requests and routing.
  - **Services** (`AuthService`, `StudentService`, `CourseService`) handle 100% of the heavy lifting, business logic, and database interactions.

---

## 🗄️ Database Models (MongoDB)
We have built robust data entities to support the ecosystem:

1. **`User` Collection**:
   - Stores core details (`email`, `password`, `name`, `role`).
   - Supports multiple roles (`student`, `trainer`, `employee`, `admin`).
   - For students, it dynamically tracks a List of Strings representing their `enrolledCourses` (MongoDB Object IDs).
2. **`Course` Collection**:
   - Stores public course catalog data (`title`, `category`, `price`, `syllabus`, `features`).
3. **`StudentCourseProgress` Collection**:
   - A dedicated tracker provisioned for a student the moment they enroll. Tracks `progress (%)`, `attended` classes, and `total` modules.
4. **`StudentActivity` Collection**:
   - A real-time audit log of student actions (e.g., "Enrolled in Course X").
5. **`UpcomingClass` Collection**:
   - Manages live class schedules for students.

---

## ✅ Completed Features (Full-Stack)

### 1. Authentication & Security
- **JWT Login/Registration**: Users can securely register and log in. The backend issues a JWT token which the React frontend stores in LocalStorage to authenticate future API calls.
- **Registration Routing Fix**: Re-routed the registration flow so that newly registered users are sent to the `/login` page to explicitly authenticate, rather than being auto-logged into the dashboard.

### 2. Public Catalog Integration
- **Dynamic Course Fetching**: The Public Home Page (`Home.jsx`) and Courses Catalog (`Courses.jsx`) now dynamically fetch real `Course` data directly from the MongoDB backend via `GET /api/public/courses` instead of relying on hardcoded arrays.
- **Dynamic Course Detail Pages**: Clicking on a course queries `GET /api/public/courses/{id}` to pull in specific modules, pricing, and instructor data.

### 3. The Core Student Dashboard
- **Live Data Binding**: The `Dashboard.jsx` page is fully wired up to `GET /api/student/dashboard`. It securely passes the JWT token and fetches the student's personalized stats, progress bars, upcoming classes, and recent activities.
- **Enterprise Empty States**: Implemented an "Empty State Strategy." If a brand new user registers, the database does not seed fake data. Instead, the dashboard cleanly displays "No enrolled courses" and "No recent activity" until they genuinely earn it.

### 4. The Course Enrollment Engine
- **The API**: Built `POST /api/student/enroll/{courseId}` in the `StudentService`.
  - Validates that the course exists and the student isn't already enrolled.
  - Appends the course ID to the User's profile.
  - Automatically provisions an empty 0% `StudentCourseProgress` tracker.
  - Automatically pushes a "Successfully enrolled!" notification into their `StudentActivity` feed.
- **Frontend Wiring**: Hooked up the "Enroll Now" buttons across `Home.jsx`, `Courses.jsx`, and `CourseDetail.jsx`.
  - If a guest clicks Enroll, they are redirected to `/login`.
  - If an authenticated student clicks Enroll, the backend processes the enrollment and instantly teleports them to their dashboard to see their new course.

### 5. My Courses & Video Player
- **Dynamic Enrolled Courses**: `Courses.jsx` dynamically fetches the student's enrolled courses, complete with accurate progress bars reflecting their true completion status.
- **Video Player & Check-offs**: `CourseDetails.jsx` embeds a video player and allows students to explicitly "Mark Complete" for each module.
- **Backend Progress Engine**: The backend now recalculates the exact completion percentage dynamically based on the number of modules a student explicitly checks off, saving it to `StudentCourseProgress`.

---

## 🚧 What's Next?
While the public catalog, authentication, dashboard overview, enrollment engine, and "My Courses" are perfectly built, the following Student Dashboard tabs still need their robust backend counterparts built out:
- **Assignments** (File uploads & grading)
- **Tests & Exams** (Auto-grading MCQ engine)
- **Payments** (Invoice generation & Stripe integration)
- **Class Recordings**
- **Certificates** (Auto-generating PDFs upon 100% completion)
- **Trainer Chat** (WebSockets)
