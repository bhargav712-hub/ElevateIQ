# ElevateIQ

ElevateIQ is a comprehensive, full-stack Learning Management System (LMS) designed to provide a seamless educational experience for students, trainers, and administrators. It features distinct user portals, a robust backend built with Spring Boot, and a dynamic React frontend.

## ✨ Features

- **Multi-Role Architecture**: Separate, secure portals for Students, Trainers, Employees, and Admins, each with a tailored dashboard and functionalities.
- **JWT Authentication**: Secure user registration and login using JSON Web Tokens for stateless authentication.
- **Dynamic Course Catalog**: Public-facing pages for browsing and viewing detailed information about available courses, fetched directly from the database.
- **Student Dashboard**: A personalized hub for students to view their enrolled courses, track overall progress, view upcoming classes, and monitor recent activities.
- **Course Enrollment Engine**: A seamless one-click enrollment process that provisions course access, progress trackers, and activity log entries for students.
- **Interactive Learning**: An integrated video player that allows students to watch course modules and mark them as complete, with progress dynamically updated in the backend.
- **Responsive & Animated UI**: Built with Framer Motion and Three.js to provide a modern, engaging, and fluid user experience.

## 🛠️ Tech Stack

- **Backend**:
  - Java 17
  - Spring Boot 3
  - Spring Security (with JWT)
  - Maven
- **Frontend**:
  - React (Vite)
  - React Router
  - Framer Motion (for animations)
  - Three.js / @react-three/fiber (for 3D scenes)
- **Database**:
  - MongoDB

## 🚀 Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites

- Java JDK 17 or later
- Maven
- Node.js and npm
- A MongoDB instance (local or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/bhargav712-hub/ElevateIQ.git
    cd ElevateIQ
    ```

2.  **Configure the Backend**
    - Navigate to `backend/src/main/resources/application.properties`.
    - Update the `spring.data.mongodb.uri` with your MongoDB connection string.

    ```properties
    spring.data.mongodb.uri=YOUR_MONGODB_CONNECTION_STRING
    ```

3.  **Run the Backend**
    - Open a terminal in the `backend` directory.
    - Execute the following command using the Maven wrapper:

    ```bash
    # For macOS/Linux
    ./mvnw spring-boot:run

    # For Windows
    mvnw.cmd spring-boot:run
    ```

    - The backend server will start on `http://localhost:8080`.

4.  **Run the Frontend**
    - In a new terminal, navigate to the project's root directory.
    - Install the necessary npm packages:
    ```bash
    npm install
    ```

    - Start the Vite development server:
    ```bash
    npm run dev
    ```

    - The frontend will be available at `http://localhost:5173` (or another port if 5173 is occupied).

### All-in-One Command

You can also start both the frontend and backend servers concurrently with a single command from the root directory:

```bash
npm run start:all
```

## 🔑 User Portals & Routes

The application features four distinct user portals, each with its own set of routes and functionalities.

- **Student Portal**: `/student-dashboard`
  - View enrolled courses, track progress, take tests, submit assignments, and chat with trainers.
- **Trainer Portal**: `/trainer-dashboard`
  - Manage assigned courses, schedule classes, create tests, and view student progress.
- **Employee Portal**: `/employee-dashboard`
  - Manage attendance, leave requests, meetings, and internal support tickets.
- **Admin Portal**: `/admin-dashboard`
  - Complete oversight of the platform, managing all users (students, trainers, employees), courses, payments, and site content.
