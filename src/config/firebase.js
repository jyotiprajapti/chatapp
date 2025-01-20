import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, DATABASE_URL, MEASUREMENT_ID } from '@env';

// Firebase config
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain:AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket:STORAGE_BUCKET,
  messagingSenderId:MESSAGING_SENDER_ID,
  appId: APP_ID,
  databaseURL: DATABASE_URL,
  measurementId: MEASUREMENT_ID};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
export const database = getFirestore();