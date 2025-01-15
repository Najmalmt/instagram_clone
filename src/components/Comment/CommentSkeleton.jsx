"use client";

import React from "react";

const CommentSkeleton = () => {
	return (
		<div className="flex gap-4 w-full items-center">
			{/* Circle Skeleton */}
			<div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>

			<div className="flex gap-1 flex-col">
				{/* Text Skeleton 1 */}
				<div className="w-32 h-2 bg-gray-300 rounded animate-pulse"></div>

				{/* Text Skeleton 2 */}
				<div className="w-24 h-2 bg-gray-300 rounded animate-pulse"></div>
			</div>
		</div>
	);
};

export default CommentSkeleton;
