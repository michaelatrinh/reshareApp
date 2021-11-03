import { getAuth } from "@firebase/auth";
import React, { useEffect, useState, createContext } from "react";
import firebase from "../config/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  

  useEffect(() => {
    getAuth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
