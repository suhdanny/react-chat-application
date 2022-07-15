import React from 'react';
import Login from './Login';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className='min-h-screen font-sans'>
			<Routes>
				<Route exact path='/' element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
