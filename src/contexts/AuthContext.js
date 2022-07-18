import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebase';
import { db } from '../configs/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const docRef = doc(db, 'users', 'igDHxnIanuSKypkJ95WM');

	useEffect(() => {
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

	const value = {
		user,
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
