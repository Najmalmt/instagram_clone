"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useLogin from "../../hooks/useLogin";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { loading, error, login } = useLogin();
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (inputs.email && inputs.password) {
			await login(inputs);
			router.push("/");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input
				type="email"
				placeholder="Phone number, username, or email"
				className="w-full px-4 py-3 bg-[#121212] border border-gray-800 rounded-lg text-sm focus:outline-none focus:border-gray-600"
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				className="w-full px-4 py-3 bg-[#121212] border border-gray-800 rounded-lg text-sm focus:outline-none focus:border-gray-600"
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
				required
			/>

			{error && (
				<div className="flex items-center bg-red-900/50 text-red-200 p-3 rounded-lg text-sm">
					<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
					<span>{error.message}</span>
				</div>
			)}

			<button
				type="submit"
				disabled={loading}
				className="w-full bg-[#0095F6] text-white rounded-lg py-3 text-sm flex items-center justify-center font-semibold hover:bg-[#1877F2] transition duration-200 disabled:opacity-50"
			>
				{loading ? <LoaderCircle className="animate-spin" /> : "Log in"}
			</button>

			<Link
				href="/forgot-password"
				className="block text-center text-sm text-[#0095F6] hover:text-[#1877F2] transition-colors"
			>
				Forgot password?
			</Link>
		</form>
	);
};

export default Login;
