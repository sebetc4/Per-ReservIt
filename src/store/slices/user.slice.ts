import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../../config/api.config';
import { ICustomHttpError } from '../../types/api.types';
import { UpdateGeneralSettingsBody } from '../../types/request.types';
import { UserWithoutPassword } from '../../types/user.types';

type UserState = {
    isLoading: boolean;
    data: UserWithoutPassword | null;
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
        setUserData(state, action: PayloadAction<any>) {
            state.data = action.payload;
        },
        removeUserData(state) {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        // Update General Settings
        builder.addCase(updateGeneralSettings.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateGeneralSettings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        });
        builder.addCase(updateGeneralSettings.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        });
    },
});

export const updateGeneralSettings = createAsyncThunk<any, UpdateGeneralSettingsBody, { rejectValue: ICustomHttpError }>(
    'user/updateGeneralSettings',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.updateGeneralSettings(data);
            return res.data.user
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            }
            throw err;
        }
    }
);

export const { setUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
