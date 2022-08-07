export const formatError = (error: any) => {
	const { status, data } = error;

	if (status === 400) {
		return { error: data };
	}

	if (status === 401) {
		return { message: data.detail };
	}
};
