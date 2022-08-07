import React from 'react';
import styles from './dashboard.module.css';

export default function Dashboard() {
	const { name, avatar, last_name } = JSON.parse(localStorage.getItem('user') || '{}');
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
					<div className='d-flex justify-between'>
						<div className={`${styles.card} ${styles.addCard}`}>
							<i className='fa-solid fa-plus fa-2x'></i>
							<h3>Add Category</h3>
						</div>
						<div className={`${styles.card} ${styles.otherCards}`}>
							<h1>0</h1>
							<h3>Number of Categories</h3>
						</div>
						<div className={`${styles.card} ${styles.otherCards}`}>
							<h1>0</h1>
							<h3>Number of Views</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
