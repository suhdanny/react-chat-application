import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../configs/firebase';

const BottomBar = ({ id, user }) => {
	const [input, setInput] = useState('');

	const sendMessage = async e => {
		e.preventDefault();
		await addDoc(collection(db, `chats/${id}/messages`), {
			text: input,
			sender: user.email,
			timestamp: serverTimestamp(),
		});
		setInput('');
	};

	return (
		<form className='h-20 flex items-center justify-center grow border-t-2 border-gray-200'>
			<div className='form-control w-full p-5'>
				<input
					type='text'
					placeholder='Type here'
					onChange={e => setInput(e.target.value)}
					value={input}
					className='p-3 focus:outline-none rounded-xl bg-gray-100 dark:bg-zinc-900 dark:text-white'
				/>
				<button type='submit' hidden onClick={sendMessage}>
					Submit
				</button>
			</div>
		</form>
	);
};

export default BottomBar;
