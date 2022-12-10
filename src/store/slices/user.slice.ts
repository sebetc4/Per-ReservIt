import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../config/api.config';
import { UserType } from '../../types/user.types';

interface IUserState {
    loading: boolean;
    error: boolean;
    isAuth: boolean
    data: Omit<UserType, 'password'> | null;
}

const initialState: IUserState = {
    loading: false,
    error: false,
    isAuth: false,
    data: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUserData.pending, (state, action) => {
            state.loading = true
            state.error = false
            state.isAuth = false
            state.data = null
        });
        builder.addCase(fetchCurrentUserData.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.isAuth = false
            state.data = action.payload
        });
        builder.addCase(fetchCurrentUserData.rejected, (state, action) => {
            state.loading = false
            state.error = true
            state.isAuth = false
            state.data = null
        });
    },
});

export const fetchCurrentUserData = createAsyncThunk(
    'user/fetchCurrentUserData',
    async () => {
        const res = await api.fetchCurrentUserData();
        return res.data;
    }
);

export const {} = userSlice.actions;
export default userSlice.reducer;
