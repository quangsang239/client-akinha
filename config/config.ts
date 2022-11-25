import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = process.env.FIREBASE_CONFIG || {};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
