import React from 'react';
import { db } from '../../configs/firebase';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getOtherEmail } from '../../utils/getOtherEmail';
import ChatLog from './ChatLog';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

const Main = () => {
	const { chatId } = useParams();
	const { user } = useAuth();

	const ref = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp'));
	const [messages] = useCollectionData(ref);
	const [chat] = useDocumentData(doc(db, 'chats', chatId));

	return (
		<div className='flex flex-col h-screen grow dark:bg-zinc-800'>
			<TopBar email={getOtherEmail(chat?.users, user)} />
			<ChatLog messages={messages} user={user} />
			<BottomBar id={chatId} user={user} />
		</div>
	);
};

export default Main;
