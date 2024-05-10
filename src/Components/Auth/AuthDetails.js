import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../Firebase'
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const history = useNavigate();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
          history('/login'); // Redirect to login page if not logged in
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, [history]);
  
    const userSignOut = () => {
      signOut(auth)
        .then(() => {
          console.log("sign out successful");
          // Redirect to login page after sign out
          history('/login');
        })
        .catch((error) => console.log(error));
    };
  
    return (
      <div>
        {authUser ? (
          <>
            <p>{`Signed In as ${authUser.email}`}</p>
            <button onClick={userSignOut}>Sign Out</button>
          </>
        ) : (
          <p>Signed Out</p>
        )}
      </div>
    );
  };
  
  export default AuthDetails;