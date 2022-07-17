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
		<form className='h-16 flex items-center justify-center'>
			<div className='form-control w-full p-5'>
				<input
					type='text'
					placeholder='Type here'
					className='input input-bordered input-md w-full'
					onChange={e => setInput(e.target.value)}
					value={input}
				/>
				<button type='submit' hidden onClick={sendMessage}>
					Submit
				</button>
			</div>
		</form>
	);
};

export default BottomBar;
