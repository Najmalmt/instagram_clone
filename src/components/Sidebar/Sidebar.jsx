// import { useState } from "react";
// import { BiLogOut } from "react-icons/bi";
// import useLogout from "../../hooks/useLogout";
// import SidebarItems from "./SidebarItems";
// import { Instagram, InstagramIcon } from "lucide-react";
// import Link from "next/link";

// const Sidebar = () => {
// 	const { handleLogout, isLoggingOut } = useLogout();
// 	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// 	return (
// 		<div className="h-screen sticky top-0 left-0 py-8 px-2 md:px-4 border-r border-white/30">
// 			<div className="flex flex-col gap-10 h-full">
// 				{/* Instagram Logo (Desktop) */}
// 				<Link href="/" className="hidden md:block pl-2 cursor-pointer">
// 					<Instagram />
// 				</Link>

// 				{/* Instagram Icon (Mobile) */}
// 				<Link
// 					href="/"
// 					className="block md:hidden p-2 rounded-md hover:bg-white/20 w-10 cursor-pointer"
// 				>
// 					<InstagramIcon />
// 				</Link>

// 				{/* Sidebar Items */}
// 				<div className="flex flex-col gap-5 cursor-pointer">
// 					<SidebarItems />
// 				</div>

// 				{/* Logout Section */}
// 				<div className="relative">
// 					<div className="tooltip hidden md:block absolute top-0 right-0">
// 						<span className="tooltip-text">Logout</span>
// 					</div>
// 					<div
// 						className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/20 cursor-pointer"
// 						onClick={handleLogout}
// 					>
// 						<BiLogOut size={25} />
// 						<button
// 							className="hidden md:block text-white hover:bg-transparent"
// 							disabled={isLoggingOut}
// 						>
// 							{isLoggingOut ? "Logging out..." : "Logout"}
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Sidebar;

"use client";

import React from "react";
import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";
import { Instagram } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
	const { handleLogout, isLoggingOut } = useLogout();

	return (
		<>
			{/* Desktop and Tablet Sidebar */}
			<div className=" hidden h-screen flex-col justify-between border-r border-gray-800 bg-black p-3 md:flex w-[345px] xl:max-w-[245px] md:max-w-[72px]">
				<div className="flex flex-col">
					<Link
						href={"/"}
						className="pt-[25px] px-[12px] pb-[16px] mb-[19px] lg:block md:hidden sm:hidden hidden"
					>
						<img
							src="assets/instagram.png"
							alt="instagram-logo"
							className="w-[108px] h-auto"
						/>
					</Link>

					<div className="flex flex-col gap-2">
						<SidebarItems />
					</div>
				</div>

				<button
					onClick={handleLogout}
					disabled={isLoggingOut}
					className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-900"
				>
					<LogOut className="h-6 w-6" />
					<span className="xl:block md:hidden">
						{isLoggingOut ? "Logging out..." : "Log out"}
					</span>
				</button>
			</div>

			{/* Mobile Bottom Navigation */}
			<div className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-around border-t border-gray-800 bg-black px-3 md:hidden">
				<SidebarItems isMobile />
			</div>
		</>
	);
};

export default Sidebar;
