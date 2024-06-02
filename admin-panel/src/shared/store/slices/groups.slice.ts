import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from '@shared/api/axios-api';
import { message } from 'antd';

interface IGroup {
	id: number;
	title: string;
	slug: string;
}

interface IGroupState {
	groups: IGroup[];
	isLoading: boolean;
	isGroupCreating: boolean;
	isGroupDeleting: boolean;
}

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
	const response = await instance.get('groups');
	return response.data;
});

export const createGroup = createAsyncThunk(
	'groups/createGroup',
	async (data: { title: string; slug: string }, thunkAPI) => {
		try {
			await instance.post('groups', data);
			message.success('Группа успешно создана');
			thunkAPI.dispatch(fetchGroups());
		} catch (e: any) {
			// TODO месседж не должен быть вне компонента
			message.error(e.response.data.message);
		}
	},
);

export const deleteGroup = createAsyncThunk('groups/deleteGroup', async (id: number, thunkAPI) => {
	try {
		const response = await instance.delete(`groups/${id}`);
		message.success('Группа успешно удалена');
		thunkAPI.dispatch(fetchGroups());
		return response.data;
	} catch (e: any) {
		// TODO месседж не должен быть вне компонента
		message.error(e.response.data.message);
	}
});

export const updateGroup = createAsyncThunk(
	'groups/updateGroup',
	async (data: { id: number; title: string; slug: string }, thunkAPI) => {
		try {
			await instance.put(`groups/${data.id}`, {
				title: data.title,
				slug: data.slug,
			});
			message.success('Группа успешно обновлена');
			thunkAPI.dispatch(fetchGroups());
		} catch (e: any) {
			// TODO месседж не должен быть вне компонента
			message.error(e.response.data.message);
		}
	},
);

const initialState: IGroupState | null = {
	groups: [],
	isLoading: false,
	isGroupCreating: false,
	isGroupDeleting: false,
};

const groupsSlice = createSlice({
	name: 'groups',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGroups.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchGroups.fulfilled, (state, action: PayloadAction<IGroup[]>) => {
				state.groups = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchGroups.rejected, (state, action) => {
				state.isLoading = false;
				message.error(action.error.message || 'Failed to fetch groups');
			})
			.addCase(createGroup.pending, (state) => {
				state.isGroupCreating = true;
			})
			.addCase(createGroup.fulfilled, (state, action) => {
				state.isGroupCreating = false;
			})
			.addCase(createGroup.rejected, (state, action) => {
				state.isGroupCreating = false;
			})
			.addCase(deleteGroup.pending, (state) => {
				state.isGroupDeleting = true;
			})
			.addCase(deleteGroup.fulfilled, (state, action) => {
				state.isGroupDeleting = false;
			})
			.addCase(deleteGroup.rejected, (state, action) => {
				state.isGroupDeleting = false;
			});
	},
});

export default groupsSlice.reducer;
