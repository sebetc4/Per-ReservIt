import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Layout } from '../client/components';
import { CustomThemeProvider } from '../client/providers';
import { fetchCurrentUserData } from '../store/slices/user.slice';
import { wrapper } from '../store/store';

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);

    useEffect(() => {
        store.dispatch(fetchCurrentUserData())
    }, [store])

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
                    <Component {...props.pageProps} />
                </Layout>
            </CustomThemeProvider>
        </Provider>
    );
}