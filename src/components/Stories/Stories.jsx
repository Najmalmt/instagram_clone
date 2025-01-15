"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import storiesData from "./StoriesData";

export default function Stories() {
	const scrollRef = useRef(null);
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(true);
	const [selectedStory, setSelectedStory] = useState(null);

	const stories = Array.from({ length: 20 }, (_, i) => ({
		id: i,
		username: `user${i}`,
		avatar: `/placeholder.svg?height=56&width=56`,
		hasStory: true,
		content: {
			type: i % 2 === 0 ? "image" : "video",
			src:
				i % 2 === 0
					? `/placeholder.svg?height=1920&width=1080`
					: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		},
	}));

	const checkScrollButtons = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
			setShowLeftButton(scrollLeft > 0);
			setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	useEffect(() => {
		checkScrollButtons();
		window.addEventListener("resize", checkScrollButtons);
		return () => window.removeEventListener("resize", checkScrollButtons);
	}, []);

	const scroll = (direction) => {
		if (scrollRef.current) {
			const scrollAmount = direction === "left" ? -320 : 320;
			scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
			setTimeout(checkScrollButtons, 300);
		}
	};

	return (
		<>
			<div className="relative mx-auto w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[510px] xl:max-w-[660px] 2xl:max-w-[700px]">
				<div
					ref={scrollRef}
					className="no-scrollbar flex gap-4 overflow-x-auto mt-[16px] mb-[24px] py-2 scroll-smooth"
					onScroll={checkScrollButtons}
				>
					{storiesData.map((story) => (
						<button
							key={story.id}
							className="flex flex-none flex-col items-center gap-1"
							onClick={() => setSelectedStory(story)}
						>
							<div
								className={`rounded-full p-[2.5px] bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-pink-500`}
							>
								<div className="rounded-full">
									<img
										src={story.imageUrl}
										alt={story.username}
										className="h-14 w-14 rounded-full object-cover"
									/>
								</div>
							</div>
							<span className="text-xs truncate w-16 text-center">
								{story.username}
							</span>
						</button>
					))}
				</div>

				{showLeftButton && (
					<button
						onClick={() => scroll("left")}
						className="absolute left-4 top-14 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-lg"
					>
						<ChevronLeft className="h-5 w-5 text-black" />
					</button>
				)}

				{showRightButton && (
					<button
						onClick={() => scroll("right")}
						className="absolute right-4 top-14 -translate-y-1/2 rounded-full bg-white  p-1.5 shadow-lg"
					>
						<ChevronRight className="h-5 w-5 text-black" />
					</button>
				)}
			</div>
		</>
	);
}
