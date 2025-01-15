// import ProfilePost from "./ProfilePost";
// import useGetUserPosts from "../../hooks/useGetUserPosts";

// const ProfilePosts = () => {
// 	const { isLoading, posts } = useGetUserPosts();

// 	const noPostsFound = !isLoading && posts.length === 0;
// 	if (noPostsFound) return <NoPostsFound />;

// 	return (
// 		<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-1">
// 			{isLoading &&
// 				[0, 1, 2].map((_, idx) => (
// 					<div key={idx} className="flex flex-col items-start gap-4">
// 						<div className="w-full h-72 bg-gray-300 animate-pulse"></div>
// 					</div>
// 				))}

// 			{!isLoading && (
// 				<>
// 					{posts.map((post) => (
// 						<ProfilePost post={post} key={post.id} />
// 					))}
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default ProfilePosts;

// const NoPostsFound = () => {
// 	return (
// 		<div className="flex flex-col items-center text-center mx-auto mt-10">
// 			<p className="text-2xl">No Posts Found🤔</p>
// 		</div>
// 	);
// };

"use client";

import { Heart, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import useGetUserPosts from "../../hooks/useGetUserPosts";

export default function ProfilePosts({ activeTab }) {
	const { isLoading: isPostsLoading, posts } = useGetUserPosts();
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		if (activeTab === "posts") {
			setFilteredPosts(posts);
		} else if (activeTab === "saved") {
			// Simulate fetching saved posts (replace with actual API call)
			setFilteredPosts([
				{
					id: 1,
					imageURL:
						"https://images.pexels.com/photos/27244375/pexels-photo-27244375/free-photo-of-car-by-maelifell-on-iceland.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
				},
				{
					id: 2,
					imageURL:
						"https://images.pexels.com/photos/29890824/pexels-photo-29890824/free-photo-of-lush-green-forest-pathway-in-serene-landscape.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
				},
				{
					id: 3,
					imageURL:
						"https://images.pexels.com/photos/29935806/pexels-photo-29935806/free-photo-of-charming-cottage-in-sunlit-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
				},
			]);
		} else if (activeTab === "tagged") {
			// Simulate fetching tagged posts (replace with actual API call)
			setFilteredPosts([
				{
					id: 1,
					imageURL:
						"https://images.pexels.com/photos/29983242/pexels-photo-29983242/free-photo-of-charming-european-robin-amidst-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
				},
				{
					id: 2,
					imageURL:
						"https://images.pexels.com/photos/29827505/pexels-photo-29827505/free-photo-of-aerial-landscape-view-in-the-philippines.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
				},
				{
					id: 3,
					imageURL:
						"https://images.pexels.com/photos/29748951/pexels-photo-29748951/free-photo-of-street-vendor-with-fruit-bicycle-in-vietnam.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
				},
			]);
		}

		// Simulate delay for loading state
		setTimeout(() => setIsLoading(false), 500);
	}, [activeTab, posts]);

	if (!isLoading && filteredPosts.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20">
				<p className="text-xl font-semibold mb-2">No Posts Yet</p>
				<p className="text-gray-400">
					Start capturing and sharing your moments.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-3 gap-1">
			{isLoading || isPostsLoading
				? // Loading skeletons
				  [...Array(9)].map((_, i) => (
						<div key={i} className="aspect-square bg-gray-800 animate-pulse" />
				  ))
				: filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
		</div>
	);
}

function PostCard({ post }) {
	return (
		<div className="aspect-square group cursor-pointer">
			<img src={post.imageURL} alt="" className="w-full h-full object-cover" />
		</div>
	);
}
