"use client";

import React from "react";
import { Compass } from "lucide-react"; // Explore icon
import Link from "next/link";
import { usePathname } from "next/navigation";

const Explore = ({ isMobile }) => {
	const pathname = usePathname();
	const isActive = pathname === "/";

	// Hide the Explore item if isMobile is true
	if (isMobile) return null;

	return (
		<Link
			href="/"
			className={`group relative flex items-center gap-4 rounded-lg p-3 my-[2px] text-sm font-medium transition-colors hover:bg-gray-900 ${
				isActive ? "font-bold text-white" : "text-white hover:text-white"
			}`}
		>
			<Compass className="h-6 w-6 text-white" />
			<span className="xl:block md:hidden text-base">Explore</span>
			<span className="absolute left-full ml-2 hidden rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover:block lg:hidden">
				Explore
			</span>
		</Link>
	);
};

export default Explore;
