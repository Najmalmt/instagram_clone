// import { useState } from "react";
// import useFollowUser from "../../hooks/useFollowUser";
// import { timeAgo } from "../../utils/timeAgo";
// import Link from "next/link";

// const PostHeader = ({ post, creatorProfile }) => {
// 	const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(
// 		post.createdBy
// 	);

// 	return (
// 		<div className="flex justify-between items-center w-full my-2">
// 			<div className="flex items-center gap-2">
// 				{creatorProfile ? (
// 					<Link href={`/${creatorProfile.username}`}>
// 						<img
// 							src={creatorProfile.profilePicURL}
// 							alt="user profile pic"
// 							className="w-10 h-10 rounded-full"
// 						/>
// 					</Link>
// 				) : (
// 					<div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
// 				)}

// 				<div className="text-xs font-bold flex gap-2">
// 					{creatorProfile ? (
// 						<Link href={`/${creatorProfile.username}`} className="text-black">
// 							{creatorProfile.username}
// 						</Link>
// 					) : (
// 						<div className="w-24 h-2 bg-gray-300 animate-pulse"></div>
// 					)}

// 					<span className="text-gray-500">• {timeAgo(post.createdAt)}</span>
// 				</div>
// 			</div>

// 			<div className="cursor-pointer">
// 				<button
// 					className="px-4 py-1 text-xs font-bold text-blue-500 bg-transparent border-0 hover:text-white transition duration-200 ease-in-out"
// 					onClick={handleFollowUser}
// 					disabled={isUpdating}
// 				>
// 					{isFollowing ? "Unfollow" : "Follow"}
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default PostHeader;

import { useState } from "react";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

const PostHeader = ({ post, creatorProfile }) => {
	const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(
		post.createdBy
	);

	return (
		<div className="flex items-center justify-between py-3 px-1">
			<div className="flex items-center gap-3">
				{creatorProfile ? (
					<Link href={`/${creatorProfile.username}`}>
						<img
							src={creatorProfile.profilePicURL}
							alt={`${creatorProfile.username}'s profile`}
							className="h-8 w-8 rounded-full object-cover"
						/>
					</Link>
				) : (
					<div className="h-8 w-8 rounded-full bg-gray-800 animate-pulse" />
				)}

				<div className="flex flex-col">
					{creatorProfile ? (
						<Link
							href={`/${creatorProfile.username}`}
							className="text-sm font-semibold hover:text-gray-300"
						>
							{creatorProfile.username}
						</Link>
					) : (
						<div className="h-3 w-24 bg-gray-800 animate-pulse rounded" />
					)}
				</div>
			</div>

			<button className="text-gray-400 hover:text-gray-300">
				<MoreHorizontal size={20} />
			</button>
		</div>
	);
};

export default PostHeader;
