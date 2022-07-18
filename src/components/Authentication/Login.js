import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../../configs/firebase';

const Login = () => {
	return (
		<div className='min-h-screen flex justify-center items-center bg-gray-800'>
			<div className='rounded-3xl text-center max-w-md py-9 px-16 border bg-white flex flex-col gap-7'>
				<h2 className='font-bold text-2xl text-blue-700'>Welcome to Messenger!</h2>
				<div className='btn cursor-pointer' onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}>
					<GoogleOutlined className='mr-2' /> Sign in with Google
				</div>
				<div className='btn cursor-pointer' onClick={() => signInWithRedirect(auth, new FacebookAuthProvider())}>
					<FacebookOutlined className='mr-2' /> Sign in with Facebook
				</div>
			</div>
		</div>
	);
};

export default Login;
