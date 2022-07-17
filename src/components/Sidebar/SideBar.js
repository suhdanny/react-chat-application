import React from 'react';
import Chat from './Chat';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

const SideBar = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [snapshot] = useCollection(collection(db, 'chats'));
	const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

	const handleLogout = async () => {
		await signOut(auth);
		navigate('/');
	};

	const getOtherEmail = (users, currentUser) => {
		return users?.filter(user => user !== currentUser.email)[0];
	};

	const redirect = id => {
		console.log(id);
		navigate(`/chats/${id}`);
	};

	const chatElements = chats
		?.filter(chat => chat.users.includes(user.email))
		.map(chat => {
			const users = getOtherEmail(chat.users, user);

			return <Chat key={chat.id} users={users} redirect={() => redirect(chat.id)} />;
		});

	return (
		<>
			<div className='w-80 h-screen border-r-2 border-gray-200 flex flex-col'>
				<div className='w-full border-b-2 border-gray-200 h-24 flex items-center p-5 gap-3'>
					<div className='avatar'>
						<div className='w-12 rounded-full'>
							<img src={user.photoURL} alt='avatar' />
						</div>
					</div>
					<div className='font-bold mr-auto'>{user.displayName}</div>
					<LogoutOutlined className='text-xl cursor-pointer' onClick={handleLogout} />
				</div>
				<button className='btn m-5'>New Chat</button>
				<div className='overflow-x-scroll'>{chatElements}</div>
			</div>
		</>
	);
};

export default SideBar;
