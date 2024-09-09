

import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, userRole } = useContext(AuthContext);

  console.log(currentUser);
  console.log(userRole);
  
  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to='/unauthorized' />;
  }
 
  

  return children;
};

export default ProtectedRoute;
