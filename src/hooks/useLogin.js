import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const useLogin = () => {
	const [signInWithEmailAndPassword, , loading, error] =
		useSignInWithEmailAndPassword(auth);
	const loginUser = useAuthStore((state) => state.login);

	const login = async (inputs) => {
		if (!inputs.email || !inputs.password) {
			return toast.error("Error", "Please fill all the fields", "error");
		}
		try {
			const userCred = await signInWithEmailAndPassword(
				inputs.email,
				inputs.password
			);

			if (userCred) {
				const docRef = doc(firestore, "users", userCred.user.uid);
				const docSnap = await getDoc(docRef);
				localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
				loginUser(docSnap.data());
			}
		} catch (error) {
			toast.error("Error", error.message, "error");
		}
	};

	return { loading, error, login };
};

export default useLogin;
