import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from '@shared/api/axios-api';
import { message } from 'antd';

interface IGetWordsParams {
	pagination: {
		pageSize: number;
		current: number;
	};
}

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
	currentPage: number;
	totalWords: number;
	wordCompilationAssociations: IWordCompilationAssociations[];
	isLoading: boolean;
}

export const fetchWords = createAsyncThunk('words/fetchWords', async (data: IGetWordsParams) => {
	try {
		const response = await instance.post('words', data);
		return response.data;
	} catch (e: any) {
		message.error(e.response.data.message);
	}
});

export const createWord = createAsyncThunk('words/createWord', async (data: IWordRequest) => {
	try {
		const response = await instance.post('words/new', data);
		return response.data;
	} catch (e: any) {
		message.error(e.response.data.message);
	}
});

export const deleteWord = createAsyncThunk('words/deleteWord', async (id: number) => {
	try {
		const response = await instance.delete(`words/${id}`);
		message.success('Слово успешно удалено');
		return response.data;
	} catch (e: any) {
		// TODO месседж не должен быть вне компонента
		message.error(e.response.data.message);
	}
});

export const updateWord = createAsyncThunk('words/updateWord', async (data: IWord) => {
	try {
		await instance.put(`words/${data.id}`, data);
		message.success('Слово успешно обновлено');
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
	currentPage: 1,
	totalWords: 0,
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
				state.words = action.payload.words;
				state.currentPage = action.payload.current;
				state.totalWords = action.payload.total;
				state.isLoading = false;
			})
			.addCase(fetchWords.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(fetchWordsCompilationsAssociations.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchWordsCompilationsAssociations.fulfilled, (state, action) => {
				state.isLoading = false;
				state.wordCompilationAssociations = action.payload;
			});
	},
});

export default wordsSlice.reducer;
