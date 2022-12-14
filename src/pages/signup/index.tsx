import Head from 'next/head';
import { SignUp } from '../../client/components';
import { requireUnauthUser } from '../../utils/auth.utils';
import { wrapper } from '../../store/store';

export default function SignUpPage() {
    return (
        <>
            <Head>
                <title>Inscription - Reserv'It</title>
            </Head>
            <SignUp />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireUnauthUser(store, context, () => ({ props: {} }));
});
