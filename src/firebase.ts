import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { firebase } from "../config";

export const firebaseApp = initializeApp(firebase);

// used for the firestore refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const todosRef = collection(db, "todos");