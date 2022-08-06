import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

export default function Home() {
	const [showMenu, setShowMenu] = useState(false);
	const toggleMenu = () => setShowMenu(!showMenu);
	const [size, setSize] = useState<any>();

	useEffect(() => {
		window.addEventListener('resize', (e) => {
			e.target && setSize(window?.innerWidth);
		});
	}, []);

	return (
		<div className={`${styles.parent_container}`}>
			<div className={`${styles.hero}`}>
				<div className={`${styles.right_strong_color}`}></div>
				<div className={`container`}>
					<nav className={`${styles.nav}`}>
						<div className={`${styles.logo} logo`}>yaya-grill</div>

						<ul className={`d-flex list-none ${styles.links}`}>
							<i
								className={`fa-solid fa-bars fa-2x ${styles.menu}`}
								onClick={toggleMenu}
							></i>
							<div
								className={` ${size < 768 && !showMenu && 'd-none'} ${
									styles.links_parent
								}`}
							>
								<li className={`${styles.nav_element}`}>About</li>
								<li className={`${styles.nav_element}`}>Contacts</li>
								<li className={`${styles.nav_element}`}>Services</li>
								<Link to={'login'}>
									<li className={`${styles.nav_element} ${styles.login}`}>
										Login
									</li>
								</Link>
							</div>
						</ul>
					</nav>
					<div className={`d-flex ${styles.hero_box}`}>
						<div className={`${styles.text_section}`}>
							<h2 className={`${styles.demand_text}`}>DEMAND</h2>
							<h3 className={`${styles.title}`}>Discover Restaurant</h3>
							<h3 className={`${styles.title}`}>& Delicious Food</h3>

							<div className={`${styles.input_container}`}>
								{/* <input
									type='text'
									placeholder='Click to continue'
									className={`${styles.input}`}
									readOnly
								/> */}
								<span className={`${styles.input}`}>
									Click <i className='fa-solid fa-right-long'></i>
								</span>
								<button className={`${styles.button}`}>Get started</button>
							</div>
						</div>
						<div className={`${styles.image_section} `}>
							<img
								className={`${styles.hero_image}`}
								alt='food_image'
								src='assets/hero_plate.png'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
