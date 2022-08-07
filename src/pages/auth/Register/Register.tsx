import { Button, Loader, DisplayMessage } from 'components';
import { HTTP_STATUS } from 'constants/httpStatus';
import { setAuth } from 'helpers/api';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { _login, _register } from 'store/slices/authSlice';
import styles from './register.module.css';

export default function Register() {
	const { error, state, data } = useSelector(({ auth }: any) => auth);
	const navigate = useNavigate();

	console.log(data, state, error);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [first_name, setFirst_name] = useState('');
	const [phone, setPhone] = useState('');
	const [last_name, setLast_name] = useState('');

	const dispatch = useDispatch<any>();
	const [loading, setLoading] = useState<boolean>();

	const register = (e: any) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('first_name', first_name);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('phone', phone);
		formData.append('last_name', last_name);
		dispatch(_register(formData));
	};

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

	const handleChange = (key: string, value: any) => {
		switch (key) {
			case 'first_name':
				setFirst_name(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'phone':
				setPhone(value);
				break;
			case 'password':
				setPassword(value);
				break;
			case 'last_name':
				setLast_name(value);
				break;
		}
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

	return (
		<div className='d-flex justify-center items-center'>
			<div className={`container ${styles.container}`}>
				<div className={`${styles.right}`}>
					<h2 className='black logo'>Register</h2>

					{error && <DisplayMessage type='failed' error={error} />}

					<form style={{ marginTop: 'auto' }} onSubmit={register}>
						{/* <div className={`${styles.avatarContainer}`}>
							<div>
								<i className={`fa-solid fa-user fa-2x`}></i>
							</div>
							<label htmlFor='avatar' className={`${styles.addPic}`}>
								<input
									onChange={(e) => handleChange('avatar', e.target.files)}
									id='avatar'
									type='file'
									accept='image/*'
								/>
								<i className={`fa-solid fa-plus`}></i>
							</label>
						</div> */}

						<div className={`${styles.input}`}>
							<i className='fa-solid fa-user' style={{ marginRight: 10 }}></i>
							<input
								required
								onChange={(e) => handleChange('first_name', e.target.value)}
								autoComplete='off'
								type='text'
								placeholder='First name'
							/>
						</div>

						<div className={`${styles.input}`}>
							<i className='fa-solid fa-user' style={{ marginRight: 10 }}></i>
							<input
								required
								onChange={(e) => handleChange('last_name', e.target.value)}
								autoComplete='off'
								type='text'
								placeholder='Last name'
							/>
						</div>

						<div className={`${styles.input}`}>
							<i className='fa-solid fa-envelope' style={{ marginRight: 10 }}></i>
							<input
								required
								onChange={(e) => handleChange('email', e.target.value)}
								autoComplete='off'
								type='email'
								placeholder='Enter email'
							/>
						</div>

						<div className={`${styles.input}`}>
							<i className='fa-solid fa-phone' style={{ marginRight: 10 }}></i>
							<input
								required
								onChange={(e) => handleChange('phone', e.target.value)}
								autoComplete='off'
								type='number'
								placeholder='Phone number'
							/>
						</div>

						<div className={`${styles.input}`}>
							<i className='fa-solid fa-lock' style={{ marginRight: 10 }}></i>
							<input
								required
								onChange={(e) => handleChange('password', e.target.value)}
								autoComplete='off'
								type='password'
								placeholder='Enter password'
							/>
							<i className='fa-solid fa-eye-slash'></i>
						</div>

						<Button
							type='submit'
							width={'100%'}
							label={loading ? <Loader /> : 'Register'}
							background='red'
						/>
						<div className={`${styles.google} fs-sm `}>
							<img style={{ width: 23, marginRight: 10 }} src='assets/google.png' />
							Sign up with Google
						</div>
					</form>

					<p className={`${styles.no_password} fs-sm`}>
						Have an account?{' '}
						<a style={{ color: '#4285F4' }} href='/login'>
							login
						</a>
					</p>
				</div>
				<div className={`${styles.left}`}>
					<img
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
						src='assets/register_plate.jpg'
						alt='login_image'
					/>
				</div>
			</div>
		</div>
	);
}
