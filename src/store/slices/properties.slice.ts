import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../config/api.config';
import { PropertyPreview } from '../../types/properties.types';

interface IPropertiesState {
    loading: boolean;
    error: boolean;
    data: PropertyPreview[];
    propertiesCount: number;
}

const initialState: IPropertiesState = {
    loading: false,
    error: false,
    data: [],
    propertiesCount: 0,
};

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProperties.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchAllProperties.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.data = action.payload.properties;
            state.propertiesCount = action.payload.propertiesCount;
        });
        builder.addCase(fetchAllProperties.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
    },
});

export const fetchAllProperties = createAsyncThunk('properties/fetchAll', async () => {
    const res = await Api.fetchAllProperties();
    return res.data;
});

export const {} = propertiesSlice.actions;
// export const selectAuthState = (state: AppState) => state.auth.authState;
export default propertiesSlice.reducer;
