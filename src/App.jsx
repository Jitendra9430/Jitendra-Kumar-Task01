 import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import StudentAssignments from "./pages/StudentAssignments";
import AssignmentDetails from "./pages/AssignmentsDetails";
import StudentProgress from "./pages/StudentProgress";

import AdminDashboard from "./pages/AdminDashboard";
import CreateAssignment from "./pages/CreateAssignment";

import { getCurrentUser } from "./utils/storage";


// ==========================================
// PROTECTED ROUTE
// ==========================================

function ProtectedRoute({ children, role }) {
  const user = getCurrentUser();

  console.log("PROTECTED ROUTE USER:", user);

  // User is not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // User has wrong role
  if (role && user.role !== role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}


// ==========================================
// APP
// ==========================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================
            LOGIN
        ================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ==================================
            STUDENT DASHBOARD
        ================================== */}

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            STUDENT ASSIGNMENTS
        ================================== */}

        <Route
          path="/student/assignments"
          element={
            <ProtectedRoute role="student">
              <StudentAssignments />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            ASSIGNMENT DETAILS
        ================================== */}

        <Route
          path="/student/assignments/:id"
          element={
            <ProtectedRoute role="student">
              <AssignmentDetails />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            STUDENT PROGRESS
        ================================== */}

        <Route
          path="/student/progress"
          element={
            <ProtectedRoute role="student">
              <StudentProgress />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            ADMIN DASHBOARD
        ================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            CREATE ASSIGNMENT
        ================================== */}

        <Route
          path="/admin/create"
          element={
            <ProtectedRoute role="admin">
              <CreateAssignment />
            </ProtectedRoute>
          }
        />


        {/* ==================================
            DEFAULT ROUTE
        ================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* ==================================
            UNKNOWN ROUTE
        ================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;