import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX5wo0kqYsRQHc8HwAVXtxbTZ_98il_6U",
  authDomain: "dexpense-703fc.firebaseapp.com",
  projectId: "dexpense-703fc",
  storageBucket: "dexpense-703fc.appspot.com",
  messagingSenderId: "1074458364186",
  appId: "1:1074458364186:android:0436c30a374975e710c4a3",
  //measurementId: "SUA_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db };
