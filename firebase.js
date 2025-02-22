// firebase.js - Connects Firebase Firestore to your project

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

// Function to save a document (data) in Firestore
export const saveData = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...data,
      timestamp: new Date(), // Adds timestamp to each document
    });
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

// Function to fetch all documents from a Firestore collection
export const getData = async (collectionName) => {
  try {
    const q = query(collection(db, collectionName), orderBy("timestamp", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error retrieving data:", error);
    return [];
  }
};

export { db };
