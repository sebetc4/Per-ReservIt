import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../config/api.config';
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
            state.error = false;
        });
        builder.addCase(fetchAllProperties.fulfilled, (state, action) => {
            const properties = action.payload.properties;
            const data = properties.map((prop: any) => {
                let minPrice = prop.accommodations[0].price
                prop.accommodations.forEach((accom: any) => {
                    if (accom.price < minPrice) {
                        minPrice = accom.price;
                    }
                })
                prop.minPrice = minPrice
                delete prop.accommodations;
                return prop;
            });
            state.loading = false;
            state.error = false;
            state.data = data;
            state.propertiesCount = action.payload.propertiesCount;
        });
        builder.addCase(fetchAllProperties.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
    },
});

interface IFetchAllPropertiesParams {
    currentPage: string;
    location: string | null;
    category: string;
    guests: string | null;
}

export const fetchAllProperties = createAsyncThunk(
    'properties/fetchAll',
    async ({ currentPage, location, category, guests }: IFetchAllPropertiesParams) => {
        const res = await api.fetchAllProperties(currentPage, location, category, guests);
        return res.data;
    }
);

export const {} = propertiesSlice.actions;
export default propertiesSlice.reducer;
