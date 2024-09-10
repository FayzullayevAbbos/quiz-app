import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  
  const [userRole, setUserRole] = useState(null);
  const [changePath , setChangePath] = useState('')
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      
      
      if (user) {
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserRole(docSnap.data().role);
           
          } else {
            setUserRole(null); 
          }
        } catch (error) {
          console.error("Xatolik yuz berdi:", error);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [changePath]);

  if (loading) {
    return <div className='w-full h-full flex items-center justify-center text-[60px]' >Loading...</div>; // Foydalanuvchi ma'lumotlari yuklanmaguncha yuklash ekranini ko'rsatish
  }

  return (
    <AuthContext.Provider value={{ currentUser, userRole , setChangePath}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
