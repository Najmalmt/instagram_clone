import { useState } from "react";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import { toast } from "react-toastify";

const usePostComment = () => {
	const [isCommenting, setIsCommenting] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const addComment = usePostStore((state) => state.addComment);

	const handlePostComment = async (postId, comment) => {
		if (isCommenting) return;
		if (!authUser)
			return toast.error("Error", "You must be logged in to comment");
		setIsCommenting(true);
		const newComment = {
			comment,
			createdAt: Date.now(),
			createdBy: authUser.uid,
			postId,
		};
		try {
			await updateDoc(doc(firestore, "posts", postId), {
				comments: arrayUnion(newComment),
			});
			addComment(postId, newComment);
		} catch (error) {
			toast.error("Error", error.message);
		} finally {
			setIsCommenting(false);
		}
	};

	return { isCommenting, handlePostComment };
};

export default usePostComment;
