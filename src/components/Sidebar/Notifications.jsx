import React from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Notifications = ({ isMobile }) => {
	const pathname = usePathname();
	const isActive = pathname === "/notifications";

	if (isMobile) {
		return (
			<Link href="/" className="flex flex-col items-center gap-1 text-white">
				<Bell className="h-6 w-6" />
			</Link>
		);
	}

	return (
		<Link
			href="/notifications"
			className={`group relative flex items-center gap-4 rounded-lg p-3 my-[2px] text-sm font-medium transition-colors hover:bg-gray-900 ${
				isActive ? "font-bold text-white" : "text-white hover:text-white"
			}`}
		>
			<Bell className="h-6 w-6" />
			<span className="xl:block md:hidden text-base">Notifications</span>
			<span className="absolute left-full ml-2 hidden rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover:block lg:hidden">
				Notifications
			</span>
		</Link>
	);
};

export default Notifications;
