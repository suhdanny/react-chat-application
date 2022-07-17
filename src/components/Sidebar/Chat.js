import React, { useState } from 'react';
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from '../../configs/avatar';

const Chat = ({ users, redirect }) => {
	const [config] = useState(generateRandomAvatarOptions);

	return (
		<div className='w-full cursor-pointer flex items-center p-5 hover:bg-gray-200' onClick={redirect}>
			<Avatar style={{ width: '48px', height: '48px', marginRight: '12px' }} avatarStyle='Circle' {...config} />
			<div className='font-bold'>{users}</div>
		</div>
	);
};

export default Chat;
