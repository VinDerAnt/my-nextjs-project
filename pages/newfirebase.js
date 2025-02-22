import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";

// Firebase configuration using environment variables from Vercel
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to save a chat message
export const saveMessage = async (username, text) => {
  if (!username || !text.trim()) {
    console.error("Invalid message: Username and text are required.");
    return;
  }
  try {
    await addDoc(collection(db, "messages"), {
      username,
      text,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error saving message:", error);
  }
};

// Function to get chat messages
export const getMessages = async () => {
  const messagesQuery = query(collection(db, "messages"), orderBy("timestamp", "asc"));
  const snapshot = await getDocs(messagesQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { db, collection, addDoc, getDocs };
