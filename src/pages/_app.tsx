import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Layout } from '../client/components';
import { AlertProvider, ThemeProvider } from '../client/providers';
import { checkAuth, logout } from '../store/slices/auth.slice';
import { wrapper } from '../store/store';

// https://stackoverflow.com/questions/73761243/you-are-using-legacy-implementaion-please-update-your-code-use-createwrapper
// Emotion cache à voir !!

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const state = store.getState();

    // Check Auth
    useEffect(() => {
        store.dispatch(checkAuth());
    }, [store]);

    return (
        <Provider store={store}>
            <Head>
                <meta
                    name='viewport'
                    content='initial-scale=1, width=device-width'
                />
            </Head>
            <AlertProvider>
                <ThemeProvider>
                    <Layout>
                        <Component {...props.pageProps} />
                    </Layout>
                </ThemeProvider>
            </AlertProvider>
        </Provider>
    );
}
