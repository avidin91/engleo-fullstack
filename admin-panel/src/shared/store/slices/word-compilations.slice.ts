import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from '@shared/api/axios-api';
import { message } from 'antd';

interface IWordCompilation {
	id: number;
	title: string;
	titleInEnglish: string;
	description: string;
	slug: string;
	image: string;
}

interface ICompilationState {
	compilations: IWordCompilation[];
	isLoading: boolean;
}

export const fetchWordCompilations = createAsyncThunk(
	'compilations/fetchWordCompilations',
	async () => {
		try {
			const response = await instance.get('compilations');
			return response.data;
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

const initialState: ICompilationState | null = {
	compilations: [],
	isLoading: false,
};

const wordGroupsSlice = createSlice({
	name: 'compilations',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWordCompilations.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchWordCompilations.fulfilled, (state, action) => {
				state.compilations = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchWordCompilations.rejected, (state, action) => {
				state.isLoading = false;
				message.error(action.error.message || 'Failed to fetch com');
			});
	},
});

export default wordGroupsSlice.reducer;
