"use client";

import { useState } from "react";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";
import EditProfile from "./EditProfile";
import { MoreHorizontal, Settings } from "lucide-react";

export default function ProfileHeader({ user }) {
	const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
		user?.uid
	);

	const isOwnProfile = authUser?.username === user?.username;
	const isVisitingProfile = authUser && !isOwnProfile;

	return (
		<>
			{/* Header Actions */}
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-xl font-semibold">{user?.username}</h1>
				<div className="flex items-center gap-4">
					<button className="p-2 hover:bg-gray-800 rounded-full">
						<Settings className="w-6 h-6" />
					</button>
					<button className="p-2 hover:bg-gray-800 rounded-full">
						<MoreHorizontal className="w-6 h-6" />
					</button>
				</div>
			</div>
			<div className="flex flex-col gap-8">
				{/* Profile Info */}
				<div className="flex gap-8 items-start">
					<img
						src={user.profilePicURL}
						alt={user.username}
						className="w-20 h-20 rounded-full object-cover"
					/>

					<div className="flex-1">
						<div className="flex items-center gap-4 mb-4">
							<h2 className="text-xl font-semibold">{user.fullName}</h2>
							{isOwnProfile ? (
								<div className="flex gap-2">
									<button
										onClick={() => setIsEditProfileOpen(true)}
										className="px-4 py-1.5 bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-700"
									>
										Edit profile
									</button>
									<button className="px-4 py-1.5 bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-700">
										View archive
									</button>
								</div>
							) : isVisitingProfile ? (
								<button
									onClick={handleFollowUser}
									disabled={isUpdating}
									className={`px-6 py-1.5 rounded-lg text-sm font-medium ${
										isFollowing
											? "bg-gray-800 hover:bg-gray-700"
											: "bg-blue-500 hover:bg-blue-600"
									}`}
								>
									{isFollowing ? "Following" : "Follow"}
								</button>
							) : null}
						</div>

						{/* Stats */}
						<div className="flex gap-8 mb-4">
							<div>
								<span className="font-semibold">{user.posts.length}</span>
								<span className="text-gray-400 ml-1">posts</span>
							</div>
							<div>
								<span className="font-semibold">{user.followers.length}</span>
								<span className="text-gray-400 ml-1">followers</span>
							</div>
							<div>
								<span className="font-semibold">{user.following.length}</span>
								<span className="text-gray-400 ml-1">following</span>
							</div>
						</div>

						{/* Bio */}
						<p className="text-sm">{user.bio}</p>
					</div>
				</div>

				{/* Story Highlights */}
				<div className="flex gap-4 overflow-x-auto pb-4">
					{[
						{
							id: 1,
							imageURL:
								"https://images.pexels.com/photos/29632553/pexels-photo-29632553/free-photo-of-woman-on-rooftop-overlooks-sagrada-familia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
							label: "Travel",
						},
						{
							id: 2,
							imageURL:
								"https://images.pexels.com/photos/28087028/pexels-photo-28087028/free-photo-of-cup-of-coffee-and-cake-by-the-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
							label: "Food",
						},
						{
							id: 3,
							imageURL:
								"https://images.pexels.com/photos/27591919/pexels-photo-27591919/free-photo-of-a-man-sitting-on-a-bench-outside-of-a-building.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
							label: "Friends",
						},
						{
							id: 4,
							imageURL:
								"https://images.pexels.com/photos/29985415/pexels-photo-29985415/free-photo-of-silhouetted-woman-walking-in-darkened-urban-tunnel.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
							label: "Work",
						},
						{
							id: 5,
							imageURL:
								"https://images.pexels.com/photos/29972357/pexels-photo-29972357/free-photo-of-thoughtful-woman-holding-coffee-by-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
							label: "Love",
						},
					].map((story) => (
						<div key={story.id} className="flex flex-col items-center gap-1">
							<div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center">
								<img
									src={story.imageURL}
									alt={story.label}
									className="w-14 h-14 rounded-full object-cover"
								/>
							</div>
							<span className="text-xs text-gray-400">{story.label}</span>
						</div>
					))}
				</div>

				{/* Edit Profile Modal */}
				{isEditProfileOpen && (
					<EditProfile
						isOpen={isEditProfileOpen}
						onClose={() => setIsEditProfileOpen(false)}
					/>
				)}
			</div>
		</>
	);
}
