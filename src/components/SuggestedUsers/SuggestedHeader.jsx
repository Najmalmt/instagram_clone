// import React from "react";
// import useAuthStore from "../../store/authStore";
// import useLogout from "../../hooks/useLogout";
// import Link from "next/link";

// const SuggestedHeader = () => {
// 	const { handleLogout, isLoggingOut } = useLogout();
// 	const authUser = useAuthStore((state) => state.user);

// 	if (!authUser) return null;

// 	return (
// 		<div className="flex justify-between items-center w-full p-4">
// 			{/* Left section: Avatar and Username */}
// 			<div className="flex items-center gap-2">
// 				{/* Avatar */}
// 				<Link href={`/${authUser.username}`}>
// 					<img
// 						className="w-10 h-10 rounded-full"
// 						src={authUser.profilePicURL}
// 						alt={authUser.username}
// 					/>
// 				</Link>
// 				{/* Username */}
// 				<Link href={`/${authUser.username}`}>
// 					<p className="text-sm font-bold">{authUser.username}</p>
// 				</Link>
// 			</div>

// 			{/* Logout button */}
// 			<button
// 				className="px-4 py-2 text-xs text-blue-500 font-medium border border-blue-500 rounded-lg hover:bg-blue-50 focus:outline-none"
// 				onClick={handleLogout}
// 				disabled={isLoggingOut}
// 			>
// 				{isLoggingOut ? "Logging out..." : "Log out"}
// 			</button>
// 		</div>
// 	);
// };

// export default SuggestedHeader;

import React from "react";
import useAuthStore from "../../store/authStore";
import useLogout from "../../hooks/useLogout";
import Link from "next/link";

const SuggestedHeader = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	const authUser = useAuthStore((state) => state.user);

	if (!authUser) return null;

	// Check if profilePicURL exists and is not an empty string
	const profilePicURL = authUser.profilePicURL || null;

	return (
		<div className="flex justify-between items-center w-full mt-5 pb-2">
			{/* Left section: Avatar and Username */}
			<div className="flex items-center gap-2">
				{/* Avatar */}
				<Link href={`/${authUser.username}`}>
					{profilePicURL ? (
						<img
							className="w-11 h-11 rounded-full"
							src={profilePicURL}
							alt={authUser.username}
						/>
					) : (
						<div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
							{/* Placeholder or initials can be added here */}
							<p className="text-white text-sm">{authUser.username[0]}</p>
						</div>
					)}
				</Link>
				{/* Username */}
				<Link href={`/${authUser.username}`}>
					<p className="text-sm font-bold">{authUser.username}</p>
				</Link>
			</div>

			{/* Logout button */}
			<button
				className="px-4 py-2 text-xs text-blue-500 font-medium border border-blue-500 rounded-lg hover:bg-blue-50 focus:outline-none"
				onClick={handleLogout}
				disabled={isLoggingOut}
			>
				{isLoggingOut ? "Logging out..." : "Log out"}
			</button>
		</div>
	);
};

export default SuggestedHeader;
