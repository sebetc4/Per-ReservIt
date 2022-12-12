import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';

import { Box, Typography, Grid, Container } from '@mui/material';

import { useRouter } from 'next/router';
import { ISignInBody } from '../../../../types/request.types';
import { signInSchema } from '../../../../utils/validationSchemas';
import { CustomPasswordInput, CustomTextField, ProgressButton } from '../..';
import { HttpErrors } from '../../../../types/api.types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import Image from 'next/image';
import LoginImage from '../../../../../public/images/login-hotel.jpg';
import { fetchCurrentUserData } from '../../../../store/slices/user.slice';

export default function Login() {
    // Hooks
    const dispatch = useAppDispatch();
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

    // Store
    const { isAuth } = useAppSelector((state) => state.user);

    const onSubmit = async (data: ISignInBody) => {
        const res = await signIn('credentials', { ...data, redirect: false });
        if (!res?.error) {
            dispatch(fetchCurrentUserData());
            router.replace('/');
        } else if (res.error === HttpErrors.WRONG_EMAIL.message) {
            setError('email', { type: 'custom', message: "Aucun compte n'est enregistré avec cette adresse e-mail" });
        } else if (res.error === HttpErrors.WRONG_PASSWORD.message) {
            setError('password', { type: 'custom', message: 'Mot de passe invalide' });
        }
    };

    return (
        <Grid
            container
            maxWidth='xs'
        >
            <Grid
                item
                xs={6}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Container
                    maxWidth='xs'
                    sx={{
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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography>Vous n'avez pas de compte ?</Typography>
                        <Link
                            href='/signup'
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                color='primary'
                                sx={{
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Connectez-vous
                            </Typography>
                        </Link>
                    </Box>
                </Container>
            </Grid>
            <Grid
                item
                xs={6}
                sx={{
                    position: 'relative',
                    borderTopLeftRadius: 80,
                    borderBottomLeftRadius: 80,
                    overflow: 'hidden',
                }}
            >
                <Image
                    src={LoginImage}
                    alt='Hotel en bord de mer'
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </Grid>
        </Grid>
    );
}
