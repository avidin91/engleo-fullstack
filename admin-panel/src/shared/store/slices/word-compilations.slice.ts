import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from '@shared/api/axios-api';
import { message } from 'antd';
import { fetchGroups } from '@shared/store/slices/word-groups.slice';

interface IWordCompilation {
	id: number;
	title: string;
	titleInEnglish: string;
	description: string;
	slug: string;
	image: string;
}

interface IWordCompilationRequest extends Omit<IWordCompilation, 'id'> {}

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

export const createWordCompilation = createAsyncThunk(
	'compilations/createWordCompilation',
	async (data: IWordCompilationRequest, thunkAPI) => {
		try {
			const response = await instance.post('compilations', data);
			thunkAPI.dispatch(fetchWordCompilations());
			return response.data;
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

export const deleteCompilation = createAsyncThunk(
	'compilations/deleteCompilation',
	async (id: number, thunkAPI) => {
		try {
			const response = await instance.delete(`compilations/${id}`);
			message.success('Подборка успешно удалена');
			thunkAPI.dispatch(fetchWordCompilations());
			return response.data;
		} catch (e: any) {
			// TODO месседж не должен быть вне компонента
			message.error(e.response.data.message);
		}
	},
);

export const updateCompilation = createAsyncThunk(
	'compilations/updateCompilation',
	async (data: IWordCompilation, thunkAPI) => {
		try {
			await instance.put(`compilations/${data.id}`, data);
			message.success('Группа успешно обновлена');
			thunkAPI.dispatch(fetchWordCompilations());
		} catch (e: any) {
			// TODO месседж не должен быть вне компонента
			message.error(e.response.data.message);
		}
	},
);

const initialState: ICompilationState | null = {
	compilations: [],
	isLoading: false,
};

const wordCompilationsSlice = createSlice({
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
			});
	},
});

export default wordCompilationsSlice.reducer;
