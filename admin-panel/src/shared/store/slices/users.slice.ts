import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '@shared/api/axios-api';
import { message } from 'antd';

interface IUser {
	id: number;
	email: string;
}

interface IUsersState {
	users: IUser[];
	isLoading: boolean;
}

const initialState: IUsersState = {
	users: [],
	isLoading: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	try {
		const response = await instance.get('user');
		return response.data;
	} catch (e: any) {
		message.error(e.response.data.message);
	}
});

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.users = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchUsers.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export default usersSlice.reducer;
