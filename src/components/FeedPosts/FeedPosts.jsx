// import FeedPost from "./FeedPost";
// import useGetFeedPosts from "../../hooks/useGetFeedPosts";

// const FeedPosts = () => {
// 	const { isLoading, posts } = useGetFeedPosts();

// 	return (
// 		<div className="max-w-screen-sm py-10 px-2 mx-auto">
// 			{isLoading &&
// 				[0, 1, 2].map((_, idx) => (
// 					<div key={idx} className="mb-10 space-y-4">
// 						<div className="flex gap-2">
// 							<div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
// 							<div className="space-y-2">
// 								<div className="w-48 h-2 bg-gray-300 animate-pulse"></div>
// 								<div className="w-48 h-2 bg-gray-300 animate-pulse"></div>
// 							</div>
// 						</div>
// 						<div className="w-full h-96 bg-gray-300 animate-pulse"></div>
// 					</div>
// 				))}

// 			{!isLoading &&
// 				posts.length > 0 &&
// 				posts.map((post) => <FeedPost key={post.id} post={post} />)}

// 			{!isLoading && posts.length === 0 && (
// 				<div>
// 					<p className="text-md text-red-400">
// 						Dayuum. Looks like you don't have any friends.
// 					</p>
// 					<p className="text-red-400">Stop coding and go make some!!</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default FeedPosts;

import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
	const { isLoading, posts } = useGetFeedPosts();

	return (
		<div className="flex flex-col w-[468px] mx-4 gap-4">
			{isLoading &&
				[0, 1, 2].map((_, idx) => (
					<div key={idx} className="bg-[#121212] w-[468px] rounded-lg">
						<div className="flex items-center gap-3 p-3">
							<div className="h-8 w-8 rounded-full bg-gray-800 animate-pulse" />
							<div className="h-3 w-32 bg-gray-800 animate-pulse rounded" />
						</div>
						<div className="aspect-square w-full bg-gray-800 animate-pulse" />
					</div>
				))}

			{!isLoading &&
				posts.length > 0 &&
				posts.map((post) => <FeedPost key={post.id} post={post} />)}

			{!isLoading && posts.length === 0 && (
				<div className="text-center py-10">
					<p className="text-sm text-gray-400">No posts yet.</p>
					<p className="text-sm text-gray-400">
						Follow some users to see their posts!
					</p>
				</div>
			)}
		</div>
	);
};

export default FeedPosts;
