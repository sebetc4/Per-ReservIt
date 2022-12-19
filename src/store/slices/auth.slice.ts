import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { SignInResponse } from 'next-auth/react';
import { getSession, signIn, signOut } from 'next-auth/react';
import { api } from '../../config/api.config';
import { CustomError, SessionStatus } from '../../types/api.types';
import { Credentials, SignUpBody } from '../../types/request.types';
import { removeUserData, setUserSession } from './user.slice';

type AuthState = {
    isLoading: boolean;
    isChecked: boolean;
    sessionStatus: SessionStatus | null;
    isAuth: boolean;
    error: string | null | undefined;
};

const initialState: AuthState = {
    isLoading: false,
    isChecked: false,
    sessionStatus: null,
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
            state.sessionStatus = SessionStatus.VALID;
            state.isAuth = true;
            state.error = null;
        },
        setInvalidSession(state) {
            state.isChecked = true;
            state.isAuth = false;
            state.sessionStatus = SessionStatus.INVALID;
            state.error = CustomError.INVALID_TOKEN.message;
        },
        setAuthError(state, action: PayloadAction<string>) {
            state.isChecked = true;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // SignUp
        builder.addCase(signUp.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ? action.payload : action.error.message;
        });
        // Login
        builder.addCase(loginWithCredentials.pending, (state, action) => {
            state.isLoading = true;
            state.isAuth = false;
            state.sessionStatus = null;
            state.error = null;
        });
        builder.addCase(loginWithCredentials.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.sessionStatus = SessionStatus.VALID;
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
            state.sessionStatus = null;
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
            state.sessionStatus = null;
            state.isAuth = false;
            state.error = null;
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isChecked = true;
            state.sessionStatus = action.payload ? SessionStatus.VALID : null;
            state.isAuth = action.payload;
        });
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
            state.error = action.error.message;
        });
    },
});

export const signUp = createAsyncThunk<void, SignUpBody, { rejectValue: string }>(
    'auth/signUp',
    async (data, { rejectWithValue }) => {
        try {
            await api.signUp(data);
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data);
            }
            throw err;
        }
    }
);

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
            dispatch(setUserSession(session.user));
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

export const checkAuth = createAsyncThunk<boolean, void>('auth/checkAuth', async (arg, { dispatch }) => {
    try {
        const session = await getSession();
        if (!session) {
            return false;
        }
        if (session.status === SessionStatus.INVALID) {
            await signOut({ redirect: false });
            return false;
        }
        dispatch(setUserSession(session.user));
        return true;
    } catch (err) {
        throw err;
    }
});

export const { setAuthIsChecked, setUserIsAuth, setAuthError, setInvalidSession } = authSlice.actions;
export default authSlice.reducer;
