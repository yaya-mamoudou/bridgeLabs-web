import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HTTP_STATUS, http_status_types } from 'constants/httpStatus';
import { api } from 'helpers/api';
import { Category } from 'constants/types';
import { formatError } from 'helpers/formatError';

type State = {
	data: Category[] | [];
	state: http_status_types | string | null;
	error?: string | null;
};

let initialState: State = { data: [], state: '', error: '' };

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		resetState: (state) => {
			state.state = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		// get states
		builder.addCase(_getCategories.pending, (state) => {
			state.state = HTTP_STATUS.PENDING;
			state.error = null;
		});

		builder.addCase(_getCategories.fulfilled, (state, { payload }) => {
			state.state = HTTP_STATUS.FULFLILLED;
			state.data = payload;
			state.error = null;
		});

		builder.addCase(_getCategories.rejected, (state, { payload }: any) => {
			state.state = HTTP_STATUS.REJECTED;
			state.error = payload;
		});

		// create states
		builder.addCase(_createCategories.pending, (state) => {
			state.state = HTTP_STATUS.PENDING;
			state.error = null;
		});

		builder.addCase(_createCategories.fulfilled, (state, { payload }) => {
			state.state = HTTP_STATUS.FULFLILLED;
			state.data = [payload, ...state.data];
			state.error = null;
		});
		builder.addCase(_createCategories.rejected, (state, { payload }: any) => {
			state.state = HTTP_STATUS.REJECTED;
			state.error = payload;
		});

		// update states
		builder.addCase(_updateCategory.pending, (state) => {
			state.state = HTTP_STATUS.PENDING;
			state.error = null;
		});

		builder.addCase(_updateCategory.fulfilled, (state, { payload }) => {
			let selected = state.data.findIndex((i: any) => i == payload.id);
			let tempData = state.data;
			tempData[selected] = payload;

			console.log({ payload, tempData, selected });

			state.state = HTTP_STATUS.FULFLILLED;
			state.data = tempData;
			state.error = null;
		});
		builder.addCase(_updateCategory.rejected, (state, { payload }: any) => {
			state.state = HTTP_STATUS.REJECTED;
			state.error = payload;
		});

		// create states
		builder.addCase(_deleteCategory.pending, (state) => {
			state.state = HTTP_STATUS.PENDING;
			state.error = null;
		});

		builder.addCase(_deleteCategory.fulfilled, (state, { payload }) => {
			state.state = HTTP_STATUS.FULFLILLED;
			state.data = state.data.filter((d) => d.id !== payload);
			state.error = null;
		});
		builder.addCase(_deleteCategory.rejected, (state, { payload }: any) => {
			state.state = HTTP_STATUS.REJECTED;
			state.error = payload;
		});
	},
});

export const _getCategories = createAsyncThunk(
	`category/get`,
	async (payload, { rejectWithValue }) => {
		try {
			const { data } = await api.get('/category/categories');
			return data.reverse();
		} catch (error: any) {
			throw rejectWithValue(formatError(error.response));
		}
	}
);

export const _deleteCategory = createAsyncThunk(
	`category/delete`,
	async (payload: number | string, { rejectWithValue }) => {
		try {
			const { data } = await api.delete(`/category/delete/${payload}`);
			return payload;
		} catch (error: any) {
			throw rejectWithValue(formatError(error.response));
		}
	}
);

export const _updateCategory = createAsyncThunk(
	`category/update`,
	async (payload: any, { rejectWithValue }) => {
		try {
			const { data } = await api.put(`/category/update/${payload.id}`, payload.data);
			return data;
		} catch (error: any) {
			throw rejectWithValue(formatError(error.response));
		}
	}
);

export const _createCategories = createAsyncThunk(
	`category/create`,
	async (payload: any, { rejectWithValue }) => {
		try {
			const { data } = await api.post('/category/create', payload);
			return data;
		} catch (error: any) {
			throw rejectWithValue(formatError(error.response));
		}
	}
);

const resetCategoryState = categorySlice.actions.resetState;

export { resetCategoryState };

export default categorySlice.reducer;
