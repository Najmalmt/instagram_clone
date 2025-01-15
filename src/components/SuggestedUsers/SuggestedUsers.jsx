// import React from "react";
// import SuggestedHeader from "./SuggestedHeader";
// import SuggestedUser from "./SuggestedUser";
// import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
// import Link from "next/link";

// const SuggestedUsers = () => {
// 	const { isLoading, suggestedUsers } = useGetSuggestedUsers();

// 	// optional: render loading skeleton
// 	if (isLoading) return null;

// 	return (
// 		<div className=" space-y-4">
// 			<SuggestedHeader />

// 			{suggestedUsers.length !== 0 && (
// 				<div className="flex items-center justify-between w-full">
// 					<p className="text-sm font-semibold text-gray-500">
// 						Suggested for you
// 					</p>
// 					<p className="text-xs font-bold text-gray-400 hover:text-gray-500 cursor-pointer">
// 						See All
// 					</p>
// 				</div>
// 			)}

// 			{suggestedUsers.map((user) => (
// 				<SuggestedUser user={user} key={user.id} />
// 			))}

// 			<div className="text-xs text-gray-500 mt-5 self-start">
// 				© 2023 Built By{" "}
// 				<Link
// 					href="https://www.youtube.com/@asaprogrammer_"
// 					target="_blank"
// 					className="text-blue-500 text-sm"
// 				>
// 					As a Programmer
// 				</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default SuggestedUsers;
import React, { useEffect, useState } from "react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import Link from "next/link";

const SuggestedUsers = () => {
	const { isLoading, suggestedUsers: initialUsers } = useGetSuggestedUsers();
	const [suggestedUsers, setSuggestedUsers] = useState(initialUsers);

	// Synchronize state with data from the hook
	useEffect(() => {
		setSuggestedUsers(initialUsers);
	}, [initialUsers]);

	// Update a specific user in the state
	const setUser = (updatedUser) => {
		setSuggestedUsers((prevUsers) =>
			prevUsers.map((user) =>
				user.uid === updatedUser.uid ? updatedUser : user
			)
		);
	};

	if (isLoading) return null; // Optional: render a loading skeleton

	return (
		<div className="space-y-4">
			<SuggestedHeader />

			{suggestedUsers.length !== 0 && (
				<div className="flex items-center justify-between w-full">
					<p className="text-sm font-semibold text-gray-500">
						Suggested for you
					</p>
					<p className="text-xs font-bold text-gray-400 hover:text-gray-500 cursor-pointer">
						See All
					</p>
				</div>
			)}

			{suggestedUsers.map((user) => (
				<SuggestedUser user={user} key={user.id} setUser={setUser} />
			))}

			<div className="text-xs text-gray-500 mt-5 self-start">
				© 2025{" "}
				<Link href={"/"} className=" text-xs uppercase">
					Instagram from Meta
				</Link>
			</div>
		</div>
	);
};

export default SuggestedUsers;
