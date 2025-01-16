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
