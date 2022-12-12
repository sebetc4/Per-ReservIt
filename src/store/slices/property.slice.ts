import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../../config/api.config';
import { ICustomError } from '../../types/api.types';
import { PropertyType } from '../../types/properties.types';

interface IPropertyState {
    loading: boolean;
    error: string | null | undefined;
    data: PropertyType | null;
}

const initialState: IPropertyState = {
    loading: false,
    error: null,
    data: null,
};

export const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOneProperty.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchOneProperty.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.data = payload;
        });
        builder.addCase(fetchOneProperty.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        });
    },
});

export const fetchOneProperty = createAsyncThunk<any, string, { rejectValue: ICustomError }>(
    'property/fetchOne',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.fetchOneProperty(id);
            return res.data.property;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            }
            throw err;
        }
    }
);

export const {} = propertySlice.actions;
export default propertySlice.reducer;
