export default function DisplayMessage({ type, message, error }: Props) {
	return (
		<div style={stateStyle(type)}>
			{error?.message && (
				<p className='fs-sm' style={{ color: colorPick(type) }}>
					{error?.message}
				</p>
			)}

			{error?.error &&
				Object.keys(error.error).map((key, index) => (
					<p className='fs-sm' style={{ color: colorPick(type) }} key={index}>
						- {key}: {error.error[key]}
					</p>
				))}

			{message && (
				<p className='fs-sm' style={{ color: colorPick(type) }}>
					{message}
				</p>
			)}
		</div>
	);
}

type Type = 'success' | 'failed';
type Props = {
	type: Type;
	message?: string;
	error?: any;
};

const colorPick = (type: Type) => {
	return type === 'failed' ? 'rgba(253, 4, 60)' : 'rgba(4, 94, 20)';
};

const stateStyle = (type: string) => {
	const colorSuccess = 'rgba(4, 94, 20)';
	const colorFailed = 'rgba(253, 4, 60)';

	const bgFailed = 'rgba(253, 4, 60,0.2)';
	const bgSuccess = 'rgba(4, 94, 20,0.2)';

	return {
		background: type === 'failed' ? bgFailed : bgSuccess,
		padding: '10px 15px',
		border: type === 'failed' ? colorFailed : colorSuccess,
		borderRadius: 8,
		color: type === 'failed' ? colorFailed : colorSuccess,
		marginTop: 'auto',
	};
};
