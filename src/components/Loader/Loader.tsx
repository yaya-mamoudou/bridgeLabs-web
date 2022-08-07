import React from 'react';
import styles from './loader.module.css';
export default function Loader() {
	return (
		<div className={`${styles['lds-ellipsis']}`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
