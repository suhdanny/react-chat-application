import React from 'react';
import Sidebar from '../components/Sidebar/SideBar';
import { Outlet } from 'react-router-dom';

const Chats: React.FC = () => {
	return (
		<div className='flex h-screen dark:bg-zinc-800'>
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default Chats;
