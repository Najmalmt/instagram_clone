// import React, { useState } from "react";
// import Login from "./Login";
// import Signup from "./Signup";
// import GoogleAuth from "./GoogleAuth";

// const AuthForm = () => {
// 	const [isLogin, setIsLogin] = useState(true);

// 	return (
// 		<>
// 			<div className="border border-gray-300 rounded-md p-5">
// 				<div className="space-y-4">
// 					<img
// 						src="/logo.png"
// 						className="h-24 cursor-pointer"
// 						alt="Instagram"
// 					/>

// 					{isLogin ? <Login /> : <Signup />}

// 					{/* ============== OR =========== */}
// 					<div className="flex items-center justify-center my-4 gap-1 w-full">
// 						<div className="flex-1 h-px bg-gray-400" />
// 						<span className="mx-1 text-white">OR</span>
// 						<div className="flex-1 h-px bg-gray-400" />
// 					</div>

// 					<GoogleAuth prefix={isLogin ? "Log in" : "sign up"} />
// 				</div>
// 			</div>

// 			<div className="border border-gray-300 rounded-md p-5">
// 				<div className="flex items-center justify-center">
// 					<div className="mx-2 text-sm">
// 						{isLogin ? "Don't have an account?" : "Already have an account?"}
// 					</div>
// 					<div
// 						onClick={() => setIsLogin(!isLogin)}
// 						className="text-blue-500 cursor-pointer"
// 					>
// 						{isLogin ? "Sign up" : "Log in"}
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default AuthForm;

"use client";

import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
import Image from "next/image";

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<>
			<div className="bg-[#000000] border border-gray-800 rounded-lg p-8 w-full max-w-[350px]">
				<div className="space-y-6">
					{/* Instagram Logo */}
					<div className="flex justify-center">
						<Image
							src="/assets/instagram.png"
							alt="Instagram"
							width={150}
							height={50}
							className="object-contain"
						/>
					</div>

					{isLogin ? <Login /> : <Signup />}

					{/* Divider */}
					<div className="flex items-center my-6">
						<div className="flex-1 h-px bg-gray-800"></div>
						<span className="px-4 text-sm text-gray-500">OR</span>
						<div className="flex-1 h-px bg-gray-800"></div>
					</div>

					<GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
				</div>
			</div>

			<div className="bg-[#000000] border border-gray-800 rounded-lg p-6 w-full max-w-[350px]">
				<div className="flex items-center justify-center">
					<p className="text-sm text-gray-300">
						{isLogin ? "Don't have an account?" : "Already have an account?"}
						<button
							onClick={() => setIsLogin(!isLogin)}
							className="ml-1 text-[#0095F6] font-semibold hover:text-[#1877F2] transition-colors"
						>
							{isLogin ? "Sign up" : "Log in"}
						</button>
					</p>
				</div>
			</div>
		</>
	);
};

export default AuthForm;
