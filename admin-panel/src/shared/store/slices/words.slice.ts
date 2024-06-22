import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from '@shared/api/axios-api';
import { message } from 'antd';
import { fetchGroupsCompilationsAssociations } from '@shared/store/slices/word-compilations.slice';

interface IWord {
	id: number;
	word: string;
	translation: string;
	example: string;
	exampleTranslation: string;
	image: string;
}

interface IWordRequest extends Omit<IWord, 'id'> {}

interface IWordCompilationAssociations {
	compilationId: number;
	wordId: number;
	compilationTitle: string;
	relationsId: number;
}

interface ICreateWordCompilationAssociation
	extends Pick<IWordCompilationAssociations, 'compilationId' | 'wordId'> {}

interface IWordsState {
	words: IWord[];
	wordCompilationAssociations: IWordCompilationAssociations[];
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

export const fetchWordsCompilationsAssociations = createAsyncThunk(
	'words/fetchWordsCompilationsAssociations',
	async () => {
		try {
			const response = await instance.get('words/compilations');
			return response.data;
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

export const createWordCompilationAssociation = createAsyncThunk(
	'words/createWordCompilationAssociation',
	async (data: ICreateWordCompilationAssociation, thunkAPI) => {
		try {
			await instance.post('words/compilations', data);
			thunkAPI.dispatch(fetchWordsCompilationsAssociations());
			message.success('Связь с подборкой успешно добавлена');
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

export const deleteWordCompilationAssociation = createAsyncThunk(
	'words/deleteWordCompilationAssociation',
	async (associationId: number, thunkAPI) => {
		try {
			await instance.delete(`words/compilations/${associationId}`);
			thunkAPI.dispatch(fetchWordsCompilationsAssociations());
			message.success('Связь с подборкой успешно удалена');
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

const initialState: IWordsState = {
	words: [],
	isLoading: false,
	wordCompilationAssociations: [],
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
			})
			.addCase(fetchWordsCompilationsAssociations.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchWordsCompilationsAssociations.fulfilled, (state, action) => {
				state.isLoading = false;
				state.wordCompilationAssociations = action.payload;
			});
	},
});

export default wordsSlice.reducer;
