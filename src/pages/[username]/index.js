"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { MoreHorizontal, Settings } from "lucide-react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import PageLayouts from "@/Layouts/PageLayouts";

export default function ProfilePage() {
	const router = useRouter();
	const { username } = router.query;
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);

	// State to manage the selected tab
	const [activeTab, setActiveTab] = useState("posts");

	if (!isLoading && !userProfile) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
				<p className="text-2xl mb-4">User Not Found</p>
				<button
					onClick={() => router.push("/")}
					className="text-blue-500 hover:text-blue-400"
				>
					Go home
				</button>
			</div>
		);
	}

	return (
		<PageLayouts>
			<div className="min-h-screen bg-black text-white">
				<div className="max-w-4xl mx-auto px-4 py-8">
					{/* Profile Content */}
					{!isLoading && userProfile && <ProfileHeader user={userProfile} />}
					{isLoading && <ProfileHeaderSkeleton />}

					<div className="mt-8 border-t border-gray-800 h-screen">
						<ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
						<ProfilePosts activeTab={activeTab} />
					</div>
				</div>
			</div>
		</PageLayouts>
	);
}

function ProfileHeaderSkeleton() {
	return (
		<div className="flex gap-8 items-start animate-pulse">
			<div className="w-20 h-20 bg-gray-800 rounded-full"></div>
			<div className="flex-1">
				<div className="h-4 bg-gray-800 rounded w-1/4 mb-4"></div>
				<div className="h-4 bg-gray-800 rounded w-1/3"></div>
			</div>
		</div>
	);
}