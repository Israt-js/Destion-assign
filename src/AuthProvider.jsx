import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import auth from "./Firebase.config";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // SignIn
    const signInUser = async (email, password) => {
        setLoading(true);
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setError(null); // Reset error on successful sign in
        } catch (error) {
          setError(error.message); // Set error message if sign in fails
        } finally {
          setLoading(false);
        }
      };
    
      // Register
      const createUser = async (email, password) => {
        setLoading(true);
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          setError(null); // Reset error on successful registration
        } catch (error) {
          setError(error.message); // Set error message if registration fails
        } finally {
          setLoading(false);
        }
      };

      
  //Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Current value of the user: ', currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    //Cleanup subscription
    return () => unsubscribe();
  }, []);

  const authInfo = { signInUser, createUser, error };
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;