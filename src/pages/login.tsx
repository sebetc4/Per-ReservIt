import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Login } from '../client/components'

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

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const session = await getSession({ req });
    return !session
        ? {
              props: {},
          }
        : {
              redirect: {
                  destination: '/',
                  permanent: false,
              },
          };
};
