import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInResponse } from 'next-auth/react';
import { getSession, signIn, signOut } from 'next-auth/react';
import { CustomError, SessionStatus } from '../../types/api.types';
import { Credentials } from '../../types/request.types';
import { removeUserData, setUserData } from './user.slice';

type AuthState = {
    isLoading: boolean;
    isChecked: boolean;
    isAuth: boolean;
    error: string | null | undefined;
};

const initialState: AuthState = {
    isLoading: false,
    isChecked: false,
    isAuth: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthIsChecked(state) {
            state.isChecked = true;
            state.error = null;
        },
        setUserIsAuth(state) {
            state.isChecked = true;
            state.isAuth = true 
            state.error = null
        },
        setSessionIsInvalid(state) {
            state.isChecked = true;
            state.isAuth = false;
            state.error = CustomError.INVALID_TOKEN.message
        },
        setAuthError(state, action: PayloadAction<string>) {
            state.isChecked = true;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginWithCredentials.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
            state.isAuth = false;
        });
        builder.addCase(loginWithCredentials.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
        });
        builder.addCase(loginWithCredentials.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ? action.payload : action.error.message;
        });
        // Logout
        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        // Check auth
        builder.addCase(checkAuth.pending, (state, action) => {
            state.isLoading = true;
            state.isChecked = false;
            state.isAuth = false;
            state.error = null;
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isChecked = true;
            state.isAuth = action.payload;
        });
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export const loginWithCredentials = createAsyncThunk<void, Credentials, { rejectValue: string }>(
    'auth/login',
    async (credentials, { rejectWithValue, dispatch }) => {
        try {
            const res: SignInResponse | undefined = await signIn('credentials', { ...credentials, redirect: false });
            if (!res) {
                throw new Error('Failled to login');
            }
            if (res.error) {
                return rejectWithValue(res.error);
            }
            const session = await getSession();
            if (!session) {
                throw new Error('Failled to get session');
            }
            dispatch(setUserData(session.user));
            
        } catch (err) {
            throw err;
        }
    }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logout',
    async (arg, { dispatch }) => {
        await signOut({ redirect: false });
        dispatch(removeUserData());
    }
);

export const checkAuth = createAsyncThunk<boolean, void>(
    'auth/checkAuth',
    async (arg, { dispatch  }) => {
        const session = await getSession();
        if (!session) {
            return false;
        }
        if (session.status === SessionStatus.INVALID) {
            await signOut({ redirect: false });
            return false;
        }
        dispatch(setUserData(session.user));
        return true;
    }
);

export const { setAuthIsChecked, setUserIsAuth, setAuthError, setSessionIsInvalid } = authSlice.actions;
export default authSlice.reducer;
