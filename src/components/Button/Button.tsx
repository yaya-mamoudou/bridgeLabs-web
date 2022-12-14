import React from 'react';
import styles from './button.module.css';

export default function Button(props: button) {
	const {
		color,
		background,
		borderColor,
		onClick,
		label,
		borderWidth,
		type = 'button',
		width,
		style = {},
		className,
	} = props;

	const finalColor = typeof color == 'string' ? colorSelect(color) : '#fff';
	const finalBackground = typeof background == 'string' ? colorSelect(background) : '#ccc';
	const finalBorderColor = typeof borderColor == 'string' ? colorSelect(borderColor) : 'none';
	const finalBorderWidth = borderWidth ? borderWidth : 0;

	return (
		<button
			className={`${styles.button} ${className}`}
			onClick={onClick ? onClick : () => {}}
			type={type}
			style={{
				background: finalBackground,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				color: finalColor,
				borderColor: finalBorderColor,
				borderWidth: finalBorderWidth,
				height: 43,
				borderRadius: 5,
				fontSize: '1.1rem',
				...(width && { width: width }),
				...style,
			}}
		>
			{label}
		</button>
	);
}

type Color = 'blue' | 'red' | 'white' | 'cream' | 'gray';

type button = {
	color?: Color;
	background?: Color;
	borderColor?: Color;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	label: string | any;
	borderWidth?: string;
	type?: 'button' | 'reset' | 'submit';
	width?: string | number;
	style?: React.CSSProperties;
	className?: string;
};

const colorSelect = (key: string) => {
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
