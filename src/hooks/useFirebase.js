import { useEffect, useState } from "react";
import app from "../firebase.init";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";

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

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            setUser(user);
        })
    },[user])

    console.log(user)

    return{
        user,
        setUser,
        signInWithGoogle, 
    }
}

export default useFirebase;