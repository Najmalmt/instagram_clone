// import React from "react";
// import useFollowUser from "../../hooks/useFollowUser";
// import useAuthStore from "../../store/authStore";
// import Link from "next/link";

// const SuggestedUser = ({ user, setUser }) => {
// 	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
// 	const authUser = useAuthStore((state) => state.user);

// 	const onFollowUser = async () => {
// 		await handleFollowUser();
// 		setUser({
// 			...user,
// 			followers: isFollowing
// 				? user.followers.filter((follower) => follower.uid !== authUser.uid)
// 				: [...user.followers, authUser],
// 		});
// 	};

// 	return (
// 		<div className="flex justify-between items-center w-full">
// 			<div className="flex items-center gap-2">
// 				<Link href={`/${user.username}`}>
// 					<img
// 						src={user.profilePicURL}
// 						alt={user.username}
// 						className="w-12 h-12 rounded-full object-cover"
// 					/>
// 				</Link>
// 				<div className="flex flex-col items-start">
// 					<Link href={`/${user.username}`}>
// 						<p className="text-sm font-bold">{user.fullName}</p>
// 					</Link>
// 					<p className="text-xs text-gray-500">
// 						{user.followers.length} followers
// 					</p>
// 				</div>
// 			</div>
// 			{authUser.uid !== user.uid && (
// 				<button
// 					className="text-sm font-medium text-blue-400 hover:text-white bg-transparent p-0 cursor-pointer"
// 					onClick={onFollowUser}
// 					disabled={isUpdating}
// 				>
// 					{isFollowing ? "Unfollow" : "Follow"}
// 				</button>
// 			)}
// 		</div>
// 	);
// };

// export default SuggestedUser;

import React from "react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import Link from "next/link";

const SuggestedUser = ({ user, setUser }) => {
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
	const authUser = useAuthStore((state) => state.user);

	const onFollowUser = async () => {
		await handleFollowUser();
		setUser({
			...user,
			followers: isFollowing
				? user.followers.filter((follower) => follower.uid !== authUser.uid)
				: [...user.followers, authUser],
		});
	};

	// Ensure authUser is not null before accessing its properties
	if (!authUser) {
		return null; // Prevent rendering if the user is logged out
	}

	return (
		<div className="flex justify-between items-center w-full">
			<div className="flex items-center gap-2">
				<Link href={`/${user.username}`}>
					<img
						src={user.profilePicURL}
						alt={user.username}
						className="w-12 h-12 rounded-full object-cover"
					/>
				</Link>
				<div className="flex flex-col items-start">
					<Link href={`/${user.username}`}>
						<p className="text-sm font-bold">{user.fullName}</p>
					</Link>
					<p className="text-xs text-gray-500">
						{user.followers.length} followers
					</p>
				</div>
			</div>
			{authUser.uid !== user.uid && (
				<button
					className="text-sm font-medium text-blue-400 hover:text-white bg-transparent p-0 cursor-pointer"
					onClick={onFollowUser}
					disabled={isUpdating}
				>
					{isFollowing ? "Unfollow" : "Follow"}
				</button>
			)}
		</div>
	);
};

export default SuggestedUser;
