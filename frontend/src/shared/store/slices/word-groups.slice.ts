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
}

export const fetchAllGroups = createAsyncThunk('groups/fetchAllGroups', async () => {
	try {
		const response = await instance.get('groups');
		return response.data;
	} catch (e: any) {
		message.error(e.response.data.message);
	}
});

const initialState: IGroupState | null = {
	groups: [],
	isLoading: false,
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
			});
	},
});

export default wordGroupsSlice.reducer;
