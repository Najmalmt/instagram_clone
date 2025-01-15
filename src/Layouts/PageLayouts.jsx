// import React from "react";
// import Sidebar from "../components/Sidebar/Sidebar";
// import Navbar from "../components/Navbar/Navbar";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase/firebase";
// import { useRouter } from "next/router";

// const PageLayouts = ({ children }) => {
// 	const router = useRouter();
// 	const { pathname } = router;
// 	const [user, loading] = useAuthState(auth);

// 	const canRenderSidebar = pathname !== "/auth" && user;
// 	const canRenderNavbar = !user && !loading && pathname !== "/auth";
// 	const checkingUserIsAuth = !user && loading;

// 	if (checkingUserIsAuth) return <PageLayoutSpinner />;

// 	return (
// 		<div className={`flex ${canRenderNavbar ? "flex-col" : "flex-row"}`}>
// 			{/* Sidebar on the left */}
// 			{canRenderSidebar && (
// 				<div className="w-[70px] md:w-[240px]">
// 					<Sidebar />
// 				</div>
// 			)}

// 			{/* Navbar */}
// 			{canRenderNavbar && <Navbar />}

// 			{/* Page content */}
// 			<div
// 				className="flex-1 mx-auto"
// 				style={{
// 					width: canRenderSidebar ? "calc(100% - 240px)" : "calc(100% - 70px)",
// 				}}
// 			>
// 				{children}
// 			</div>
// 		</div>
// 	);
// };

// export default PageLayouts;

// const PageLayoutSpinner = () => {
// 	return (
// 		<div className="flex flex-col h-screen items-center justify-center">
// 			<div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full text-blue-500"></div>
// 		</div>
// 	);
// };

"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";

const PageLayouts = ({ children }) => {
	const router = useRouter();
	const { pathname } = router;
	const [user, loading] = useAuthState(auth);
	const [isAuthResolved, setIsAuthResolved] = useState(false);

	useEffect(() => {
		if (!loading) {
			if (!user && pathname !== "/auth") {
				router.replace("/auth");
			} else {
				setIsAuthResolved(true);
			}
		}
	}, [user, loading, pathname, router]);

	// Show spinner until authentication state is resolved
	if (loading || !isAuthResolved) return <PageLayoutSpinner />;

	const canRenderSidebar = pathname !== "/auth";

	return (
		<div className="min-h-screen text-white">
			<div className="flex">
				{/* Fixed sidebar */}
				{canRenderSidebar && (
					<div className="sticky top-0 h-screen w-[100px] lg:w-[245px] border-gray-800 bg-black pb-5 pt-2">
						<Sidebar />
					</div>
				)}

				{/* Main content area with proper margin for sidebar */}
				<main
					className={`flex-grow ${
						canRenderSidebar ? "ml-[245px]" : ""
					} max-w-[1000px] min-h-screen mx-auto`}
				>
					{children}
				</main>
			</div>
		</div>
	);
};

export default PageLayouts;

const PageLayoutSpinner = () => (
	<div className="flex h-screen items-center justify-center bg-black">
		<div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-600 border-t-white"></div>
	</div>
);
