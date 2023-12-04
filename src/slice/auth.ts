import { createSlice } from '@reduxjs/toolkit'
import { setItem } from '../helpers/storage';
import CryptoJS from 'crypto-js';

interface AuthState {
	isLoading: boolean;
	loggedIn: boolean;
	error: null | string;
	user: null | { token: string };
}

const initialState: AuthState = {
	isLoading: false,
	loggedIn: false,
	error: null,
	user: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		//signup
		signUpStart: state => {
			state.isLoading = true
			state.error = null
		},
		signUpSuccess: (state, action) => {
			state.isLoading = false
			state.error = null
			state.loggedIn = true
			const user = action.payload.data.data
			state.user = user

			const signstr = 'GET' + '/myself' + user.secret
			const sign = CryptoJS.MD5(signstr).toString();

			setItem('Key', user.key)
			setItem('Secret', user.secret)
			setItem('Sign', sign)

		},
		signUpFailure: (state, action) => {
			state.isLoading = false
			state.error = action.payload
		},
		//signin
		signInStart: state => {
			state.isLoading = true
			state.error = null
		},
		signInSuccess: (state, action) => {
			state.isLoading = false
			state.error = null
			state.loggedIn = true
			const user = action.payload.data.data
			state.user = user

			const signstr = 'GET' + '/myself' + user.secret
			const sign = CryptoJS.MD5(signstr).toString();

			setItem('Key', user.secret)
			setItem('Secret', user.secret)
			setItem('Sign', sign)
		},
		signInFailure: (state, action) => {
			state.isLoading = false
			state.error = action.payload
		},

		signInToken: (state, action) => {
			state.loggedIn = true
			const user = action.payload.data.data
			state.user = user
		},
		//loguot
		logoutUser: state => {
			state.user = null
			state.loggedIn = false
		},
	},
})

export const { 
	signUpStart, 
	signUpSuccess, 
	signUpFailure, 
	signInStart, 
	signInFailure, 
	signInSuccess, 
	signInToken,
	logoutUser } = authSlice.actions
export default authSlice.reducer
