import { Button, Loader, DisplayMessage } from 'components';
import { HTTP_STATUS } from 'constants/httpStatus';
import { setAuth } from 'helpers/api';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { _login, _register } from 'store/slices/authSlice';
import styles from './login.module.css';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
export default function Login() {
	const { error, state } = useSelector(({ auth }: any) => auth);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch<any>();
	const [loading, setLoading] = useState<boolean>();
	const [usingGoogleAuth, setUsingGoogleAuth] = useState(false);

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

	const login = async (e: any) => {
		e.preventDefault();
		try {
			const formData = { email, password };
			dispatch(_login(formData)).then((d: any) => {
				const { error, payload } = d;

				if (!error) {
					const { email, name, last_name, phone, avatar, id, token } = payload;
					localStorage.setItem('bl-token', token);
					localStorage.setItem(
						'user',
						JSON.stringify({ email, name, last_name, phone, avatar, id })
					);
					setAuth(token).then((d) => navigate('/dashboard', { replace: true }));
				}
			});
		} catch (error) {}
	};

	const handleGoogleAuthSuccess = async (e: CredentialResponse) => {
		setUsingGoogleAuth(true);
		let user = jwtDecode(`${e.credential}`);
		let { email, given_name, family_name, picture, sub }: any = user;
		console.log(user);

		const login_res = await dispatch(_login({ email, password: sub }));
		const { error, payload } = login_res;

		if (!error) {
			auth(payload, navigate);
			return;
		}

		const formData = new FormData();
		formData.append('first_name', given_name);
		formData.append('email', email);
		formData.append('password', sub);
		formData.append('last_name', family_name);
		formData.append('phone', '');
		formData.append('avatar', picture);

		const register_res = await dispatch(_register(formData));
		!register_res.error && auth(register_res.payload, navigate);
		setUsingGoogleAuth(false);
		return;
	};

	const auth = (data: any, navigate: Function) => {
		const { email, name, last_name, phone, avatar, id, token } = data;

		localStorage.setItem('bl-token', token);
		localStorage.setItem('user', JSON.stringify({ email, name, last_name, phone, avatar, id }));
		setAuth(token).then((d) => navigate('/dashboard', { replace: true }));
	};

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

					{error && !usingGoogleAuth && <DisplayMessage type='failed' error={error} />}

					<form style={{ marginTop: 20 }} onSubmit={login}>
						<div className={`${styles.input}`}>
							<i className='fa-solid fa-envelope' style={{ marginRight: 10 }}></i>
							<input
								onChange={(e) => setEmail(e.target.value)}
								autoComplete='false'
								required
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
								required
							/>
							<i className='fa-solid fa-eye-slash'></i>
						</div>

						<Button
							type='submit'
							width={'100%'}
							label={loading ? <Loader /> : 'Login'}
							background='red'
						/>
						<GoogleLogin useOneTap shape='pill' onSuccess={handleGoogleAuthSuccess} />
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
