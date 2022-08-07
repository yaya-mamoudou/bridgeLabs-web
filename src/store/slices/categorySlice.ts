import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HTTP_STATUS, http_status_types } from 'constants/httpStatus';
import { api } from 'helpers/api';
import { Category } from 'constants/types';
import { formatError } from 'helpers/formatError';

type State = {
	data: Category[] | [];
	state: http_status_types | string;
	error: string;
};

let initialState: State = { data: [], state: '', error: '' };

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Login states
		builder.addCase(_getCategories.pending, (state) => {
			state.state = HTTP_STATUS.PENDING;
		});

		builder.addCase(_getCategories.fulfilled, (state, { payload }) => {
			state.state = HTTP_STATUS.FULFLILLED;
			state.data = payload;
		});

		builder.addCase(_getCategories.rejected, (state, { payload }: any) => {
			state.state = HTTP_STATUS.REJECTED;
			state.error = payload;
		});

		// Register states
		builder.addCase(_createCategories.pending, (state) => {
			state.state = HTTP_STATUS.PENDING;
		});

		builder.addCase(_createCategories.fulfilled, (state, { payload }) => {
			state.state = HTTP_STATUS.FULFLILLED;
			state.data = [...state.data, payload];
		});
		builder.addCase(_createCategories.rejected, (state, { payload }: any) => {
			state.state = HTTP_STATUS.REJECTED;
			state.error = payload;
		});
	},
});

export const _getCategories = createAsyncThunk(
	`category/login`,
	async (payload, { rejectWithValue }) => {
		try {
			const { data } = await api.get('/category/categories');
			return data;
		} catch (error: any) {
			throw rejectWithValue(formatError(error.response));
		}
	}
);

export const _createCategories = createAsyncThunk(
	`category/register`,
	async (payload: any, { rejectWithValue }) => {
		try {
			const { data } = await api.post('/category/create', payload);
			return data;
		} catch (error: any) {
			throw rejectWithValue(formatError(error.response));
		}
	}
);

export default categorySlice.reducer;
