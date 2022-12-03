import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import * as reducers from './slices';

const combinedReducer = combineReducers(reducers);

const reducer: typeof combinedReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
            // properties: {
            //     data: [...state!.properties.data, ...action.payload.properties.data],
            // },
            // counter: {
            //     count: state?.counter.count + action.payload.counter.count,
            // },
            // users: {
            //     users: [...state!.users.users, ...action.payload.users.users],
            // },
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () => configureStore({ reducer });

type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store['dispatch'];
export type AppState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export const wrapper = createWrapper(makeStore);
