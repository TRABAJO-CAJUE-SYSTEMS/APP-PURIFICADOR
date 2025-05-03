// src/firebaseConfig.ts
/*/
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  off,
  Database,
  DatabaseReference,
} from 'firebase/database';

// Tipado explícito del objeto de configuración
const firebaseConfig: Record<string, string> = {
  apiKey: "AIzaSyB_lHSk7tsVKKp4h4bRK8-OJJMC63ZOoak",
  authDomain: "purificador-53617.firebaseapp.com",
  databaseURL: "https://purificador-53617-default-rtdb.firebaseio.com",
  projectId: "purificador-53617",
  storageBucket: "purificador-53617.appspot.com",
  messagingSenderId: "192689604959",
  appId: "1:192689604959:android:215bbcd9d33732602b4eea",
};

const app = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);

export { database, ref, onValue, off };
export type { Database, DatabaseReference };/*/
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off, Database, DatabaseReference } from 'firebase/database';
import { getAuth } from 'firebase/auth'; 

const firebaseConfig: Record<string, string> = {
  apiKey: "AIzaSyB_lHSk7tsVKKp4h4bRK8-OJJMC63ZOoak",
  authDomain: "purificador-53617.firebaseapp.com",
  databaseURL: "https://purificador-53617-default-rtdb.firebaseio.com",
  projectId: "purificador-53617",
  storageBucket: "purificador-53617.appspot.com",
  messagingSenderId: "192689604959",
  appId: "1:192689604959:android:215bbcd9d33732602b4eea",
};

const app = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);
const auth = getAuth(app); 

export { database, ref, onValue, off, auth }; 
export type { Database, DatabaseReference };
