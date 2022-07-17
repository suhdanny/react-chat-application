import React, { useState } from 'react';
import Chat from './Chat';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../configs/firebase';
import { db } from '../../configs/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { getOtherEmail } from '../../utils/getOtherEmail';
import { Modal, Button } from 'react-daisyui';

const SideBar = () => {
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState('');
	const { user } = useAuth();
	const navigate = useNavigate();
	const [chatSnapshot] = useCollection(collection(db, 'chats'));
	const [userSnapshot] = useCollection(collection(db, 'users'));

	const chats = chatSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	const users = userSnapshot?.docs.map(doc => ({ ...doc.data() }));

	const toggleVisible = () => {
		setError('');
		setVisible(!visible);
	};

	const handleLogout = async () => {
		await signOut(auth);
		navigate('/');
	};

	const redirect = id => {
		navigate(`/chats/${id}`);
	};

	const newChat = async email => {
		if (!chatExists(email)) {
			await addDoc(collection(db, 'chats'), { users: [user.email, email] });
			toggleVisible();
		} else {
			setError('You already have a chat room with the user!');
		}
	};

	const chatExists = email => chats?.find(chat => chat.users.includes(user.email) && chat.users.includes(email));

	const chatElements = chats
		?.filter(chat => chat.users.includes(user.email))
		.map(chat => {
			const users = getOtherEmail(chat.users, user);

			return <Chat key={chat.id} users={users} redirect={() => redirect(chat.id)} />;
		});

	const userElements = users
		? users[0].user
				.filter(email => email !== user.email)
				.map((email, idx) => {
					return (
						<div key={idx} className='font-bold p-1 text-center cursor-pointer hover:bg-gray-200 rounded' onClick={() => newChat(email)}>
							{email}
						</div>
					);
				})
		: undefined;

	return (
		<>
			<div className='w-80 h-screen border-r-2 border-gray-200 flex flex-col items-center'>
				<div className='w-full border-b-2 border-gray-200 h-24 flex items-center p-5 gap-3'>
					<div className='avatar'>
						<div className='w-12 rounded-full'>
							<img src={user.photoURL} alt='avatar' />
						</div>
					</div>
					<div className='font-bold mr-auto'>{user.displayName}</div>
					<LogoutOutlined className='text-xl cursor-pointer' onClick={handleLogout} />
				</div>
				<Button onClick={toggleVisible} className='w-64 mb-3 mt-5'>
					New Chat
				</Button>
				<Modal open={visible} onClickBackdrop={toggleVisible} className='flex flex-col max-w-1/4 w-fit h-fit max-h-1/4'>
					<Modal.Header className='font-bold text-center mb-2'>Select User</Modal.Header>
					{error && <div className='text-red-500 font-bold'>{error}</div>}
					<Modal.Body className='overflow-x-scroll'>{userElements}</Modal.Body>
				</Modal>
				<div className='overflow-x-scroll'>{chatElements}</div>
			</div>
		</>
	);
};

export default SideBar;
