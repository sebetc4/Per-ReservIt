import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';

import { Box, Typography, Container, Grid } from '@mui/material';

import { useRouter } from 'next/router';
import Head from 'next/head';
import { ISignInBody } from '../types/request.types';
import { signInSchema } from '../utils/validationSchemas';
import { CustomPasswordInput, CustomTextField, ProgressButton } from '../client/components';
import { HttpErrors } from '../types/api.types';

export default function SignIn() {
    // Hooks

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<ISignInBody>({
        resolver: yupResolver(signInSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: ISignInBody) => {
        const res = await signIn('credentials', { ...data, redirect: false });
        if (!res?.error) {
            router.replace('/');
            return;
        }
        if (res?.error === HttpErrors.WRONG_EMAIL.message) {
            setError('email', { type: 'custom', message: "Aucun compte n'est enregistré avec cette adresse e-mail" });
            return;
        }
        if (res?.error === HttpErrors.WRONG_PASSWORD.message) {
            setError('password', { type: 'custom', message: 'Mot de passe invalide' });
        }
    };

    return (
        <>
            <Head>
                <title>Connexion - RecipeApp</title>
            </Head>
            <Container
                component='main'
                maxWidth='xs'
                sx={{
                    paddingTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    component='h1'
                    variant='h4'
                    sx={{
                        margin: 1,
                    }}
                >
                    Connexion
                </Typography>
                <Typography
                    component='h2'
                    align='center'
                    sx={{
                        marginBottom: 4,
                    }}
                >
                    Heureux de vous retouver! Connectez-vous pour accéder à votre compte.
                </Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Grid
                        container
                        spacing={3}
                    >
                        <CustomTextField
                            name='email'
                            label='Adresse e-mail'
                            type='email'
                            register={register('email')}
                            error={errors.email}
                        />
                        <CustomPasswordInput
                            name='password'
                            label='Mot de passe'
                            register={register('password')}
                            error={errors.password}
                        />
                    </Grid>
                    <ProgressButton
                        loading={isSubmitting}
                        type='submit'
                        variant='contained'
                        buttonSx={{ marginTop: 4, marginBottom: 4 }}
                    >
                        Se connecter
                    </ProgressButton>
                </Box>
                <Typography>
                    Vous n'avez pas de compte ? <Link href='/signup'>Inscrivez-vous</Link>
                </Typography>
            </Container>
        </>
    );
}
