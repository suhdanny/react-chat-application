import React, { useContext, useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../configs/firebase';
import { db } from '../configs/firebase';
import { doc, updateDoc, arrayUnion, DocumentReference, DocumentData } from 'firebase/firestore';
import { AuthContextInterface } from '../interfaces/AuthContextInterface';
import { AuthProviderProps } from '../interfaces/AuthProviderProps';

export const AuthContext = React.createContext<AuthContextInterface | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<FirebaseUser | null>(null);
	const navigate: NavigateFunction = useNavigate();

	useEffect(() => {
		const docRef: DocumentReference<DocumentData> = doc(db, 'users', 'igDHxnIanuSKypkJ95WM');

		onAuthStateChanged(auth, user => {
			setUser(user);
			setLoading(false);
			if (user) {
				navigate('/chats');
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
