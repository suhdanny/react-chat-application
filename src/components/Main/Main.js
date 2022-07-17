import React from 'react';
import { db } from '../../configs/firebase';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getOtherEmail } from '../../utils/getOtherEmail';

const Main = () => {
	const { chatId } = useParams();
	const { user } = useAuth();

	const ref = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp'));
	const [messages] = useCollectionData(ref);
	const [chat] = useDocumentData(doc(db, 'chats', chatId));

	return (
		<div className='grow flex flex-col'>
			<TopBar email={getOtherEmail(chat?.users, user)} />
			<ChatLog messages={messages} user={user} />
			<BottomBar />
		</div>
	);
};

const TopBar = ({ email }) => {
	return (
		<div className='h-24 border-b-2 border-gray-200 flex items-center p-5'>
			<div className='avatar mr-5'>
				<div className='w-12 rounded-full'>
					<img src='https://placeimg.com/192/192/people' />
				</div>
			</div>
			<h1 className='font-bold text-2xl'>{email}</h1>
		</div>
	);
};

const BottomBar = () => {
	return (
		<div className='h-16 flex items-center justify-center'>
			<form className='form-control w-full p-5'>
				<input type='text' placeholder='Type here' className='input input-bordered input-md w-full' />
				<button type='submit' hidden onClick={e => e.preventDefault()}>
					Submit
				</button>
			</form>
		</div>
	);
};

const ChatLog = ({ messages, user }) => {
	const messageElements = messages?.map((msg, idx) => {
		const sender = msg.sender === user.email;
		return (
			<div key={idx} className={`${sender ? 'bg-green-100 self-end' : 'bg-blue-100 self-start'} w-fit min-w-[100px] p-3 rounded-lg m-1`}>
				{msg.text}
			</div>
		);
	});

	return <div className='grow flex flex-col pt-4 mx-5 overflow-x-scroll'>{messageElements}</div>;
};

export default Main;
