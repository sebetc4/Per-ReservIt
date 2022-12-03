import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { Layout } from '../client/layout';
import { CustomThemeProvider } from '../client/providers';
import { wrapper } from '../store/store';

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
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