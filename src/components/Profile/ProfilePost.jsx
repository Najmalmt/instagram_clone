// import { useState } from "react";
// import { AiFillHeart } from "react-icons/ai";
// import { FaComment } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import Comment from "../Comment/Comment";
// import PostFooter from "../FeedPosts/PostFooter";
// import useUserProfileStore from "../../store/userProfileStore";
// import useAuthStore from "../../store/authStore";
// import useShowToast from "../../hooks/useShowToast";
// import { deleteObject, ref } from "firebase/storage";
// import { firestore, storage } from "../../firebase/firebase";
// import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import usePostStore from "../../store/postStore";
// import Caption from "../Comment/Caption";

// const ProfilePost = ({ post }) => {
// 	const { isOpen, onOpen, onClose } = useDisclosure();
// 	const userProfile = useUserProfileStore((state) => state.userProfile);
// 	const authUser = useAuthStore((state) => state.user);
// 	const showToast = useShowToast();
// 	const [isDeleting, setIsDeleting] = useState(false);
// 	const deletePost = usePostStore((state) => state.deletePost);
// 	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

// 	const handleDeletePost = async () => {
// 		if (!window.confirm("Are you sure you want to delete this post?")) return;
// 		if (isDeleting) return;

// 		try {
// 			const imageRef = ref(storage, `posts/${post.id}`);
// 			await deleteObject(imageRef);
// 			const userRef = doc(firestore, "users", authUser.uid);
// 			await deleteDoc(doc(firestore, "posts", post.id));

// 			await updateDoc(userRef, {
// 				posts: arrayRemove(post.id),
// 			});

// 			deletePost(post.id);
// 			decrementPostsCount(post.id);
// 			showToast("Success", "Post deleted successfully", "success");
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		} finally {
// 			setIsDeleting(false);
// 		}
// 	};

// 	return (
// 		<>
// 			<div
// 				className="cursor-pointer rounded-lg overflow-hidden border border-whiteAlpha-300 relative aspect-w-1 aspect-h-1"
// 				onClick={onOpen}
// 			>
// 				<div className="opacity-0 hover:opacity-100 absolute inset-0 bg-blackAlpha-700 transition-all z-10 flex justify-center items-center">
// 					<div className="flex gap-12">
// 						<div className="flex items-center">
// 							<AiFillHeart size={20} />
// 							<span className="font-bold ml-2">{post.likes.length}</span>
// 						</div>
// 						<div className="flex items-center">
// 							<FaComment size={20} />
// 							<span className="font-bold ml-2">{post.comments.length}</span>
// 						</div>
// 					</div>
// 				</div>
// 				<img
// 					src={post.imageURL}
// 					alt="profile post"
// 					className="w-full h-full object-cover"
// 				/>
// 			</div>

// 			{/* Modal */}
// 			<div
// 				className={`modal ${isOpen ? "block" : "hidden"} fixed inset-0 z-50`}
// 			>
// 				<div
// 					className="modal-overlay bg-black opacity-50"
// 					onClick={onClose}
// 				></div>
// 				<div className="modal-content bg-black p-5 rounded-lg max-w-5xl mx-auto">
// 					<button
// 						className="absolute top-4 right-4 text-white"
// 						onClick={onClose}
// 					>
// 						×
// 					</button>
// 					<div className="flex gap-4 w-full mx-auto max-h-[90vh] min-h-[50vh]">
// 						<div className="flex-1.5 border border-whiteAlpha-300 rounded-lg overflow-hidden">
// 							<img src={post.imageURL} alt="profile post" />
// 						</div>
// 						<div className="flex-1 flex-col px-10 hidden md:flex">
// 							<div className="flex justify-between items-center">
// 								<div className="flex items-center gap-4">
// 									<img
// 										src={userProfile.profilePicURL}
// 										alt="profile pic"
// 										className="w-8 h-8 rounded-full"
// 									/>
// 									<span className="font-bold text-sm">
// 										{userProfile.username}
// 									</span>
// 								</div>

// 								{authUser?.uid === userProfile.uid && (
// 									<button
// 										className="text-sm bg-transparent border-none hover:bg-whiteAlpha-300 text-red-600 p-1 rounded-md"
// 										onClick={handleDeletePost}
// 										disabled={isDeleting}
// 									>
// 										<MdDelete size={20} />
// 									</button>
// 								)}
// 							</div>

// 							<hr className="my-4 bg-gray-500" />

// 							{/* Caption */}
// 							{post.caption && <Caption post={post} />}

// 							{/* Comments */}
// 							<div className="w-full max-h-[350px] overflow-y-auto">
// 								{post.comments.map((comment) => (
// 									<Comment key={comment.id} comment={comment} />
// 								))}
// 							</div>

// 							<hr className="my-4 bg-gray-800" />

// 							{/* Post Footer */}
// 							<PostFooter isProfilePage={true} post={post} />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default ProfilePost;

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
