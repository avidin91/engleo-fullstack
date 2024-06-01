import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
	id: number;
	email: string;
	token: string;
}

interface IUserState {
	user: IUser | null;
	isAuth: boolean;
}

const initialState: IUserState = {
	user: null,
	isAuth: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
			state.isAuth = true;
		},
		logout: (state) => {
			state.isAuth = false;
			state.user = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
