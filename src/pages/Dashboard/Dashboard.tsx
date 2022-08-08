import { Button, DisplayMessage, Loader } from 'components';
import { HTTP_STATUS } from 'constants/httpStatus';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetCategoryState,
	_createCategories,
	_deleteCategory,
	_getCategories,
	_updateCategory,
} from 'store/slices/categorySlice';
import styles from './dashboard.module.css';

export default function Dashboard() {
	const { name, avatar, last_name } = JSON.parse(localStorage.getItem('user') || '{}');
	const { data, error, state } = useSelector(({ categories }: any) => categories);
	const [item, setItem] = useState<any>();
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch<any>();

	useEffect(() => {
		dispatch(_getCategories());
	}, []);

	const updateItem = (cat: any) => {
		setItem(cat);
		setOpen(true);
	};

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.sidenav}`}>
				<img style={{ width: '100%', position: 'absolute' }} src='assets/curve.svg' />
				<i className={`fa-solid fa-utensils ${styles.sideLinks}`}></i>
				<i className={`fa-solid fa-folder ${styles.sideLinks}`}></i>
				<i className={`fa-solid fa-champagne-glasses ${styles.sideLinks}`}></i>
				<i className={`fa-solid fa-plate-wheat ${styles.sideLinks}`}></i>
			</div>
			<div className={`${styles.rightSide}`}>
				<div className={`${styles.navbar}`}>
					<span className={`logo ${styles.logo}`}>yaya-grill</span>
					<ul className='list-none d-flex items-center'>
						<li style={{ textTransform: 'uppercase' }}>{`${name} ${last_name}`}</li>
						<li>
							<img
								style={{
									width: 40,
									height: 40,
									borderRadius: '50%',
									objectFit: 'cover',
									marginLeft: 30,
								}}
								src={avatar || 'assets/avatar.jpg'}
								alt='avatar'
							/>
						</li>
					</ul>
				</div>

				<div className={`${styles.body}`}>
					<h2 className='black'>Metrics</h2>
					<div className='d-flex justify-between' style={{ marginTop: 10 }}>
						<div
							onClick={() => setOpen(true)}
							className={`${styles.card} ${styles.addCard}`}
						>
							<i className='fa-solid fa-plus fa-2x'></i>
							<h3>Add Category</h3>
						</div>
						<div className={`${styles.card} ${styles.otherCards}`}>
							<h1>{data.length}</h1>
							<h3>Number of Categories</h3>
						</div>
						<div className={`${styles.card} ${styles.otherCards}`}>
							<h1>101</h1>
							<h3>Number of Views</h3>
						</div>
					</div>

					<h2 style={{ marginTop: 50, marginBottom: 10 }} className='black'>
						Metrics
					</h2>
					<div className={`${styles.catParents}`}>
						{data?.map((cat: any, index: string) => (
							<Category updateItem={updateItem} cat={cat} />
						))}
					</div>
				</div>
			</div>
			{open && <Modal clearItem={() => setItem(null)} setOpen={setOpen} item={item} />}
		</div>
	);
}

const Category = ({ cat, updateItem }: any) => {
	const dispatch = useDispatch<any>();
	const [loading, setLoading] = useState<number | string>(-1);

	const deleteCat = (id: string | number) => {
		setLoading(id);
		dispatch(_deleteCategory(id));
	};
	return (
		<div className={`${styles.category} shadow`}>
			{cat?.image ? (
				<div style={{ height: 200, background: '#eee', width: '100%' }}>
					<img alt={cat.name} style={{ height: '100%', width: '100%' }} src={cat.image} />
				</div>
			) : (
				<div style={{ height: 200, background: '#eee', width: '100%' }}></div>
			)}
			<div style={{ padding: '1rem', display: 'flex' }}>
				<div>
					<p className='black fs-md'>{cat.name}</p>
					<p className='fs-sm'>{cat.description}</p>
				</div>
				<div
					style={{
						marginLeft: 'auto',
						display: 'flex',
						flexDirection: 'column',
						gap: 10,
					}}
				>
					<div
						onClick={() => deleteCat(cat?.id)}
						className='hover-red'
						style={{ width: 'max-content', marginLeft: 10 }}
					>
						{loading === cat?.id ? (
							<Loader color='red' />
						) : (
							<>
								<i className='fa-solid fa-trash black'></i> <span>Delete</span>
							</>
						)}
					</div>
					<div
						onClick={() => updateItem(cat)}
						className='hover-blue'
						style={{ width: 'max-content', marginLeft: 10 }}
					>
						<i className='fa-solid fa-square-pen black'></i> <span>Edit</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const Modal = ({ setOpen, item, clearItem }: any) => {
	const { data, error, state } = useSelector(({ categories }: any) => categories);
	const dispatch = useDispatch<any>();
	const [preview, setPreview] = useState<any>(item?.image || '');
	const [image, setImage] = useState<any>();
	const [name, setName] = useState(item?.name || '');
	const [description, setDescription] = useState(item?.description || '');
	const [message, setMessage] = useState<any>('');

	useEffect(() => {
		dispatch(resetCategoryState());
		setMessage('');
	}, []);

	useEffect(() => {
		if (state === HTTP_STATUS.FULFLILLED && message.length > 0) {
			dispatch(resetCategoryState());
			setTimeout(() => setMessage(''), 5000);
		}
	}, [image, name, description]);

	useEffect(() => {
		if (image) {
			// create the preview
			const objectUrl = URL.createObjectURL(image);
			setPreview(objectUrl);
			// free memory when ever this component is unmounted
			return () => URL.revokeObjectURL(objectUrl);
		}
	}, [image]);

	const selectImage = (e: any) => {
		setImage(e[0]);
	};

	const submit = async (e: any) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		if (image) {
			formData.append('image', image);
		}

		let res;
		if (!item) {
			res = await dispatch(_createCategories(formData));
		}
		if (item) {
			res = await dispatch(_updateCategory({ id: item.id, data: formData }));
		}

		if (!res?.error) {
			setMessage(item ? 'Category updated' : 'Category created');
			setImage('');
			setName('');
			setDescription('');
			setPreview('');
			if (item) {
				clearItem();
			}
		}
	};

	return (
		<div className={`${styles.modal}`}>
			<div className={`${styles.modalContainer}`}>
				<i onClick={() => setOpen(false)} className='fa-solid fa-xmark fa-2x hover'></i>
				{error && <DisplayMessage type='failed' error={error} />}
				{message.length > 0 && <DisplayMessage type='success' message={message} />}
				<div className={`${styles.imageContainer} hover`}>
					{preview && (
						<img
							alt='preview'
							style={{
								height: '100%',
								width: '100%',
								objectFit: 'cover',
							}}
							src={preview}
						/>
					)}
					<div className={`${styles.imageAdd}`}>
						<label htmlFor='image'>+</label>
						<input
							required
							onChange={(e) => selectImage(e.target.files)}
							type='file'
							name=''
							id='image'
						/>
					</div>
				</div>
				<h4 style={{ textAlign: 'center', marginTop: 15 }}>Add image</h4>

				<div style={{ width: '70%', margin: 'auto', marginTop: 40 }}>
					<form onSubmit={submit}>
						<div
							style={{
								border: 'solid 1px #ccc',
								padding: '0.7rem 1rem',
								borderRadius: 5,
								margin: '10px 0',
							}}
						>
							<input
								autoFocus
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								type='text'
								placeholder='Enter name'
							/>
						</div>
						<div
							style={{
								border: 'solid 1px #ccc',
								padding: '0.7rem 1rem',
								borderRadius: 5,
								margin: '10px 0',
							}}
						>
							<input
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
								type='text'
								placeholder='Enter description'
							/>
						</div>
						<Button
							type='submit'
							label={state === HTTP_STATUS.PENDING ? <Loader /> : 'Add category'}
							background='red'
							width={'100%'}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};
