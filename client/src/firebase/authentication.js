import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { isUserExist } from "../helpers/dbFunctions";

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem("meet-auth", JSON.stringify(userCredential.user));
  } catch (error) {
    throw new Error(error);
  }
};

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem("meet-auth", JSON.stringify(userCredential.user));
  } catch (error) {
    throw new Error(error);
  }
};

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    let userDetails = {
      user_name: result.user.displayName,
      user_photo: result.user.photoURL,
      user_email: result.user.email,
    };
    localStorage.setItem("meet-auth", JSON.stringify(userDetails));
    if (!(await isUserExist(result.user.email))) {
      await addDoc(collection(db, "meet_users"), userDetails);
    }
    return userDetails;
  } catch (error) {
    throw new Error(error);
  }
};
