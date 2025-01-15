// import { useRef, useState } from "react";
// import usePostComment from "../../hooks/usePostComment";
// import useAuthStore from "../../store/authStore";
// import useLikePost from "../../hooks/useLikePost";
// import { timeAgo } from "../../utils/timeAgo";
// import CommentsModal from "../Modals/CommentsModal";
// import { CommandIcon, LucideNutOff, Unlink } from "lucide-react";

// const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
// 	const { isCommenting, handlePostComment } = usePostComment();
// 	const [comment, setComment] = useState("");
// 	const authUser = useAuthStore((state) => state.user);
// 	const commentRef = useRef(null);
// 	const { handleLikePost, isLiked, likes } = useLikePost(post);

// 	// Modal state management
// 	const [isOpen, setIsOpen] = useState(false);

// 	const handleSubmitComment = async () => {
// 		await handlePostComment(post.id, comment);
// 		setComment("");
// 	};

// 	return (
// 		<div className="mb-10 mt-auto">
// 			<div className="flex items-center gap-4 w-full pt-0 mb-2 mt-4">
// 				<div className="cursor-pointer text-xl" onClick={handleLikePost}>
// 					{!isLiked ? <LucideNutOff /> : <Unlink />}
// 				</div>

// 				<div
// 					className="cursor-pointer text-xl"
// 					onClick={() => commentRef.current.focus()}
// 				>
// 					<CommandIcon />
// 				</div>
// 			</div>
// 			<p className="font-semibold text-sm">{likes} likes</p>

// 			{isProfilePage && (
// 				<p className="text-xs text-gray-500">
// 					Posted {timeAgo(post.createdAt)}
// 				</p>
// 			)}

// 			{!isProfilePage && (
// 				<>
// 					<p className="text-sm font-semibold">
// 						{creatorProfile?.username}{" "}
// 						<span className="font-normal">{post.caption}</span>
// 					</p>
// 					{post.comments.length > 0 && (
// 						<p
// 							className="text-sm text-gray-500 cursor-pointer"
// 							onClick={() => setIsOpen(true)}
// 						>
// 							View all {post.comments.length} comments
// 						</p>
// 					)}
// 					{/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
// 					{isOpen && (
// 						<CommentsModal
// 							isOpen={isOpen}
// 							onClose={() => setIsOpen(false)}
// 							post={post}
// 						/>
// 					)}
// 				</>
// 			)}

// 			{authUser && (
// 				<div className="flex items-center gap-2 justify-between w-full">
// 					<div className="relative w-full">
// 						<input
// 							type="text"
// 							placeholder="Add a comment..."
// 							className="w-full px-2 py-1 text-sm bg-transparent border-b border-gray-300 focus:outline-none"
// 							onChange={(e) => setComment(e.target.value)}
// 							value={comment}
// 							ref={commentRef}
// 						/>
// 						<button
// 							className="absolute right-0 top-1/2 transform -translate-y-1/2 text-blue-500 font-semibold text-sm cursor-pointer"
// 							onClick={handleSubmitComment}
// 							disabled={isCommenting}
// 						>
// 							{isCommenting ? "Posting..." : "Post"}
// 						</button>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default PostFooter;

import { useRef, useState } from "react";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";
import { Heart, MessageCircle, Bookmark, Send } from "lucide-react";
import Link from "next/link";

const PostFooter = ({ post, creatorProfile }) => {
	const { isCommenting, handlePostComment } = usePostComment();
	const [comment, setComment] = useState("");
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { handleLikePost, isLiked, likes } = useLikePost(post);
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmitComment = async () => {
		await handlePostComment(post.id, comment);
		setComment("");
	};

	return (
		<div className="py-3">
			{/* Action Buttons */}
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-4">
					<button
						onClick={handleLikePost}
						className={`hover:text-gray-300 ${
							isLiked ? "text-red-500" : "text-white"
						}`}
					>
						<Heart size={24} fill={isLiked ? "currentColor" : "none"} />
					</button>
					<button
						onClick={() => commentRef.current?.focus()}
						className="hover:text-gray-300"
					>
						<MessageCircle size={24} />
					</button>
					<button className="hover:text-gray-300">
						<Send size={24} />
					</button>
				</div>
				<button className="hover:text-gray-300">
					<Bookmark size={24} />
				</button>
			</div>

			{/* Likes */}
			<div className="mb-2">
				<p className="font-semibold text-sm">{likes} likes</p>
			</div>

			{/* Caption */}
			<div className="mb-2">
				<p className="text-sm">
					<Link
						href={`/${creatorProfile?.username}`}
						className="font-semibold hover:text-gray-300 mr-2"
					>
						{creatorProfile?.username}
					</Link>
					{post.caption}
				</p>
			</div>

			{/* Comments */}
			{post.comments.length > 0 && (
				<button
					className="text-sm text-gray-400 hover:text-gray-300 mb-1"
					onClick={() => setIsOpen(true)}
				>
					View all {post.comments.length} comments
				</button>
			)}

			{/* Timestamp */}
			<p className="text-xs text-gray-400 uppercase mb-2">
				{timeAgo(post.createdAt)}
			</p>

			{/* Add Comment */}
			{authUser && (
				<div className="flex items-center gap-2 border-t border-gray-800 pt-4 mt-4">
					<input
						type="text"
						placeholder="Add a comment..."
						className="bg-transparent text-sm flex-1 focus:outline-none"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						ref={commentRef}
					/>
					<button
						className="text-sm font-semibold text-blue-500 hover:text-white disabled:text-gray-500"
						onClick={handleSubmitComment}
						disabled={!comment.trim() || isCommenting}
					>
						Post
					</button>
				</div>
			)}

			{isOpen && (
				<CommentsModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					post={post}
				/>
			)}
		</div>
	);
};

export default PostFooter;
