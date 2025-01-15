import React from "react";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuthStore from "../../store/authStore";

const ProfileLink = ({ isMobile }) => {
	const pathname = usePathname();
	const authUser = useAuthStore((state) => state.user);
	const isActive = pathname === `/${authUser?.username}`;

	if (isMobile) {
		return (
			<Link
				href={`/${authUser?.username}`}
				className="flex flex-col items-center gap-1 text-white"
			>
				<User className="h-6 w-6" />
			</Link>
		);
	}

	return (
		<Link
			href={`/${authUser?.username}`}
			className={`group relative flex items-center gap-4 rounded-lg p-3 my-[2px] text-sm font-medium transition-colors hover:bg-gray-900 ${
				isActive ? "font-bold text-white" : "text-white hover:text-white"
			}`}
		>
			<User className="h-6 w-6" />
			<span className="xl:block md:hidden text-base">Profile</span>
			<span className="absolute left-full ml-2 hidden rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover:block lg:hidden">
				Profile
			</span>
		</Link>
	);
};

export default ProfileLink;
