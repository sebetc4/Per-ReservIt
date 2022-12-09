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
            state.error = false;
        });
        builder.addCase(fetchAllProperties.fulfilled, (state, action) => {
            const properties = action.payload.properties;
            const data = properties.map((prop: any) => {
                let minPrice = prop.accommodations[0].pricePerNight
                prop.accommodations.forEach((accom: any) => {
                    if (accom.pricePerNight < minPrice) {
                        minPrice = accom.pricePerNight;
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
    type: string;
    guests: string | null;
}

export const fetchAllProperties = createAsyncThunk(
    'properties/fetchAll',
    async ({ currentPage, location, type, guests }: IFetchAllPropertiesParams) => {
        const res = await Api.fetchAllProperties(currentPage, location, type, guests);
        return res.data;
    }
);

export const {} = propertiesSlice.actions;
// export const selectAuthState = (state: AppState) => state.auth.authState;
export default propertiesSlice.reducer;
