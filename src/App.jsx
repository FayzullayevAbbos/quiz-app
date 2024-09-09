import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import StartQuiz from "./pages/StartQuiz";
import CreateQuiz from "./pages/CreateQuiz";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelection from "./components/RoleSelection";
import Unauthorized from "./pages/Unauthorized";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRoute>
          {" "}
         
          <Home />
        </ProtectedRoute>
      ),
      path: "/",
    },
    {
      element: (
        <ProtectedRoute requiredRole='student'>
          {" "}
          
          <StartQuiz />
        </ProtectedRoute>
      ),
      path: "/start",
    },
    {
      element: (
        <ProtectedRoute requiredRole='teacher'>
          {" "}
          
          <CreateQuiz />
        </ProtectedRoute>
      ),
      path: "/create",
    },
    {
      element: (
        <ProtectedRoute requiredRole='teacher'>
          <TeacherDashboard />
        </ProtectedRoute>
      ),
      path: "/teacher-dashboard",
    },
    {
      element: <Login />,
      path: "/login",
    },
    {
      element: <Register />,
      path: "/register",
    },
    {
      element: <RoleSelection />,
      path: "/role-selection",
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
