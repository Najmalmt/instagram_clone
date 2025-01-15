import { create } from "zustand";

const useAuthStore = create((set) => ({
	user:
		typeof window !== "undefined"
			? JSON.parse(localStorage.getItem("user-info"))
			: null,
	login: (user) => {
		set({ user });
		if (typeof window !== "undefined") {
			localStorage.setItem("user-info", JSON.stringify(user));
		}
	},
	logout: () => {
		set({ user: null });
		if (typeof window !== "undefined") {
			localStorage.removeItem("user-info");
		}
	},
	setUser: (user) => {
		set({ user });
		if (typeof window !== "undefined") {
			localStorage.setItem("user-info", JSON.stringify(user));
		}
	},
}));

export default useAuthStore;
