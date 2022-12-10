import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlertState } from '../../types/alert.types';

const initialState: IAlertState = {
    open: false,
    message: '',
    type: null,
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<Omit<IAlertState, 'open'>>) => {
            state.open = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        removeAlert: (state) => {
            state.open = false;
            state.message = initialState.message;
            state.type = initialState.type;
        },
    },
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
