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
