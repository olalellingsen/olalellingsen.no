import React, { useState } from "react";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase";
import { User } from "firebase/auth";

function Admin() {
  const [user, setUser] = useState<User | null>(null);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const SIGN_IN_WITH_GOOGLE = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log("User >>>", user);
        setUser(user);
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
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="">
      <h1>Admin</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          {/* More content for logged-in users */}
          <button className="button" onClick={SIGN_OUT}>
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <button className="button" onClick={SIGN_IN_WITH_GOOGLE}>
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default Admin;
