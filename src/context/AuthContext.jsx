import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      console.log("Foydalanuvchi ma'lumotlari:", user);
      
      if (user) {
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserRole(docSnap.data().role);
            console.log("Ro'l:", docSnap.data().role);
          } else {
            setUserRole(null); // Ro'l hali tanlanmagan
          }
        } catch (error) {
          console.error("Xatolik yuz berdi:", error);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false); // Loading holatini oxirida false qilib qo'yish
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className='w-full h-full flex items-center justify-center text-[60px]' >Loading...</div>; // Foydalanuvchi ma'lumotlari yuklanmaguncha yuklash ekranini ko'rsatish
  }

  return (
    <AuthContext.Provider value={{ currentUser, userRole  }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
