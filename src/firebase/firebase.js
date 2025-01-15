import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCGbdt03-5K9SUhE_0F8v9aAK5DZEgVFe0",
	authDomain: "insta-clone-yt-5dfcf.firebaseapp.com",
	projectId: "insta-clone-yt-5dfcf",
	storageBucket: "insta-clone-yt-5dfcf.appspot.com",
	messagingSenderId: "540552977238",
	appId: "1:540552977238:web:813b581bd7dfcb404494f7",
	measurementId: "G-LD3C8G5Z12",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
