"use client";

import React from "react";
import { Film } from "lucide-react"; // Icon for Reels
import Link from "next/link";
import { usePathname } from "next/navigation";

const Reels = ({ isMobile }) => {
	const pathname = usePathname();
	const isActive = pathname === "/";

	// Hide the Reels item if isMobile is true
	if (isMobile) return null;

	return (
		<Link
			href="/"
			className={`group relative flex items-center gap-4 rounded-lg p-3 my-[2px] text-sm font-medium transition-colors hover:bg-gray-900 ${
				isActive ? "font-bold text-white" : "text-white hover:text-white"
			}`}
		>
			<Film className="h-6 w-6 text-white" />
			<span className="xl:block md:hidden text-base">Reels</span>
			<span className="absolute left-full ml-2 hidden rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover:block lg:hidden">
				Reels
			</span>
		</Link>
	);
};

export default Reels;
