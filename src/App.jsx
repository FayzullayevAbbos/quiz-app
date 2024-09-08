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

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRoute> {/* Wrapping Home in ProtectedRoute */}
          <Home />
        </ProtectedRoute>
      ),
      path: "/",
    },
    {
      element: (
        <ProtectedRoute> {/* Wrapping StartQuiz in ProtectedRoute */}
          <StartQuiz />
        </ProtectedRoute>
      ),
      path: "/start",
    },
    {
      element: (
        <ProtectedRoute> {/* Wrapping CreateQuiz in ProtectedRoute */}
          <CreateQuiz />
        </ProtectedRoute>
      ),
      path: "/create",
    },
    {
      element: <Login />,
      path: "/login",
    },
    {
      element: <Register />,
      path: "/register",
    },
  ]);

  return (
    <AuthProvider>
      
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
