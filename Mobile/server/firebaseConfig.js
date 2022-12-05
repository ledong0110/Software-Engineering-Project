const {
	initializeApp,
	applicationDefault,
	cert,
} = require('firebase-admin/app');
const {
	getFirestore,
	Timestamp,
	FieldValue,
} = require('firebase-admin/firestore');

const app = initializeApp();

export const db = getFirestore(app);
