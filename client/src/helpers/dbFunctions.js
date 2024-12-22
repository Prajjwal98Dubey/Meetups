import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const isUserExist = async (email) => {
  try {
    const usersCollectionRef = collection(db, "meet_users");
    const userQuery = query(
      usersCollectionRef,
      where("user_email", "==", email)
    );
    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserDetails = async (email) => {
  try {
    const usersCollectionRef = collection(db, "meet_users");
    const userQuery = query(
      usersCollectionRef,
      where("user_email", "==", email)
    );
    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { ...userDoc.data() };
    }
    return {};
  } catch (error) {
    throw new Error(error);
  }
};
