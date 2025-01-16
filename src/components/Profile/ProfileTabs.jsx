"use client";

import { Grid, Bookmark, UserSquare } from "lucide-react";

export default function ProfileTabs({ activeTab, setActiveTab }) {
	return (
		<div className="flex justify-center border-t border-gray-800">
			<button
				className={`flex items-center gap-2 px-8 py-4 text-sm font-medium ${
					activeTab === "posts"
						? "border-t-2 border-white text-white"
						: "text-gray-400"
				}`}
				onClick={() => setActiveTab("posts")}
			>
				<Grid className="w-4 h-4" />
				<span className="uppercase">Posts</span>
			</button>
			<button
				className={`flex items-center gap-2 px-8 py-4 text-sm font-medium ${
					activeTab === "saved"
						? "border-t-2 border-white text-white"
						: "text-gray-400"
				}`}
				onClick={() => setActiveTab("saved")}
			>
				<Bookmark className="w-4 h-4" />
				<span className="uppercase">Saved</span>
			</button>
			<button
				className={`flex items-center gap-2 px-8 py-4 text-sm font-medium ${
					activeTab === "tagged"
						? "border-t-2 border-white text-white"
						: "text-gray-400"
				}`}
				onClick={() => setActiveTab("tagged")}
			>
				<UserSquare className="w-4 h-4" />
				<span className="uppercase">Tagged</span>
			</button>
		</div>
	);
}
