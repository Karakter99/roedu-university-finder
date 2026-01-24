import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Auth
import { initializeFirestore } from "firebase/firestore";

const FirebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const FirebaseAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const FirebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const FirebaseStorageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const FirebaseMessagingSenderId =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const FirebaseAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const FirebaseMeasurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: FirebaseApiKey,
  authDomain: FirebaseAuthDomain,
  projectId: FirebaseProjectId,
  storageBucket: FirebaseStorageBucket,
  messagingSenderId: FirebaseMessagingSenderId,
  appId: FirebaseAppId,
  measurementId: FirebaseMeasurementId,
};

// 1. Initialize App (Singleton Pattern)
// This prevents "Firebase App already initialized" errors in Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 2. Export Auth (Required for the Contact Page)
export const auth = getAuth(app);

// 3. Export Firestore with your specific settings
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
