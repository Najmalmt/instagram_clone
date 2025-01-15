"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function AuthPage() {
	const [currentImage, setCurrentImage] = useState(1);

	// Array of image URLs for the phone mockup
	const images = [
		"/placeholder.svg?height=600&width=380",
		"/placeholder.svg?height=600&width=380",
		"/placeholder.svg?height=600&width=380",
		"/placeholder.svg?height=600&width=380",
	];

	// Function to cycle through images
	const cycleImage = () => {
		setCurrentImage((prev) => (prev % images.length) + 1);
	};

	// Effect to change image every 4 seconds
	useState(() => {
		const interval = setInterval(cycleImage, 4000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
			<div className="container max-w-[850px] flex items-center justify-center gap-8">
				{/* Left side - Phone mockup */}
				<div className="hidden max-w-[380px] lg:block flex-1">
					<div className="relative w-[300px] h-[600px] overflow-hidden">
						{images.map((src, index) => (
							<Image
								key={index}
								src={"/assets/Instagram-Story.png"}
								alt={`Instagram App Screenshot ${index + 1}`}
								width={380}
								height={380}
								className={`absolute top-6 left-0 object-cover rounded-3xl transition-opacity duration-1000 ${
									currentImage === index + 1 ? "opacity-100" : "opacity-0"
								}`}
								priority={index === 0}
							/>
						))}
					</div>
				</div>

				{/* Right side - Auth forms */}
				<div className="w-full max-w-[350px] flex flex-col gap-4">
					<AuthForm />
				</div>
			</div>
		</div>
	);
}
