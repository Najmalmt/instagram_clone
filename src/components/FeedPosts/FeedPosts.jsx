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
