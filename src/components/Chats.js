import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';

const Chat = () => {
	return (
		<div className='w-full cursor-pointer flex items-center p-5 hover:bg-gray-200'>
			<div className='avatar mr-3'>
				<div className='w-12 rounded-full'>
					<img src='https://placeimg.com/192/192/people' />
				</div>
			</div>
			<div className='font-bold'>user@gmail.com</div>
		</div>
	);
};

const SideBar = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleLogout = async () => {
		await signOut(auth);
		navigate('/');
	};

	return (
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
			<div className='overflow-x-scroll'>
				<Chat />
			</div>
		</div>
	);
};

const Main = () => {
	return (
		<div className='grow flex flex-col'>
			<TopBar />
			<ChatLog />
			<BottomBar />
		</div>
	);
};

const TopBar = () => {
	return (
		<div className='h-24 border-b-2 border-gray-200 flex items-center p-5'>
			<div className='avatar mr-5'>
				<div className='w-12 rounded-full'>
					<img src='https://placeimg.com/192/192/people' />
				</div>
			</div>
			<h1 className='font-bold text-2xl'>user@gmail.com</h1>
		</div>
	);
};

const BottomBar = () => {
	return (
		<div className='h-16 flex items-center justify-center'>
			<form className='form-control w-full p-5'>
				<input type='text' placeholder='Type here' className='input input-bordered input-md w-full' />
				<button type='submit' hidden onClick={e => e.preventDefault()}>
					Submit
				</button>
			</form>
		</div>
	);
};

const ChatLog = () => {
	return (
		<div className='grow flex flex-col pt-4 mx-5 overflow-x-scroll'>
			<div className='bg-blue-100 w-fit min-w-[100px] p-3 rounded-lg m-1'>This is some dummy text</div>
			<div className='bg-green-100 w-fit min-w-[100px] p-3 rounded-lg m-1 self-end'>This is some dummy text</div>
		</div>
	);
};

const Chats = () => {
	return (
		<div className='flex'>
			<SideBar />
			<Main />
		</div>
	);
};

export default Chats;
