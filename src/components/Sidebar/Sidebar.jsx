"use client";

import React from "react";
import { IoMenu } from "react-icons/io5";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";
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
					// onClick={handleLogout}
					// disabled={isLoggingOut}
					className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-900"
				>
					{/* <LogOut className="h-6 w-6" />
					<span className="xl:block md:hidden">
						{isLoggingOut ? "Logging out..." : "Log out"}
					</span> */}
					<IoMenu className="h-6 w-6"/>
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
