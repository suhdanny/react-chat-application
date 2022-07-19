import React from 'react';
import Login from './Login';
import Chats from './Chats';
import Main from '../components/Main/Main';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = (): JSX.Element => {
	return (
		<div className='min-h-screen font-sans box-border overflow-hidden'>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/chats' element={<Chats />}>
					<Route path=':chatId' element={<Main />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
