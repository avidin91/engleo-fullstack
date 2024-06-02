import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@shared/store/slices/auth.slice';
import groupsSlice from '@shared/store/slices/groups.slice';

export const store = configureStore({
	reducer: {
		authStore: authSlice,
		groupsStore: groupsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
