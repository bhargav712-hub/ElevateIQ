import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicLayout from './components/common/PublicLayout';
import PortalLayout from './components/common/PortalLayout';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Courses from './pages/public/Courses';
import Placements from './pages/public/Placements';
import Career from './pages/public/Career';
import JobApplication from './pages/public/JobApplication';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import StudentDashboard from './pages/student/Dashboard';
import StudentCourses from './pages/student/Courses';
import StudentTests from './pages/student/Tests';
import StudentAssignments from './pages/student/Assignments';
import StudentRecordings from './pages/student/Recordings';
import StudentExamSlots from './pages/student/ExamSlots';
import StudentPayments from './pages/student/Payments';
import StudentCertificates from './pages/student/Certificates';

import TrainerDashboard from './pages/trainer/Dashboard';
import TrainerCourses from './pages/trainer/Courses';
import TrainerSchedule from './pages/trainer/Schedule';
import TrainerTests from './pages/trainer/Tests';
import TrainerAssignments from './pages/trainer/Assignments';
import TrainerRecordings from './pages/trainer/Recordings';
import TrainerStudents from './pages/trainer/Students';

import EmployeeDashboard from './pages/employee/Dashboard';
import EmployeeAttendance from './pages/employee/Attendance';
import EmployeeLeave from './pages/employee/Leave';
import EmployeeMeetings from './pages/employee/Meetings';
import EmployeeTickets from './pages/employee/Tickets';
import EmployeeAnnouncements from './pages/employee/Announcements';

import AdminDashboard from './pages/admin/Dashboard';
import AdminStudents, { AdminTrainers, AdminEmployees } from './pages/admin/Users';
import AdminCourses from './pages/admin/Courses';
import AdminPayments from './pages/admin/Payments';
import AdminPlacements from './pages/admin/Placements';
import AdminContent from './pages/admin/Content';
import AdminReports from './pages/admin/Reports';
import AdminEmails from './pages/admin/Emails';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/career" element={<Career />} />
            <Route path="/jobs" element={<JobApplication />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={['student']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<StudentDashboard />} />
          </Route>
          <Route path="/student-courses" element={<ProtectedRoute allowedRoles={['student']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<StudentCourses />} />
          </Route>
          <Route path="/student-tests" element={<ProtectedRoute allowedRoles={['student']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<StudentTests />} />
          </Route>
          <Route path="/student-assignments" element={<ProtectedRoute allowedRoles={['student']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<StudentAssignments />} />
          </Route>
          <Route path="/student-recordings" element={<ProtectedRoute allowedRoles={['student']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<StudentRecordings />} />
          </Route>
          <Route path="/student-exam-slots" element={<ProtectedRoute allowedRoles={['student']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<StudentExamSlots />} />
          </Route>
          <Route path="/student-payments" element={<ProtectedRoute allowedRoles={['student']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<StudentPayments />} />
          </Route>
          <Route path="/student-certificates" element={<ProtectedRoute allowedRoles={['student']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<StudentCertificates />} />
          </Route>

          <Route path="/trainer-dashboard" element={<ProtectedRoute allowedRoles={['trainer']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<TrainerDashboard />} />
          </Route>
          <Route path="/trainer-courses" element={<ProtectedRoute allowedRoles={['trainer']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<TrainerCourses />} />
          </Route>
          <Route path="/trainer-schedule" element={<ProtectedRoute allowedRoles={['trainer']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<TrainerSchedule />} />
          </Route>
          <Route path="/trainer-tests" element={<ProtectedRoute allowedRoles={['trainer']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<TrainerTests />} />
          </Route>
          <Route path="/trainer-assignments" element={<ProtectedRoute allowedRoles={['trainer']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<TrainerAssignments />} />
          </Route>
          <Route path="/trainer-recordings" element={<ProtectedRoute allowedRoles={['trainer']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<TrainerRecordings />} />
          </Route>
          <Route path="/trainer-students" element={<ProtectedRoute allowedRoles={['trainer']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<TrainerStudents />} />
          </Route>

          <Route path="/employee-dashboard" element={<ProtectedRoute allowedRoles={['employee']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<EmployeeDashboard />} />
          </Route>
          <Route path="/employee-attendance" element={<ProtectedRoute allowedRoles={['employee']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<EmployeeAttendance />} />
          </Route>
          <Route path="/employee-leave" element={<ProtectedRoute allowedRoles={['employee']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<EmployeeLeave />} />
          </Route>
          <Route path="/employee-meetings" element={<ProtectedRoute allowedRoles={['employee']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<EmployeeMeetings />} />
          </Route>
          <Route path="/employee-tickets" element={<ProtectedRoute allowedRoles={['employee']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<EmployeeTickets />} />
          </Route>
          <Route path="/employee-announcements" element={<ProtectedRoute allowedRoles={['employee']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<EmployeeAnnouncements />} />
          </Route>

          <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
          </Route>
          <Route path="/admin-students" element={<ProtectedRoute allowedRoles={['admin']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<AdminStudents />} />
          </Route>
          <Route path="/admin-trainers" element={<ProtectedRoute allowedRoles={['admin']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<AdminTrainers />} />
          </Route>
          <Route path="/admin-employees" element={<ProtectedRoute allowedRoles={['admin']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<AdminEmployees />} />
          </Route>
          <Route path="/admin-courses" element={<ProtectedRoute allowedRoles={['admin']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<AdminCourses />} />
          </Route>
          <Route path="/admin-payments" element={<ProtectedRoute allowedRoles={['admin']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<AdminPayments />} />
          </Route>
          <Route path="/admin-placements" element={<ProtectedRoute allowedRoles={['admin']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<AdminPlacements />} />
          </Route>
          <Route path="/admin-content" element={<ProtectedRoute allowedRoles={['admin']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<AdminContent />} />
          </Route>
          <Route path="/admin-reports" element={<ProtectedRoute allowedRoles={['admin']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<AdminReports />} />
          </Route>
          <Route path="/admin-emails" element={<ProtectedRoute allowedRoles={['admin']}><PortalLayout /></ProtectedRoute>}>
            <Route index element={<AdminEmails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
