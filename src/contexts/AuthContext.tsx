import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../configs/firebase';
import { db } from '../configs/firebase';
import { doc, updateDoc, arrayUnion, DocumentReference, DocumentData } from 'firebase/firestore';
import { AuthContextInterface } from '../interfaces/AuthContextInterface';

export const AuthContext = React.createContext<AuthContextInterface>({} as AuthContextInterface);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<FirebaseUser | null>(null);

	useEffect(() => {
		const docRef: DocumentReference<DocumentData> = doc(db, 'users', 'igDHxnIanuSKypkJ95WM');

		onAuthStateChanged(auth, user => {
			setUser(user);
			setLoading(false);
			if (user) {
				updateDoc(docRef, {
					user: arrayUnion(user.email),
				});
			}
		});
	}, [user]);

	const value: AuthContextInterface = {
		user,
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
