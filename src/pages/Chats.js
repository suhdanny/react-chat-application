import React from 'react';
import Sidebar from '../components/Sidebar/SideBar';
import { Outlet } from 'react-router-dom';

const Chats = () => {
	return (
		<div className='flex min-h-screen overflow-hidden'>
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default Chats;
