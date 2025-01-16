import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import Stories from "../Stories/Stories";

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);

	return (
		<div className="">
			<PostHeader post={post} creatorProfile={userProfile} />
			<div className=" aspect-square rounded-lg overflow-hidden border border-gray-800">
				<img
					src={post.imageURL}
					alt="Post"
					className="w-full h-full object-cover"
				/>
			</div>
			<PostFooter post={post} creatorProfile={userProfile} />
		</div>
	);
};

export default FeedPost;
