import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

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
    localStorage.setItem("meet-auth", JSON.stringify(result.user));
  } catch (error) {
    throw new Error(error);
  }
};
