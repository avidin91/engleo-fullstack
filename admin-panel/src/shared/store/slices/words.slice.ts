import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from '@shared/api/axios-api';
import { message } from 'antd';

interface IWord {
	id: number;
	word: string;
	translation: string;
	example: string;
	exampleTranslation: string;
	image: string;
}

interface IWordRequest extends Omit<IWord, 'id'> {}

interface IWordsState {
	words: IWord[];
	isLoading: boolean;
}

export const fetchWords = createAsyncThunk('words/fetchWords', async () => {
	try {
		const response = await instance.get('words');
		return response.data;
	} catch (e: any) {
		message.error(e.response.data.message);
	}
});

export const createWord = createAsyncThunk(
	'words/createWord',
	async (data: IWordRequest, thunkAPI) => {
		try {
			const response = await instance.post('words', data);
			thunkAPI.dispatch(fetchWords());
			return response.data;
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

export const deleteWord = createAsyncThunk('words/deleteWord', async (id: number, thunkAPI) => {
	try {
		const response = await instance.delete(`words/${id}`);
		message.success('Слово успешно удалено');
		thunkAPI.dispatch(fetchWords());
		return response.data;
	} catch (e: any) {
		// TODO месседж не должен быть вне компонента
		message.error(e.response.data.message);
	}
});

export const updateWord = createAsyncThunk('words/updateWord', async (data: IWord, thunkAPI) => {
	try {
		await instance.put(`words/${data.id}`, data);
		message.success('Слово успешно обновлено');
		thunkAPI.dispatch(fetchWords());
	} catch (e: any) {
		// TODO месседж не должен быть вне компонента
		message.error(e.response.data.message);
	}
});

const initialState: IWordsState | null = {
	words: [],
	isLoading: false,
};

const wordsSlice = createSlice({
	name: 'words',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWords.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchWords.fulfilled, (state, action) => {
				state.words = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchWords.rejected, (state, action) => {
				state.isLoading = false;
			});
	},
});

export default wordsSlice.reducer;
