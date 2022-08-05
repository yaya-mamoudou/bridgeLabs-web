import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HTTP_STATUS, http_status_types } from 'constants/httpStatus';
import { api } from 'helpers/api';
import { User } from 'constants/types';

type State = {
	data: User | null;
	state: http_status_types | string;
	message: string;
};

let initialState: State = { data: null, state: '', message: '' };
let errorMessage: string;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(_login.pending, (state) => {
			state.state = HTTP_STATUS.PENDING;
		});
		builder.addCase(_login.fulfilled, (state, { payload }) => {
			state.state = HTTP_STATUS.FULFLILLED;
			state.data = payload;
		});
		builder.addCase(_login.rejected, (state) => {
			state.state = HTTP_STATUS.REJECTED;
			state.message = errorMessage;
		});
		builder.addCase(_register.pending, (state) => {
			state.state = HTTP_STATUS.PENDING;
		});
		builder.addCase(_register.fulfilled, (state, { payload }) => {
			state.state = HTTP_STATUS.FULFLILLED;
			state.data = payload;
		});
		builder.addCase(_register.rejected, (state) => {
			state.state = HTTP_STATUS.REJECTED;
			state.message = errorMessage;
		});
	},
});

export const _login = createAsyncThunk(`auth/login`, async (payload) => {
	const { data } = await api.post('/user/login', payload);
	return data;
});

export const _register = createAsyncThunk(`auth/register`, async (payload) => {
	const { data } = await api.post('/user/register', payload);
	console.log(data);
	return data;
});

export default authSlice.reducer;
