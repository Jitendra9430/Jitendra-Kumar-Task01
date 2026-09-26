import{
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom"

import Login from "./pages/Login.jsx"
import StudetDashboard from "./pages/StudentDashboard.jsx"
import CreateAssignment from "./pages/CreateAssignment.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"

import { getCurrentUser } from "./utils/storage.js"

function ProtectedRoute({children, role}) {
  const user = getCurrentUser();

  if(!user) {
    return <Navigate to="/login" replace />;
  }

  if(role && role.user !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route
    path="/login"
    element={<Login/>}
    />

    <Route
    path="/student"
    element={
      <ProtectedRoute role="student">
        <StudetDashboard/>
        </ProtectedRoute> 
    }
    />

    <Route
    path="admin"
    element={
      <ProtectedRoute role="admin">
        <AdminDashboard/>
      </ProtectedRoute>
    }
    />

    <Route
    path="/admin/create"
    element={
      <ProtectedRoute role="admin">
        <CreateAssignment/>
      </ProtectedRoute>
    }
    />

    <Route
    path="/"
    element={<Navigate to="/login" replace/>}
    />

    <Route
    path="*"
    element={<Navigate to="/login" replace/>}
    />
    </Routes>
    </BrowserRouter>
  );
}


export default App;