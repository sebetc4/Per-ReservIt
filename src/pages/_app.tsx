import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Layout } from '../client/components';
import { CustomThemeProvider } from '../client/providers';
import { checkAuth, logout } from '../store/slices/auth.slice';
import { wrapper } from '../store/store';
import { CustomError } from '../types/api.types';


// https://stackoverflow.com/questions/73761243/you-are-using-legacy-implementaion-please-update-your-code-use-createwrapper
// Emotion cache à voir !!

export default function App({ Component, ...rest }: AppProps) {

    const { store, props } = wrapper.useWrappedStore(rest);
    const state = store.getState();
    
    // Check Auth
    useEffect(() => {
        !state.auth.isChecked && store.dispatch(checkAuth());
    }, [store]);

    return (
        <Provider store={store}>
            <Head>
                <meta
                    name='viewport'
                    content='initial-scale=1, width=device-width'
                />
            </Head>
            <CustomThemeProvider>
                <Layout>
                    <Component {...props.pageProps}/>
                </Layout>
            </CustomThemeProvider>
        </Provider>
    );
}
