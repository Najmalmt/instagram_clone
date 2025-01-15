import { useState } from "react";
import {
	collection,
	addDoc,
	doc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { firestore, storage } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "@/store/userProfileStore";
import { useRouter } from "next/router";

const useCreatePost = () => {
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const router = useRouter();
	const { pathname } = router;

	const handleCreatePost = async (selectedFile, caption) => {
		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);

		const newPost = {
			caption: caption,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });

			newPost.imageURL = downloadURL;

			if (userProfile.uid === authUser.uid)
				createPost({ ...newPost, id: postDocRef.id });

			if (pathname !== "/" && userProfile.uid === authUser.uid)
				addPost({ ...newPost, id: postDocRef.id });

			toast.success("Post created successfully!");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
};

export default useCreatePost;
