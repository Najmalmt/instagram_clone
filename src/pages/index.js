"use client";

import React from "react";
import FeedPosts from "../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../components/SuggestedUsers/SuggestedUsers";
import PageLayouts from "../layouts/PageLayouts";
import Stories from "@/components/Stories/Stories";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";

const HomePage = () => {
	const [user, loading] = useAuthState(auth);
	const router = useRouter();

	// Redirect to auth page if not authenticated
	if (!loading && !user) {
		router.replace("/auth");
		return null;
	}

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center bg-black">
				<div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-600 border-t-white"></div>
			</div>
		);
	}

	return (
		<PageLayouts>
			<div className="flex justify-center w-full gap-20 lg:px-10">
				{/* Main feed section */}
				<div className="flex-grow max-w-[630px]">
					<div className="flex flex-col items-center">
						<Stories />
						<FeedPosts />
					</div>
				</div>

				{/* Sidebar with suggested users */}
				<div className="hidden lg:block w-[320px] flex-shrink-0 pt-4">
					<div className=" w-[320px]">
						<SuggestedUsers />
					</div>
				</div>
			</div>
		</PageLayouts>
	);
};

export default HomePage;
