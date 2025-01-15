import React, { useState, useRef } from "react";
import { SearchIcon, X } from "lucide-react";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = ({ isMobile }) => {
	const { user, isLoading, getUserProfile, setUser } = useSearchUser();
	const searchRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleSearchUser = (e) => {
		e.preventDefault();
		getUserProfile(searchRef.current.value);
	};

	if (isMobile) {
		return (
			<>
				<button
					onClick={() => setIsOpen(true)}
					className="flex flex-col items-center gap-1 text-white"
				>
					<SearchIcon className="h-6 w-6" />
				</button>

				{isOpen && (
					<div className="fixed inset-0 z-50">
						<div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-800 bg-black p-6">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="text-lg font-semibold">Search</h2>
								<button
									onClick={() => setIsOpen(false)}
									className="text-gray-500"
								>
									<X />
								</button>
							</div>
							<form onSubmit={handleSearchUser}>
								<input
									ref={searchRef}
									type="text"
									placeholder="Search users..."
									className="mb-4 w-full rounded-lg border border-gray-800 bg-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button
									type="submit"
									disabled={isLoading}
									className="w-full mb-3 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
								>
									{isLoading ? "Searching..." : "Search"}
								</button>
							</form>
							{user && <SuggestedUser user={user} setUser={setUser} />}
						</div>
					</div>
				)}
			</>
		);
	}

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="group relative flex w-full items-center gap-4 rounded-lg p-3 my-[2px] text-sm font-medium text-white transition-colors hover:bg-gray-900 hover:text-white"
			>
				<SearchIcon className="h-6 w-6" />
				<span className="xl:block md:hidden text-base">Search</span>
				<span className="absolute left-full ml-2 hidden rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover:block lg:hidden">
					Search
				</span>
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 ">
					<div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-800 bg-black p-6">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-lg font-semibold">Search</h2>
							<button
								onClick={() => setIsOpen(false)}
								className="text-gray-500"
							>
								<X />
							</button>
						</div>
						<form onSubmit={handleSearchUser}>
							<input
								ref={searchRef}
								type="text"
								placeholder="Search users..."
								className="mb-4 w-full rounded-lg border border-gray-800 bg-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full mb-3 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
							>
								{isLoading ? "Searching..." : "Search"}
							</button>
						</form>
						{user && <SuggestedUser user={user} setUser={setUser} />}
					</div>
				</div>
			)}
		</>
	);
};

export default Search;
