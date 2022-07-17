import React from 'react';
import { Link } from 'react-router-dom';

const Chat = ({ users, redirect }) => {
	return (
		<div className='w-full cursor-pointer flex items-center p-5 hover:bg-gray-200' onClick={redirect}>
			<div className='avatar mr-3'>
				<div className='w-12 rounded-full'>
					<img src='https://placeimg.com/192/192/people' />
				</div>
			</div>
			<div className='font-bold'>{users}</div>
		</div>
	);
};

export default Chat;
