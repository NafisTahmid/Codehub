import { initializeApp } from "firebase/app";
import {  getAuth, signInWithPopup,  GoogleAuthProvider, GithubAuthProvider,createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import initializeAuthentication from "../firebase/firebase.init";
import React, { useEffect, useState } from 'react';

initializeAuthentication();

const useFirebase = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const signInWithGoogle = () => {

        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            setUser(user);
        }).catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
        });
    }

    const signInWithGithub = () => {

        signInWithPopup(auth, githubProvider)
        .then((result) => {

            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            setUser(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GithubAuthProvider.credentialFromError(error);
            setError(errorMessage);
        });
    }

    const login = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          console.log(user)
        })
        .catch((error) => {
        //   const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });

    }

    const registerUser = (name, image, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
            userUpdate(name, image);
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
        });
    }

    const userUpdate = (name, image) => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
          }).then(() => {
            
          }).catch((error) => {
                setError(error.message);
          });
          
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              setUser(uid);
              // ...
            } else {
              setUser({});
            }
          });
    }, [auth])

    const logOut =() => {

        signOut(auth).then(() => {
            setUser({});
        }).catch((error) => {
        });
    }

    return {
        user,
        error,
        signInWithGoogle,
        signInWithGithub,
        registerUser,
        login,
        logOut
    }
};

export default useFirebase;