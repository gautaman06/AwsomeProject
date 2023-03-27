/** DO NOT MAKE ANY CHANGES TO THIS FILE */

import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'

/* The configuration for the firebase app. */
const firebaseConfig = {
  apiKey: "AIzaSyC2Ohy-nTapT1q1Q1YSnED5ZJHm7AGKTTY",
  authDomain: "spliteasy-id-01.firebaseapp.com",
  projectId: "spliteasy-id-01",
  storageBucket: "spliteasy-id-01.appspot.com",
  messagingSenderId: "342057528200",
  appId: "1:342057528200:web:78f0920ea935f58448283d",
  measurementId: "G-34SWZV8V5V"
};

/* Initializing the firebase app with the configuration. */
const app = initializeApp(firebaseConfig)

/* Exporting the firebase app. */
export const firebase = getFirestore(app)
