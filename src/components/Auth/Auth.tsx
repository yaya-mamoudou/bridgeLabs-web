import Button from 'components/Button/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ children }: any) {
	const isAuthenticated = localStorage.getItem('bl-token') ? true : false;

	return isAuthenticated ? children : <NotAuthorized />;
}

const NotAuthorized = () => {
	const navigate = useNavigate();
	const login = () => {
		navigate('/login');
	};
	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				textAlign: 'center',
			}}
		>
			<h2>This section of the site requires authorization</h2>
			<h4>Login or Create an account to continue</h4>
			<Button
				width={200}
				label={'Login'}
				background='red'
				style={{ margin: '1rem 0' }}
				onClick={login}
			/>
		</div>
	);
};
