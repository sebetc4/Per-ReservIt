import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../../config/api.config';
import { ICustomHttpError } from '../../types/api.types';
import { UpdateAccountBody, UpdatePasswordBody, UpdateProfileBody } from '../../types/request.types';
import { UserSession } from '../../types/user.types';

type UserState = {
    isLoading: boolean;
    data: UserSession | null;
    error: string | null | undefined;
};

const initialState: UserState = {
    isLoading: false,
    data: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserSession(state, action: PayloadAction<any>) {
            state.data = action.payload;
        },
        removeUserData(state) {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        // Update Account
        builder.addCase(updateAccount.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        });
        builder.addCase(updateAccount.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        });
        // Update Profile
        builder.addCase(updateProfile.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        });
        // Update Password
        builder.addCase(updatePassword.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        });
    },
});

export const updateAccount = createAsyncThunk<any, UpdateAccountBody, { rejectValue: ICustomHttpError }>(
    'user/updateAccount',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.updateAccount(data);
            return res.data.session;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            }
            throw err;
        }
    }
);

export const updateProfile = createAsyncThunk<any, UpdateProfileBody, { rejectValue: ICustomHttpError }>(
    'user/updateProfile',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.updateProfile(data);
            return res.data.session;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            }
            throw err;
        }
    }
);

export const updatePassword = createAsyncThunk<any, UpdatePasswordBody, { rejectValue: ICustomHttpError }>(
    'user/updatePassword',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.updatePassword(data);
            return res.data.session;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            }
            throw err;
        }
    }
);

export const { setUserSession, removeUserData } = userSlice.actions;
export default userSlice.reducer;
