import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from '@shared/api/axios-api';
import { message } from 'antd';

interface IGroup {
	id: number;
	title: string;
}

interface IWordCompilation {
	id: number;
	title: string;
	titleInEnglish: string;
	description: string;
	slug: string;
	image: string;
}

interface IGroupsCompilationsAssociations {
	compilationId: number;
	groupId: number;
	groupTitle: string;
	relationsId: number;
}

interface ICreateCroupCompilationAssociation
	extends Pick<IGroupsCompilationsAssociations, 'compilationId' | 'groupId'> {}

interface IWordCompilationRequest extends Omit<IWordCompilation, 'id'> {}

interface ICompilationState {
	compilations: IWordCompilation[];
	groups: IGroup[];
	groupsCompilationsAssociations: IGroupsCompilationsAssociations[];
	isLoading: boolean;
}

export const fetchWordCompilations = createAsyncThunk(
	'compilations/fetchWordCompilations',
	async () => {
		try {
			const responseCompilations = await instance.get('compilations');
			return responseCompilations.data;
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

export const fetchWordGroups = createAsyncThunk('compilations/fetchWordGroups', async () => {
	try {
		const response = await instance.get('groups');
		return response.data.map((group: any) => ({ id: group.id, title: group.title }));
	} catch (e: any) {
		message.error(e.response.data.message);
	}
});

export const createWordCompilation = createAsyncThunk(
	'compilations/createWordCompilation',
	async (data: IWordCompilationRequest, thunkAPI) => {
		try {
			const response = await instance.post('compilations', data);
			thunkAPI.dispatch(fetchWordCompilations());
			return response.data;
		} catch (e: any) {
			console.log('тут = ', e.response.data.message);
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

export const fetchGroupsCompilationsAssociations = createAsyncThunk(
	'compilations/fetchWordCompilationsGroups',
	async () => {
		try {
			const response = await instance.get('compilations/groups');
			return response.data;
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

export const createGroupCompilationAssociation = createAsyncThunk(
	'compilations/createGroupCompilationAssociation',
	async (data: ICreateCroupCompilationAssociation, thunkAPI) => {
		try {
			await instance.post('compilations/groups', data);
			thunkAPI.dispatch(fetchGroupsCompilationsAssociations());
			message.success('Связь с группой успешно добавлена');
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

export const deleteGroupCompilationAssociation = createAsyncThunk(
	'compilations/deleteGroupCompilationAssociation',
	async (associationId: number, thunkAPI) => {
		try {
			await instance.delete(`compilations/groups/${associationId}`);
			thunkAPI.dispatch(fetchGroupsCompilationsAssociations());
			message.success('Связь с группой успешно удалена');
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

const initialState: ICompilationState = {
	compilations: [],
	isLoading: false,
	groups: [],
	groupsCompilationsAssociations: [],
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
			.addCase(fetchWordCompilations.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(fetchWordGroups.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchWordGroups.fulfilled, (state, action) => {
				state.groups = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchWordGroups.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(fetchGroupsCompilationsAssociations.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchGroupsCompilationsAssociations.fulfilled, (state, action) => {
				state.isLoading = false;
				state.groupsCompilationsAssociations = action.payload;
			})
			.addCase(deleteGroupCompilationAssociation.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGroupCompilationAssociation.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(createGroupCompilationAssociation.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGroupCompilationAssociation.fulfilled, (state) => {
				state.isLoading = false;
			});
	},
});

export default wordCompilationsSlice.reducer;
