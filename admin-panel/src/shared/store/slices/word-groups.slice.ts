import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from '@shared/api/axios-api';
import { message } from 'antd';

interface IGetGroupsParams {
	pagination: {
		pageSize: number;
		current: number;
	};
}

interface IGroup {
	id: number;
	title: string;
	slug: string;
}

interface IGroupState {
	groups: IGroup[];
	currentPage: number;
	totalWords: number;
	isLoading: boolean;
	isGroupCreating: boolean;
	isGroupDeleting: boolean;
}

export const fetchGroups = createAsyncThunk(
	'groups/fetchGroups',
	async (data: IGetGroupsParams) => {
		try {
			const response = await instance.post('groups', data);
			return response.data;
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	},
);

export const fetchAllGroups = createAsyncThunk('groups/fetchAllGroups', async () => {
	try {
		const response = await instance.get('groups');
		return response.data;
	} catch (e: any) {
		message.error(e.response.data.message);
	}
});

export const createGroup = createAsyncThunk(
	'groups/createGroup',
	async (data: { title: string; slug: string }) => {
		try {
			await instance.post('groups/new', data);
			message.success('Группа успешно создана');
		} catch (e: any) {
			// TODO месседж не должен быть вне компонента
			message.error(e.response.data.message);
		}
	},
);

export const deleteGroup = createAsyncThunk('groups/deleteGroup', async (id: number) => {
	try {
		const response = await instance.delete(`groups/${id}`);
		message.success('Группа успешно удалена');
		return response.data;
	} catch (e: any) {
		// TODO месседж не должен быть вне компонента
		message.error(e.response.data.message);
	}
});

export const updateGroup = createAsyncThunk(
	'groups/updateGroup',
	async (data: { id: number; title: string; slug: string }) => {
		try {
			await instance.put(`groups/${data.id}`, {
				title: data.title,
				slug: data.slug,
			});
			message.success('Группа успешно обновлена');
		} catch (e: any) {
			// TODO месседж не должен быть вне компонента
			message.error(e.response.data.message);
		}
	},
);

const initialState: IGroupState | null = {
	groups: [],
	currentPage: 1,
	totalWords: 0,
	isLoading: false,
	isGroupCreating: false,
	isGroupDeleting: false,
};

const wordGroupsSlice = createSlice({
	name: 'groups',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllGroups.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllGroups.fulfilled, (state, action: PayloadAction<IGroup[]>) => {
				state.groups = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchAllGroups.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(fetchGroups.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchGroups.fulfilled, (state, action) => {
				state.groups = action.payload.groups;
				state.currentPage = action.payload.current;
				state.totalWords = action.payload.total;
				state.isLoading = false;
			})
			.addCase(fetchGroups.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(createGroup.pending, (state) => {
				state.isGroupCreating = true;
			})
			.addCase(createGroup.fulfilled, (state) => {
				state.isGroupCreating = false;
			})
			.addCase(createGroup.rejected, (state) => {
				state.isGroupCreating = false;
			})
			.addCase(deleteGroup.pending, (state) => {
				state.isGroupDeleting = true;
			})
			.addCase(deleteGroup.fulfilled, (state) => {
				state.isGroupDeleting = false;
			})
			.addCase(deleteGroup.rejected, (state) => {
				state.isGroupDeleting = false;
			});
	},
});

export default wordGroupsSlice.reducer;
