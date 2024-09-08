import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the children components
  return children;
};

export default ProtectedRoute;
