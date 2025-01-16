import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import { toast } from "react-toastify";

const ProfilePost = ({ post }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const deletePost = usePostStore((state) => state.deletePost);
	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

	const handleDeletePost = async () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		if (isDeleting) return;

		try {
			setIsDeleting(true);
			const imageRef = ref(storage, `posts/${post.id}`);
			await deleteObject(imageRef);
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostsCount(post.id);
			toast.success("Success", "Post deleted successfully", "success");
		} catch (error) {
			toast.error("Error", error.message, "error");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			{/* Post Preview */}
			<div
				className="cursor-pointer rounded-lg overflow-hidden border relative aspect-square"
				onClick={() => setIsModalOpen(true)}
			>
				<div className="opacity-0 hover:opacity-100 absolute inset-0 bg-black bg-opacity-50 transition-all flex justify-center items-center z-10">
					<div className="flex gap-8 text-white">
						<div className="flex items-center">
							<AiFillHeart size={20} />
							<span className="font-bold ml-2">{post.likes.length}</span>
						</div>
						<div className="flex items-center">
							<FaComment size={20} />
							<span className="font-bold ml-2">{post.comments.length}</span>
						</div>
					</div>
				</div>
				<img
					src={post.imageURL}
					alt="profile post"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
					<div className="bg-white rounded-lg max-w-4xl w-full p-5 relative">
						{/* Close Button */}
						<button
							className="absolute top-4 right-4 text-gray-500 hover:text-black"
							onClick={() => setIsModalOpen(false)}
						>
							×
						</button>

						<div className="flex gap-4">
							{/* Image Section */}
							<div className="flex-1 rounded-lg overflow-hidden border">
								<img
									src={post.imageURL}
									alt="profile post"
									className="w-full h-full object-cover"
								/>
							</div>

							{/* Content Section */}
							<div className="flex-1 flex flex-col">
								{/* Header */}
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-4">
										<img
											src={userProfile.profilePicURL}
											alt="profile"
											className="w-10 h-10 rounded-full"
										/>
										<span className="font-bold">{userProfile.username}</span>
									</div>
									{authUser?.uid === userProfile.uid && (
										<button
											className={`text-red-600 hover:text-red-800 ${
												isDeleting ? "opacity-50 cursor-not-allowed" : ""
											}`}
											onClick={handleDeletePost}
											disabled={isDeleting}
										>
											<MdDelete size={20} />
										</button>
									)}
								</div>

								{/* Caption */}
								{post.caption && (
									<div className="my-4">
										<span className="text-gray-700">{post.caption}</span>
									</div>
								)}

								{/* Comments */}
								<div className="flex-1 overflow-y-auto max-h-64 border-t pt-4">
									{post.comments.map((comment) => (
										<div key={comment.id} className="mb-4">
											<span className="font-semibold text-sm">
												{comment.username}:
											</span>
											<span className="ml-2 text-gray-600">{comment.text}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfilePost;
