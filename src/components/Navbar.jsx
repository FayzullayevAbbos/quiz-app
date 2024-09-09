import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";

const Navbar = () => {
  const { currentUser } = useAuth();
  const location = useLocation()
  const navigate = useNavigate()
 
useEffect(() => {
  
  if (location.pathname === '/login' || location.pathname === '/register') {
     
    
    handleLogout();
  }

  
}, [location.pathname , currentUser?.displayName]);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
       
        if(location.pathname === '/register'){

          navigate("/register");  
        }else navigate('/login')
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Home</Link>
        
        <div className="space-x-4">
          {currentUser ? (
            <>
              
              <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

    