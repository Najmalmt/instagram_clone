import React from "react";
import Link from "next/link";

const Navbar = () => {
	return (
		<div className="max-w-screen-lg mx-auto my-4 px-4">
			<div className="w-full flex justify-between items-center">
				{/* Logo */}
				<img
					src="/logo.png"
					className="h-20 hidden sm:block cursor-pointer"
					alt="Logo"
				/>

				{/* Links */}
				<div className="flex gap-4">
					<Link
						href="/auth"
						className="bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Login
					</Link>
					<Link
						href="/auth"
						className="border border-blue-500 text-blue-500 text-sm py-2 px-4 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Signup
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
