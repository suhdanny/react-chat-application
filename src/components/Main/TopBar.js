import React from 'react';

const TopBar = ({ email }) => {
	return (
		<div className='h-24 w-full border-b-2 border-gray-200 flex items-center p-5 dark:text-white'>
			<h1 className='font-bold text-xl'>{email}</h1>
		</div>
	);
};

export default TopBar;
