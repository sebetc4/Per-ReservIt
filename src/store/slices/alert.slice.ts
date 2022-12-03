import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Api from '../../config/api.config';

interface IAlertState {
    message: string;
    type: 'error' | 'success' | 'warning' | 'info' | null;
}

const initialState: IAlertState = {
    message: '',
    type: null,
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<Omit<IAlertState, 'open'>>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        removeAlert: (state) => {
            state.message = initialState.message;
            state.type = initialState.type;
        },
    },
});

export const fetchAllProperties = createAsyncThunk('properties/fetchAll', async () => {
    const res = await Api.fetchAllProperties();
    return res.data;
});

export const { setAlert, removeAlert } = alertSlice.actions;
// export const selectAuthState = (state: AppState) => state.auth.authState;
export default alertSlice.reducer;
