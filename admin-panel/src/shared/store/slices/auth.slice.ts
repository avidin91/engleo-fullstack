// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '@shared/store';
//
// // Define a type for the slice state
// export interface AuthState {
// 	isAuthorized: boolean;
// }
//
// const initialState: AuthState = {
// 	isAuthorized: false,
// };
//
// export const authSlice = createSlice({
// 	name: 'auth',
// 	// `createSlice` will infer the state type from the `initialState` argument
// 	initialState,
// 	reducers: {
// 		increment: (state) => {
// 			state.value += 1;
// 		},
// 		decrement: (state) => {
// 			state.value -= 1;
// 		},
// 		// Use the PayloadAction type to declare the contents of `action.payload`
// 		incrementByAmount: (state, action: PayloadAction<number>) => {
// 			state.value += action.payload;
// 		},
// 	},
// });
//
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
//
// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;
//
// export default counterSlice.reducer;
