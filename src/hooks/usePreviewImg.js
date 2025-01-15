import React, { useState } from "react";
import { toast } from "react-toastify";

const usePreviewImg = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			if (file.size > maxFileSizeInBytes) {
				toast.error("Error", "File size must be less than 2MB", "error");
				setSelectedFile(null);
				return;
			}
			const reader = new FileReader();

			reader.onloadend = () => {
				setSelectedFile(reader.result);
			};

			reader.readAsDataURL(file);
		} else {
			toast.error("Error", "Please select an image file", "error");
			setSelectedFile(null);
		}
	};

	return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
