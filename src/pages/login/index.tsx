import Head from 'next/head';
import { Login } from '../../client/components';
import { requireUnauthUser } from '../../utils/auth.utils';
import { wrapper } from '../../store/store';
import { setAuthError } from '../../store/slices/auth.slice';
import { QueryErrors } from '../../types/query.types';
import { CustomError } from '../../types/api.types';

export default function LoginPage() {
    return (
        <>
            <Head>
                <title>Connexion - RecipeApp</title>
            </Head>
            <Login />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    switch (context.query.error) {
        case QueryErrors.EMAIL_ALREADY_EXISTS:
            store.dispatch(setAuthError(CustomError.EMAIL_ALREADY_EXISTS.message));
            break
    }
    return requireUnauthUser(store, context, () => ({ props: {} }));
});
