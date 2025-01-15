import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const useLogout = () => {
	const [signOut, isLoggingOut, error] = useSignOut(auth);
	const logoutUser = useAuthStore((state) => state.logout);

	const handleLogout = async () => {
		try {
			await signOut();
			localStorage.removeItem("user-info");
			logoutUser();
		} catch (error) {
			toast.error("Error", error.message, "error");
		}
	};

	return { handleLogout, isLoggingOut, error };
};

export default useLogout;
