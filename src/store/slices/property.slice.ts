import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../config/api.config';
import { PropertyType } from '../../types/properties.types';

interface IPropertyState {
    loading: boolean;
    error: boolean;
    data: PropertyType | null;
}

const initialState: IPropertyState = {
    loading: false,
    error: false,
    data: null,
};

export const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProperty.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchProperty.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.data = action.payload.property;
        });
        builder.addCase(fetchProperty.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
    },
});

export const fetchProperty = createAsyncThunk('property/fetchOne', async (id: string) => {
    const res = await Api.fetchProperty(id);
    return res.data;

});

export const {} = propertySlice.actions;
export default propertySlice.reducer;
