import React from 'react';
import Login from './Login';
import Chats from './Chats';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className='min-h-screen font-sans'>
			<Routes>
				<Route path='/chats' element={<Chats />} />
				<Route exact path='/' element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
