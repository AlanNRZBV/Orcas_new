import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

interface UsersSliceState {
	_id: string | null;
	username: string;
	email: string;
	name: string;
	lastName: string;
	middleName: string;
	role: string;
}

const initialState: UsersSliceState = {
	_id: null,
	username: '',
	email: '',
	name: '',
	lastName: '',
	middleName: '',
	role: '',
};

export const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});
export const usersReducer = usersSlice.reducer;
export const userState = (state: RootState) => state.user;
