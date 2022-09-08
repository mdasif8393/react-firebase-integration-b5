import { useEffect, useState } from "react";
import app from "../firebase.init";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const useFirebase = () => {
    const auth = getAuth(app); 
    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState({});

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            setUser(user);
        })
    }

    const logOut = () => {
        signOut(auth)
        .then((result) => {
            setUser({});
        })
        .catch((error) => {

        })
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
            }
        })
    },[])


    return{
        user,
        setUser,
        signInWithGoogle,
        logOut
    }
}

export default useFirebase;