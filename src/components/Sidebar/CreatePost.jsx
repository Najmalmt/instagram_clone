// import React, { useState, useRef } from "react";
// import { BsFillImageFill } from "react-icons/bs";
// import usePreviewImg from "../../hooks/usePreviewImg";
// import { toast } from "react-toastify";
// import { PlusSquareIcon } from "lucide-react";
// import useAuthStore from "@/store/authStore";
// import usePostStore from "@/store/postStore";
// import useUserProfileStore from "@/store/userProfileStore";
// import { useRouter } from "next/router";

// const CreatePost = () => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [caption, setCaption] = useState("");
// 	const imageRef = useRef(null);
// 	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
// 	const { isLoading, handleCreatePost } = useCreatePost();

// 	const handlePostCreation = async () => {
// 		try {
// 			await handleCreatePost(selectedFile, caption);
// 			setIsOpen(false);
// 			setCaption("");
// 			setSelectedFile(null);
// 		} catch (error) {
// 			toast.error("Error", error.message, "error");
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="relative group">
// 				<button
// 					className="flex items-center gap-4 hover:bg-gray-800 rounded-lg py-3 px-4 w-full md:justify-start justify-center"
// 					onClick={() => setIsOpen(true)}
// 				>
// 					<PlusSquareIcon />
// 					<span className="hidden md:block">Create</span>
// 				</button>
// 				<div className="absolute left-full ml-2 invisible group-hover:visible md:hidden">
// 					<div className="bg-gray-800 text-white text-xs rounded py-1 px-2">
// 						Create
// 					</div>
// 				</div>
// 			</div>

// 			{isOpen && (
// 				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// 					<div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-xl">
// 						<div className="flex justify-between items-center p-4 border-b border-gray-800">
// 							<h2 className="text-xl font-semibold">Create Post</h2>
// 							<button
// 								onClick={() => setIsOpen(false)}
// 								className="text-gray-500 hover:text-white"
// 							>
// 								✕
// 							</button>
// 						</div>
// 						<div className="p-4">
// 							<textarea
// 								className="w-full bg-gray-800 text-white rounded-lg p-2 mb-4"
// 								placeholder="Post caption..."
// 								value={caption}
// 								onChange={(e) => setCaption(e.target.value)}
// 							/>

// 							<input
// 								type="file"
// 								hidden
// 								ref={imageRef}
// 								onChange={handleImageChange}
// 							/>

// 							<button
// 								onClick={() => imageRef.current.click()}
// 								className="text-blue-500 hover:text-blue-400 mb-4"
// 							>
// 								<BsFillImageFill size={16} />
// 							</button>

// 							{selectedFile && (
// 								<div className="relative mt-4">
// 									<img
// 										src={selectedFile}
// 										alt="Selected"
// 										className="w-full rounded-lg"
// 									/>
// 									<button
// 										className="absolute top-2 right-2 bg-gray-900 rounded-full p-1 text-white hover:bg-gray-700"
// 										onClick={() => setSelectedFile(null)}
// 									>
// 										✕
// 									</button>
// 								</div>
// 							)}
// 						</div>
// 						<div className="flex justify-end p-4 border-t border-gray-800">
// 							<button
// 								className={`bg-blue-500 text-white rounded-lg px-4 py-2 ${
// 									isLoading
// 										? "opacity-50 cursor-not-allowed"
// 										: "hover:bg-blue-600"
// 								}`}
// 								onClick={handlePostCreation}
// 								disabled={isLoading}
// 							>
// 								{isLoading ? "Posting..." : "Post"}
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default CreatePost;

// const useCreatePost = () => {
// 	const [isLoading, setIsLoading] = useState(false);
// 	const authUser = useAuthStore((state) => state.user);
// 	const createPost = usePostStore((state) => state.createPost);
// 	const addPost = useUserProfileStore((state) => state.addPost);
// 	const userProfile = useUserProfileStore((state) => state.userProfile);
// 	const router = useRouter();
// 	const { pathname } = router;

