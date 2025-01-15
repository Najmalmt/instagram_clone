// import React from "react";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../../firebase/firebase";
// import useAuthStore from "../../store/authStore";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { toast } from "react-toastify";

// const GoogleAuth = ({ prefix }) => {
// 	const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
// 	const loginUser = useAuthStore((state) => state.login);

// 	const handleGoogleAuth = async () => {
// 		try {
// 			const newUser = await signInWithGoogle();
// 			if (!newUser && error) {
// 				toast.error("Error", error.message, "error");
// 				return;
// 			}

// 			const userRef = doc(firestore, "users", newUser.user.uid);
// 			const userSnap = await getDoc(userRef);

// 			if (userSnap.exists()) {
// 				// login
// 				const userDoc = userSnap.data();
// 				localStorage.setItem("user-info", JSON.stringify(userDoc));
// 				loginUser(userDoc);
// 			} else {
// 				// signup
// 				const userDoc = {
// 					uid: newUser.user.uid,
// 					email: newUser.user.email,
// 					username: newUser.user.email.split("@")[0],
// 					fullName: newUser.user.displayName,
// 					bio: "",
// 					profilePicURL: newUser.user.photoURL,
// 					followers: [],
// 					following: [],
// 					posts: [],
// 					createdAt: Date.now(),
// 				};
// 				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
// 				localStorage.setItem("user-info", JSON.stringify(userDoc));
// 				loginUser(userDoc);
// 			}
// 		} catch (error) {
// 			toast.error("Error", error.message, "error");
// 		}
// 	};

// 	return (
// 		<div
// 			className="flex items-center justify-center cursor-pointer"
// 			onClick={handleGoogleAuth}
// 		>
// 			<img src="/google.png" className="w-5" alt="Google Logo" />
// 			<span className="mx-2 text-blue-500">{prefix} in with Google</span>
// 		</div>
// 	);
// };

// export default GoogleAuth;

"use client";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";

const GoogleAuth = ({ prefix }) => {
	const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
	const loginUser = useAuthStore((state) => state.login);

	const handleGoogleAuth = async () => {
		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error) {
				console.error("Google Sign In Error:", error.message);
				return;
			}

			const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				// login
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			} else {
				// signup
				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split("@")[0],
					fullName: newUser.user.displayName,
					bio: "",
					profilePicURL: newUser.user.photoURL,
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			console.error("Google Auth Error:", error.message);
		}
	};

	return (
		<button
			onClick={handleGoogleAuth}
			className="w-full flex items-center justify-center gap-2 text-[#0095F6] font-semibold text-sm hover:text-[#1877F2] transition-colors"
		>
			<Image
				src="/assets/google.png"
				alt="Google"
				width={25}
				height={25}
				className="object-contain"
			/>
			{prefix} with Google
		</button>
	);
};

export default GoogleAuth;
