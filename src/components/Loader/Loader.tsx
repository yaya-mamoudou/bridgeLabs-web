import React from 'react';
import styles from './loader.module.css';
const colorSelect = (key: string | undefined) => {
	switch (key) {
		case 'blue':
			return '#342B5A';

		case 'red':
			return '#FD043C';

		case 'cream':
			return '#FFF5EC';

		case 'white':
			return '#fff';
		case 'gray':
			return '#ABA49C';
	}
};
type Color = 'red' | 'white';
// | 'cream' | 'gray' | 'blue';

type Props = {
	color?: Color | undefined;
};

export default function Loader({ color = 'white' }: Props) {
	return (
		<div
			className={`${styles[color === 'white' ? 'lds-ellipsis' : 'lds-ellipsis-red']}`}
			style={{ backgroundColor: colorSelect(color) }}
		>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
