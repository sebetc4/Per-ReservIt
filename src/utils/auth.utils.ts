import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { setAuthIsChecked, setSessionIsInvalid } from '../store/slices/auth.slice';
import { setUserData } from '../store/slices/user.slice';
import { SessionStatus } from '../types/api.types';

export const requireAuthUser = async (
    store: ToolkitStore,
    context: GetServerSidePropsContext,
    cb: () => { props: any }
) => {
    store.dispatch(setAuthIsChecked());
    const session = await getSession(context);
    if (session?.status === SessionStatus.VALID) {
        store.dispatch(setUserData(session.user));
        return cb();
    }
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
    };
};

export const requireUnauthUser = async (
    store: ToolkitStore,
    context: GetServerSidePropsContext,
    cb: () => { props: any }
) => {
    const session = await getSession(context);
    if (session?.status === SessionStatus.VALID) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    session && store.dispatch(setSessionIsInvalid());
    return cb();
};
