import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { SignUp } from '../client/components';

export default function SignUpPage() {

    return (
        <>
            <Head>
                <title>Inscription - Reserv'It</title>
            </Head>
            <SignUp/>
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
