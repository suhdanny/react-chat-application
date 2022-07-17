import React, { useRef, useEffect } from 'react';

const ChatLog = ({ messages, user }) => {
	const bottom = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			bottom.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}, 100);
	}, [messages]);

	const messageElements = messages?.map((msg, idx) => {
		const sender = msg.sender === user.email;
		return (
			<div key={idx} className={`${sender ? 'bg-green-100 self-end' : 'bg-blue-100 self-start'} w-fit min-w-[100px] p-3 rounded-lg m-1`}>
				{msg.text}
			</div>
		);
	});

	return (
		<div className='h-[80vh] flex flex-col overflow-scroll p-8'>
			{messageElements}
			<div ref={bottom}></div>
		</div>
	);
};

export default ChatLog;
