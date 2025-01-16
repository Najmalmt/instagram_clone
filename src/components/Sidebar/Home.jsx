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
