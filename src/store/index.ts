import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../slice/auth'
import BookReducer from '../slice/book'

const store = configureStore({
	reducer: {
		auth: AuthReducer,
		book: BookReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;