// import { useAuth } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { currentUser  } = useAuth();

//   if (!currentUser) {
//     // If the user is not authenticated, redirect to the login page
//     return <Navigate to="/login" />;
//   }

//   // If the user is authenticated, render the children components
//   return children;
// };

// export default ProtectedRoute;


import  { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole } = useContext(AuthContext);

  if (!currentUser) {
    // Agar foydalanuvchi autentifikatsiya qilinmagan bo'lsa, login sahifasiga yo'naltiradi
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Agar foydalanuvchi kerakli ro'lga ega bo'lmasa, ruxsat etilmagan sahifaga yo'naltiradi
    return <Navigate to="/" />;
  }

  // Agar foydalanuvchi autentifikatsiya qilingan va ro'l ruxsat etilgan bo'lsa, children komponentlarini render qiladi
  return children;
};

export default ProtectedRoute;
