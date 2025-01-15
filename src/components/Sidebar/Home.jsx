// import { AiFillHome } from "react-icons/ai";
// import Link from "next/link"; // Use Next.js Link for routing

// const Home = () => {
// 	return (
// 		<div className="relative group">
// 			<div className="tooltip group-hover:block absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white rounded-md py-1 px-2 text-sm hidden">
// 				Home
// 			</div>

// 			<Link
// 				href="/"
// 				passHref
// 				className="flex items-center gap-4 p-2 rounded-lg hover:bg-whiteAlpha-400 w-10 justify-center md:flex-row group"
// 			>
// 				<AiFillHome size={25} />
// 				<span className="hidden md:block">Home</span>
// 			</Link>
// 		</div>
// 	);
// };

// export default Home;

"use client";

import React from "react";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Home = ({ isMobile }) => {
	const pathname = usePathname();
	const isActive = pathname === "/";

	if (isMobile) {
		return (
			<Link
				href="/"
				className={`flex flex-col items-center gap-1 ${
					isActive ? "text-white" : "text-gray-500"
				}`}
			>
				<HomeIcon className="h-6 w-6" />
			</Link>
		);
	}

	return (
		<Link
			href="/"
			className={`group relative flex items-center gap-4 rounded-lg p-3 my-[2px] text-sm font-medium transition-colors hover:bg-gray-900 ${
				isActive ? "font-bold text-white" : "text-white hover:text-white"
			}`}
		>
			<HomeIcon className="h-6 w-6 text-white" />
			<span className="xl:block md:hidden text-base">Home</span>
			<span className="absolute left-full ml-2 hidden rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover:block lg:hidden">
				Home
			</span>
		</Link>
	);
};

export default Home;
