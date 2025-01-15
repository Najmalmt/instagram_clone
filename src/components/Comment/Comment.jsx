"use client";

import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { timeAgo } from "../../utils/timeAgo";
import Link from "next/link";
import CommentSkelton from "./CommentSkeleton";

const Comment = ({ comment }) => {
	const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);

	if (isLoading) return <CommentSkelton />;
	return (
		<div className="flex gap-4 mb-2">
			<Link href={`/${userProfile.username}`}>
				<img
					src={userProfile.profilePicURL}
					alt={userProfile.username}
					className="w-10 h-10 rounded-full"
				/>
			</Link>
			<div className="flex flex-col">
				<div className="flex gap-2 items-center">
					<Link href={`/${userProfile.username}`}>
						<span className="font-bold text-sm">{userProfile.username}</span>
					</Link>
					<span className="text-base">{comment.comment}</span>
				</div>
				<span className="text-xs text-gray-500">
					{timeAgo(comment.createdAt)}
				</span>
			</div>
		</div>
	);
};

export default Comment;
