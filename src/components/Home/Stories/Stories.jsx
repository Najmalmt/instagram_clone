import React, { useRef } from "react";
import storiesData from "./StoriesData/StoriesData";
import TextEllipse from "./TextEllipse/TextEllipse";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Link from "next/link";

const Stories = () => {
	const scrollRef = useRef(null);

	// Function to handle scrolling by four items
	const scrollByFourItems = (direction) => {
		const itemWidth = 80; // Assume each story item is 80px wide (including margin/padding)
		const scrollAmount = itemWidth * 4; // Scroll by the width of 4 items

		if (direction === "left") {
			scrollRef.current.scrollLeft -= scrollAmount;
		} else {
			scrollRef.current.scrollLeft += scrollAmount;
		}
	};

	return (
		<>
			<div className="relative flex items-center">
				{/* Left slider button */}

				{/* Stories container */}
				<div
					ref={scrollRef}
					className="lg:max-w-[41vw] md:max-w-[70vw] sm:max-w-full max-w-full w-full h-auto flex items-center gap-x-3.5 overflow-x-scroll scroll-smooth"
				>
					<IoIosArrowDropleftCircle
						onClick={() => scrollByFourItems("left")}
						className="absolute mb-3 z-10 left-0 p-2 rounded-full cursor-pointer text-white flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10"
					/>
					<Link
						href="/"
						key="1"
						className="flex items-center justify-center flex-col flex-shrink-0"
					>
						<div className="w-16 h-16 rounded-full object-cover p-[2px] bg-gradient-to-r from-[#f02aa6] to-[#ff6f48]">
							<img
								src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
								alt="story img"
								className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
							/>
						</div>
						<TextEllipse username="beautyofnature" />
					</Link>

					{storiesData.map((story) => (
						<Link
							href="/"
							key={story.id}
							className="flex items-center justify-center flex-col flex-shrink-0"
						>
							<div className="w-16 h-16 rounded-full object-cover p-[2px] bg-gradient-to-r from-[#f02aa6] to-[#ff6f48]">
								<img
									src={story.imageUrl}
									alt="story img"
									className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
								/>
							</div>
							<TextEllipse username={story.username} maxLength={8} />
						</Link>
					))}
				</div>

				{/* Right slider button */}
				<IoIosArrowDroprightCircle
					onClick={() => scrollByFourItems("right")}
					className="absolute right-2 mb-3 z-10 p-2 rounded-full cursor-pointer text-white flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10"
				/>
			</div>
		</>
	);
};

export default Stories;
