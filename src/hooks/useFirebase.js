import { useEffect, useState } from "react";
import {
  // sendEmailVerification,
  updateProfile,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseInitialization from "./../firebase/firebase.init.js";
firebaseInitialization();

const auth = getAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  // clear error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  // set name and profile image url
  function setNameAndImage() {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => { })
      .catch((error) => {
        setError(error.message);
      });
  }

  // Get the currently signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (signedInUser) => {
      if (signedInUser) {
        setUser(signedInUser);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  // sign out
  function logOut() {
    signOut(auth)
      .then((res) => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  // sign up with email password
  function singUp(e) {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setNameAndImage();
        // emailVerify();
        saveUser(email);
        alert("user has been created");
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  // get name
  function getName(e) {
    setName(e?.target?.value);
  }

  // get Email
  function getEmail(e) {
    setEmail(e?.target?.value);
  }
  // Get password
  function getPassword(e) {
    setPassword(e?.target?.value);
  }
  // Get photoUrl
  function getPhoto(e) {
    setPhoto(e?.target?.value);
  }

  // Save user to the DB

  function saveUser(email) {
    const user = { email };
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then()
  }

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then(res => res.json())
      .then(data => setAdmin(data.admin))
  }, [user.email])


  return {
    // signInWithEmail,
    logOut,
    user,
    admin,
    setUser,
    error,
    setError,
    getPassword,
    getEmail,
    singUp,
    getPhoto,
    getName,
    loading,
  };
};

export default useFirebase;
