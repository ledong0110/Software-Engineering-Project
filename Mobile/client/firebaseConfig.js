import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyBkI0ICgOS7Pmm1cNCehrnVr-htKHud6rU',
	authDomain: 'react-app-c9571.firebaseapp.com',
	projectId: 'react-app-c9571',
	storageBucket: 'react-app-c9571.appspot.com',
	messagingSenderId: '841494887624',
	appId: '1:841494887624:web:a0740dba0450a5d78479fd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
