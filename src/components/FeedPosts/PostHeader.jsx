import useFollowUser from "../../hooks/useFollowUser";
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
