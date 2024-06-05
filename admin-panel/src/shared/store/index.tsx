import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@shared/store/slices/auth.slice';
import wordsSlice from '@shared/store/slices/words.slice';
import wordGroupsSlice from '@shared/store/slices/word-groups.slice';
import wordCompilationsSlice from '@shared/store/slices/word-compilations.slice';

export const store = configureStore({
	reducer: {
		authStore: authSlice,
		wordGroupsStore: wordGroupsSlice,
		wordCompilationsStore: wordCompilationsSlice,
		wordsStore: wordsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
