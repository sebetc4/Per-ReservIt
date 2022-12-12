import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../../config/api.config';
import { ICustomError } from '../../types/api.types';
import { User } from '../../types/user.types';

interface IUserState {
    loading: boolean;
    error: string | null | undefined;
    isAuth: boolean;
    data: User | null;
}

const initialState: IUserState = {
    loading: false,
    error: null,
    isAuth: false,
    data: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get User Data
        builder.addCase(fetchCurrentUserData.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.isAuth = false;
            state.data = null;
        });
        builder.addCase(fetchCurrentUserData.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.isAuth = true;
            state.data = action.payload;
        });
        builder.addCase(fetchCurrentUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
            state.isAuth = false;
            state.data = null;
        });
        // Update User Data
        builder.addCase(updateCurrentUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload;
        });
        builder.addCase(updateCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        });
    },
});

export const fetchCurrentUserData = createAsyncThunk<User, undefined, { rejectValue: ICustomError }>(
    'user/fetchCurrentUserData',
    async (arg, { rejectWithValue }) => {
        try {
            const { data } = await api.fetchCurrentUserData();
            return data.user;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            }
            throw err;
        }
    }
);

export const updateCurrentUser = createAsyncThunk<User, Partial<User>, { rejectValue: ICustomError }>(
    'user/updateCurrentUser',
    async ({}, { rejectWithValue }) => {
        try {
            const { data } = await api.fetchCurrentUserData();
            return data.user;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            }
            throw err;
        }
    }
);

export const { } = userSlice.actions;
export default userSlice.reducer;
