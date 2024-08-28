import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

interface UsersSliceState {
	name: string;
}

const initialState: UsersSliceState = {
	name: 'ToBeChanged',
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		changeName: (state) => {
			state.name === 'ToBeChanged' ? (state.name = 'changed name') : (state.name = initialState.name);
		},
	},
});

export const { changeName } = usersSlice.actions;

export const currentName = (state: RootState) => state.users.name;
export const usersReducer = usersSlice.reducer;
