import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, CollectionReference, collection, DocumentData } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBFYfzDwtoGhOgQyAhVDRthCiCAx2YKN8o',
	authDomain: 'react-chat-app-1f4a4.firebaseapp.com',
	projectId: 'react-chat-app-1f4a4',
	storageBucket: 'react-chat-app-1f4a4.appspot.com',
	messagingSenderId: '490592587178',
	appId: '1:490592587178:web:aee861cca23a7baa82efd3',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>;
};

export { auth, db, createCollection };
