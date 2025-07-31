// /* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase/firebase.config";

import { sendEmailVerification } from "firebase/auth";



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const axiosPublic = useAxiosPublic();

    const googleProvider = new GoogleAuthProvider();
    const handleRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const handleLoginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const handleLogout = () => {
        setLoading(true);
        return signOut(auth);
    }
    const handleUpdateProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
        })
    }
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const sendVerificationEmail = () => {
        if (auth.currentUser) {
            return sendEmailVerification(auth.currentUser);
        }
    };
     const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };



    // onAuthStateChange functionality
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
        })
        return () => unSubscribe();

    }, [])



    const authInfo = {
        user,
        loading,
        handleRegister,
        handleLoginUser,
        handleLogout,
        handleUpdateProfile,
        signInWithGoogle,
        sendVerificationEmail,
        resetPassword
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;