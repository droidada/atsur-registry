"use client";
import {
  type FirebaseOptions,
  initializeApp,
  getApp,
  getApps,
} from "firebase/app";
import { getMessaging } from "firebase/messaging";

console.log(
  "MESSAGE SENDER",
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
);

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env
    .NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
};

// Initialize Firebase only if it hasn't been initialized yet
const firebaseapp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const messaging = () => getMessaging(firebaseapp);

export default firebaseapp;
