import { Button, Loader, DisplayMessage } from 'components';
import { HTTP_STATUS } from 'constants/httpStatus';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { _login } from 'store/slices/authSlice';
import styles from './login.module.css';

export default function Login() {
	const { error, state } = useSelector(({ auth }: any) => auth);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch<any>();
	const [loading, setLoading] = useState<boolean>();

	const login = () => {
		const data = { email, password };
		dispatch(_login(data));
	};

	useEffect(() => {
		if (state === HTTP_STATUS.REJECTED) {
			setLoading(false);
		}
		if (state === HTTP_STATUS.PENDING) {
			setLoading(true);
		}
		if (state === HTTP_STATUS.FULFLILLED) {
			alert('Logged in');
		}
	}, [state]);

	return (
		<div className='d-flex justify-center items-center'>
			<div className={`container ${styles.container}`}>
				<div className={`${styles.left}`}>
					<img style={{ width: '80%' }} src='assets/login_plate.png' alt='' />
				</div>
				<div className={`${styles.right}`}>
					<h2>Login</h2>
					<p className='fs-sm'>
						Welcome back! Login with your information entered during registration
					</p>
					<div className={`${styles.google} fs-sm `}>
						<img style={{ width: 23, marginRight: 10 }} src='assets/google.png' />
						Login with Google
					</div>
					{error && <DisplayMessage type='failed' error={error} />}

					<div className={`${styles.input}`}>
						<i className='fa-solid fa-envelope' style={{ marginRight: 10 }}></i>
						<input
							onChange={(e) => setEmail(e.target.value)}
							autoComplete='false'
							type='text'
							placeholder='Enter email'
						/>
					</div>

					<div className={`${styles.input}`}>
						<i className='fa-solid fa-lock' style={{ marginRight: 10 }}></i>
						<input
							onChange={(e) => setPassword(e.target.value)}
							autoComplete='false'
							type='password'
							placeholder='Enter password'
						/>
						<i className='fa-solid fa-eye-slash'></i>
					</div>

					<Button
						onClick={login}
						width={'100%'}
						label={loading ? <Loader /> : 'Login'}
						background='red'
					/>

					<p className={`${styles.no_password} fs-sm`}>
						Don't have an account?{' '}
						<a style={{ color: '#4285F4' }} href='/register'>
							register
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
