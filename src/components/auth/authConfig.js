import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../data/firebaseConfig";
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    return user;
  } catch (err) {
    alert(err.message);
    return err.message;
  }
};

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    return user;
  } catch (err) {
    alert(err.message);
    return err.message;
  }
};


export const userLogOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
}