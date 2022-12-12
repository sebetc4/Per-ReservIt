import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../../config/api.config';
import { ICustomError } from '../../types/api.types';
import { PropertyPreview, PropertyType } from '../../types/properties.types';

interface IPropertiesState {
    loading: boolean;
    error: string | null | undefined;
    data: PropertyPreview[];
    propertiesCount: number;
}

const initialState: IPropertiesState = {
    loading: false,
    error: null,
    data: [],
    propertiesCount: 0,
};

// Add min price accommodation, delete accommodation array
const formatPropertyPreview = (properties: Partial<PropertyType>[]): PropertyPreview[] =>  {
    return properties.map((prop: any) => {
        let minPrice = prop.accommodations[0].price;
        prop.accommodations.forEach((accom: any) => {
            if (accom.price < minPrice) {
                minPrice = accom.price;
            }
        });
        prop.minPrice = minPrice;
        delete prop.accommodations;
        return prop;
    });
}

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProperties.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllProperties.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.data = formatPropertyPreview(action.payload.properties);
            state.propertiesCount = action.payload.propertiesCount;
        });
        builder.addCase(fetchAllProperties.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : action.error.message;
        });
    },
});

interface IFetchAllPropertiesParams {
    currentPage: string;
    location: string | null;
    category: string;
    guests: string | null;
}

export const fetchAllProperties = createAsyncThunk<
    { properties: Partial<PropertyType>[]; propertiesCount: number },
    IFetchAllPropertiesParams,
    { rejectValue: ICustomError }
>('properties/fetchAll', async ({ currentPage, location, category, guests }, { rejectWithValue }) => {
    try {
        const res = await api.fetchAllProperties(currentPage, location, category, guests);
        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data);
        }
        throw err;
    }
});

export const {} = propertiesSlice.actions;
export default propertiesSlice.reducer;
