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