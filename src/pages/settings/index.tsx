import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { requireAuthUser } from '../../utils/auth.utils';
import { UpdateProfile } from '../../client/components';
import { wrapper } from '../../store/store';

export default function UpdateProfilePage() {
    return (
        <>
            <Head>
                <title>Paramètres - Reserv'It</title>
            </Head>
            <UpdateProfile />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireAuthUser(store, context, () => ({ props: {} }));
});
