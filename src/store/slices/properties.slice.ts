import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../../config/api.config';
import { ICustomHttpError } from '../../types/api.types';
import { PropertyPreview, Property } from '../../types/properties.types';

type PropertiesState = {
    isLoading: boolean;
    data: PropertyPreview[];
    propertiesCount: number;
    error: string | null | undefined;
}

const initialState: PropertiesState = {
    isLoading: false,
    data: [],
    propertiesCount: 0,
    error: null,
};

// Add min price accommodation, delete accommodation array
const formatPropertyPreview = (properties: Partial<Property>[]): any =>  {
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
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAllProperties.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = formatPropertyPreview(action.payload.properties);
            state.propertiesCount = action.payload.propertiesCount;
            state.error = null;
        });
        builder.addCase(fetchAllProperties.rejected, (state, action) => {
            state.isLoading = false;
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
    { properties: Partial<Property>[]; propertiesCount: number },
    IFetchAllPropertiesParams,
    { rejectValue: ICustomHttpError }
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
