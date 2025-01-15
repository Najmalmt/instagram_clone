import React, { useRef } from "react";
import { BsFillImageFill } from "react-icons/bs";

const PostModal = ({
	isOpen,
	onClose,
	caption,
	setCaption,
	selectedFile,
	setSelectedFile,
	handleImageChange,
	handlePostCreation,
	isLoading,
}) => {
	// Use the `useRef` hook for the file input
	const imageRef = useRef(null);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 top-28  flex items-center justify-center z-50">
			<div className="bg-black border border-gray-800 rounded-lg w-full max-w-[90%] md:max-w-xl overflow-auto">
				<div className="flex justify-between items-center p-4 border-b border-gray-800">
					<h2 className="text-xl font-semibold">Create Post</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-white">
						✕
					</button>
				</div>
				<div className="p-4">
					<textarea
						className="w-full bg-gray-800 text-white rounded-lg p-2 mb-4"
						placeholder="Post caption..."
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
					/>

					{/* File Input with ref */}
					<input
						type="file"
						hidden
						ref={imageRef}
						onChange={handleImageChange}
					/>

					<button
						onClick={() => imageRef.current.click()}
						className="text-blue-500 hover:text-blue-400 mb-4"
					>
						<BsFillImageFill size={16} />
					</button>

					{selectedFile && (
						<div className="relative mt-4">
							<div className="w-full h-64 max-h-64 overflow-hidden rounded-lg">
								<img
									src={selectedFile}
									alt="Selected"
									className="w-full h-full object-cover"
								/>
							</div>
							<button
								className="absolute top-2 right-2 bg-gray-900 rounded-full p-1 text-white hover:bg-gray-700"
								onClick={() => setSelectedFile(null)}
							>
								✕
							</button>
						</div>
					)}
				</div>
				<div className="flex justify-end p-4 border-t border-gray-800">
					<button
						className={`bg-blue-500 text-white rounded-lg px-4 py-2 ${
							isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
						}`}
						onClick={handlePostCreation}
						disabled={isLoading}
					>
						{isLoading ? "Posting..." : "Post"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PostModal;
