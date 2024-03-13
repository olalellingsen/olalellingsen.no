import React, { createContext, useContext, useState } from "react";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { User } from "firebase/auth";
import { app } from "../firebase";

interface AuthContextType {
  isSignedIn: boolean;
  login: () => void;
  logout: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Move useState here

  const SIGN_IN_WITH_GOOGLE = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log("User >>>", user);
        setUser(user);
        setIsSignedIn(true); // Set login state
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        alert(errorCode);
      });
  };

  const SIGN_OUT = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setIsSignedIn(false); // Set logout state
      })
      .catch((error) => {
        alert(error);
      });
  };

  const value: AuthContextType = {
    isSignedIn,
    login: SIGN_IN_WITH_GOOGLE,
    logout: SIGN_OUT,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
