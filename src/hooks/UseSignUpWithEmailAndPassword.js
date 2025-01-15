"use client";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // for client-side navigation in Next.js

const UseSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);
  const router = useRouter();

  const signup = async (inputs) => {
    const { email, password, username, fullName } = inputs;
    if (!email.trim() || !password.trim() || !username.trim() || !fullName.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Check if username exists in Firestore
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      toast.error("Username already exists.");
      return;
    }

    try {
      // Create user with email and password
      const newUser = await createUserWithEmailAndPassword(email, password);
      if (newUser) {
        // Create a user document to store in Firestore
        const userDoc = {
          uid: newUser.user.uid,
          email,
          username,
          fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        // Save the user to Firestore
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        // Store the user in localStorage on the client-side only
        if (typeof window !== "undefined") {
          localStorage.setItem("user-info", JSON.stringify(userDoc));
        }

        // Update the global auth store with the user data
        loginUser(userDoc);

        // Redirect to the homepage after successful signup
        router.push("/"); // Use `push` for navigation after sign-up
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return { loading, error, signup };
};

export default UseSignUpWithEmailAndPassword;