// 	const handleCreatePost = async (selectedFile, caption) => {
// 		if (isLoading) return;
// 		if (!selectedFile) throw new Error("Please select an image");
// 		setIsLoading(true);
// 		const newPost = {
// 			caption: caption,
// 			likes: [],
// 			comments: [],
// 			createdAt: Date.now(),
// 			createdBy: authUser.uid,
// 		};

// 		try {
// 			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
// 			const userDocRef = doc(firestore, "users", authUser.uid);
// 			const imageRef = ref(storage, `posts/${postDocRef.id}`);

// 			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
// 			await uploadString(imageRef, selectedFile, "data_url");
// 			const downloadURL = await getDownloadURL(imageRef);

// 			await updateDoc(postDocRef, { imageURL: downloadURL });

// 			newPost.imageURL = downloadURL;

// 			if (userProfile.uid === authUser.uid)
// 				createPost({ ...newPost, id: postDocRef.id });

// 			if (pathname !== "/" && userProfile.uid === authUser.uid)
// 				addPost({ ...newPost, id: postDocRef.id });

// 			toast.success("Success", "Post created successfully", "success");
// 		} catch (error) {
// 			toast.error("Error", error.message, "error");
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return { isLoading, handleCreatePost };
// };

import React, { useState } from "react";
import PostModal from "./PostModal";
import { PlusSquareIcon } from "lucide-react";
import { toast } from "react-toastify";
import usePreviewImg from "../../hooks/usePreviewImg";
import useCreatePost from "../../hooks/useCreatePost";

const CreatePost = ({ isMobile }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [caption, setCaption] = useState("");
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const { isLoading, handleCreatePost } = useCreatePost();

	const handlePostCreation = async () => {
		try {
			await handleCreatePost(selectedFile, caption);
			setIsOpen(false);
			setCaption("");
			setSelectedFile(null);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			{isMobile ? (
				<button
					onClick={() => setIsOpen(true)}
					className="flex flex-col items-center gap-1 text-white hover:text-white"
				>
					<PlusSquareIcon className="h-6 w-6" />
				</button>
			) : (
				<div className="relative group">
					<button
						className="flex items-center gap-4 hover:bg-gray-800 rounded-lg p-3 my-[2px] w-full md:justify-start justify-center"
						onClick={() => setIsOpen(true)}
					>
						<PlusSquareIcon />
						<span className="xl:block md:hidden text-base">Create</span>
					</button>
				</div>
			)}

			{isOpen && (
				<PostModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					caption={caption}
					setCaption={setCaption}
					selectedFile={selectedFile}
					setSelectedFile={setSelectedFile}
					handleImageChange={handleImageChange}
					handlePostCreation={handlePostCreation}
					isLoading={isLoading}
				/>
			)}
		</>
	);
};

export default CreatePost;

// 1- COPY AND PASTE AS THE STARTER CODE FOR THE CRAETEPOST COMPONENT
// import { Box, Flex, Tooltip } from "@chakra-ui/react";
// import { CreatePostLogo } from "../../assets/constants";

// const CreatePost = () => {
// 	return (
// 		<>
// 			<Tooltip
// 				hasArrow
// 				label={"Create"}
// 				placement='right'
// 				ml={1}
// 				openDelay={500}
// 				display={{ base: "block", md: "none" }}
// 			>
// 				<Flex
// 					alignItems={"center"}
// 					gap={4}
// 					_hover={{ bg: "whiteAlpha.400" }}
// 					borderRadius={6}
// 					p={2}
// 					w={{ base: 10, md: "full" }}
// 					justifyContent={{ base: "center", md: "flex-start" }}
// 				>
// 					<CreatePostLogo />
// 					<Box display={{ base: "none", md: "block" }}>Create</Box>
// 				</Flex>
// 			</Tooltip>
// 		</>
// 	);
// };

// export default CreatePost;
// 2-COPY AND PASTE FOR THE MODAL
/* <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Textarea placeholder='Post caption...' />

                <Input type='file' hidden />

                <BsFillImageFill
                    style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
                    size={16}
                />
            </ModalBody>

            <ModalFooter>
                <Button mr={3}>Post</Button>
            </ModalFooter>
        </ModalContent>
    </Modal> */
