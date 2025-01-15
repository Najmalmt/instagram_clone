"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";

export default function EditProfile({ isOpen, onClose }) {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		bio: "",
	});
	const authUser = useAuthStore((state) => state.user);
	const fileRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const { isUpdating, editProfile } = useEditProfile();

	async function handleEditProfile() {
		try {
			await editProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	}

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-[#262626] w-full max-w-md rounded-xl p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-semibold">Edit Profile</h2>
					<button
						onClick={onClose}
						className="p-1 hover:bg-gray-800 rounded-full"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				<div className="flex flex-col items-center mb-6">
					<img
						src={selectedFile || authUser.profilePicURL}
						alt="Profile"
						className="w-20 h-20 rounded-full object-cover mb-4"
					/>
					<button
						onClick={() => fileRef.current?.click()}
						className="text-blue-500 text-sm font-medium hover:text-blue-400"
					>
						Change profile photo
					</button>
					<input
						type="file"
						ref={fileRef}
						hidden
						onChange={handleImageChange}
					/>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-sm text-gray-400 mb-2">Name</label>
						<input
							type="text"
							value={inputs.fullName || authUser.fullName}
							onChange={(e) =>
								setInputs({ ...inputs, fullName: e.target.value })
							}
							className="w-full bg-[#363636] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
						/>
					</div>

					<div>
						<label className="block text-sm text-gray-400 mb-2">Username</label>
						<input
							type="text"
							value={inputs.username || authUser.username}
							onChange={(e) =>
								setInputs({ ...inputs, username: e.target.value })
							}
							className="w-full bg-[#363636] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
						/>
					</div>

					<div>
						<label className="block text-sm text-gray-400 mb-2">Bio</label>
						<textarea
							value={inputs.bio || authUser.bio}
							onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
							className="w-full bg-[#363636] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500 resize-none h-20"
						/>
					</div>
				</div>

				<div className="flex gap-3 mt-6">
					<button
						onClick={onClose}
						className="flex-1 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 font-medium"
					>
						Cancel
					</button>
					<button
						onClick={handleEditProfile}
						disabled={isUpdating}
						className="flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 font-medium disabled:opacity-50"
					>
						{isUpdating ? "Saving..." : "Save"}
					</button>
				</div>
			</div>
		</div>
	);
}

// import { useRef, useState } from "react";
// import useAuthStore from "../../store/authStore";
// import usePreviewImg from "../../hooks/usePreviewImg";
// import useEditProfile from "../../hooks/useEditProfile";
// import { toast } from "react-toastify";

// const EditProfile = ({ isOpen, onClose }) => {
// 	const [inputs, setInputs] = useState({
// 		fullName: "",
// 		username: "",
// 		bio: "",
// 	});
// 	const authUser = useAuthStore((state) => state.user);
// 	const fileRef = useRef(null);
// 	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
// 	const { isUpdating, editProfile } = useEditProfile();

// 	const handleEditProfile = async () => {
// 		try {
// 			await editProfile(inputs, selectedFile);
// 			setSelectedFile(null);
// 			onClose();
// 		} catch (error) {
// 			toast.error("Error", error.message, "error");
// 		}
// 	};

// 	if (!isOpen) return null; // Do not render if not open

// 	return (
// 		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
// 			<div className="bg-black border border-gray-500 rounded-lg shadow-xl max-w-md w-full p-6">
// 				<div className="flex justify-between items-center mb-6">
// 					<h2 className="text-3xl font-semibold">Edit Profile</h2>
// 					<button className="text-white text-xl" onClick={onClose}>
// 						&times;
// 					</button>
// 				</div>

// 				{/* Profile Image */}
// 				<div className="flex flex-col items-center mb-6">
// 					<img
// 						src={selectedFile || authUser.profilePicURL}
// 						alt="Profile"
// 						className="w-24 h-24 rounded-full border-2 border-white mb-4"
// 					/>
// 					<button
// 						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// 						onClick={() => fileRef.current.click()}
// 					>
// 						Edit Profile Picture
// 					</button>
// 					<input
// 						type="file"
// 						ref={fileRef}
// 						className="hidden"
// 						onChange={handleImageChange}
// 					/>
// 				</div>

// 				{/* Form Fields */}
// 				<div className="mb-4">
// 					<label className="text-sm text-white" htmlFor="fullName">
// 						Full Name
// 					</label>
// 					<input
// 						id="fullName"
// 						type="text"
// 						placeholder="Full Name"
// 						className="w-full p-2 border border-gray-300 rounded mt-2"
// 						value={inputs.fullName || authUser.fullName}
// 						onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
// 					/>
// 				</div>

// 				<div className="mb-4">
// 					<label className="text-sm text-white" htmlFor="username">
// 						Username
// 					</label>
// 					<input
// 						id="username"
// 						type="text"
// 						placeholder="Username"
// 						className="w-full p-2 border border-gray-300 rounded mt-2"
// 						value={inputs.username || authUser.username}
// 						onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
// 					/>
// 				</div>

// 				<div className="mb-6">
// 					<label className="text-sm text-white" htmlFor="bio">
// 						Bio
// 					</label>
// 					<input
// 						id="bio"
// 						type="text"
// 						placeholder="Bio"
// 						className="w-full p-2 border border-gray-300 rounded mt-2"
// 						value={inputs.bio || authUser.bio}
// 						onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
// 					/>
// 				</div>

// 				{/* Buttons */}
// 				<div className="flex gap-4">
// 					<button
// 						className="w-full bg-red-400 text-white py-2 rounded hover:bg-red-500"
// 						onClick={onClose}
// 					>
// 						Cancel
// 					</button>
// 					<button
// 						className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
// 						onClick={handleEditProfile}
// 						disabled={isUpdating}
// 					>
// 						{isUpdating ? "Updating..." : "Submit"}
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default EditProfile;
