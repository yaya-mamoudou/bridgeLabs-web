import { Button, Loader, DisplayMessage } from 'components';
import { HTTP_STATUS } from 'constants/httpStatus';
import { setAuth } from 'helpers/api';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { _login } from 'store/slices/authSlice';
import styles from './login.module.css';

export default function Login() {
	const { error, state, data } = useSelector(({ auth }: any) => auth);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch<any>();
	const [loading, setLoading] = useState<boolean>();

	const login = (e: any) => {
		e.preventDefault();
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
			setLoading(false);
		}
	}, [state]);

	useEffect(() => {
		if (data) {
			const { email, name, last_name, phone, avatar, id } = data;
			localStorage.setItem('bl-token', data?.token);
			localStorage.setItem(
				'user',
				JSON.stringify({ email, name, last_name, phone, avatar, id })
			);
			setAuth(data.token).then((d) => navigate('/dashboard', { replace: true }));
		}
	}, [data]);

	return (
		<div className='d-flex justify-center items-center'>
			<div className={`container ${styles.container}`}>
				<div className={`${styles.left}`}>
					<img
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
						src='assets/login_plate.jpg'
						alt='login_image'
					/>
				</div>
				<div className={`${styles.right}`}>
					<h2 className='black logo'>Login</h2>
					<p className='fs-sm'>
						Welcome back! Login with your information entered during registration
					</p>

					{error && <DisplayMessage type='failed' error={error} />}

					<form style={{ marginTop: error ? 10 : 60 }} onSubmit={login}>
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
							type='submit'
							width={'100%'}
							label={loading ? <Loader /> : 'Login'}
							background='red'
						/>
						<div className={`${styles.google} fs-sm `}>
							<img style={{ width: 23, marginRight: 10 }} src='assets/google.png' />
							Login with Google
						</div>
					</form>

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
