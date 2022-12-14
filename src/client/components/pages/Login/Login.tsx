import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Typography, Grid, Container } from '@mui/material';

import { useRouter } from 'next/router';
import { signInSchema } from '../../../../utils/validationSchemas';
import { CustomPasswordInput, CustomTextField, GoogleButton } from '../..';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import Image from 'next/image';
import LoginImage from '../../../../../public/images/login-hotel.jpg';
import { loginWithCredentials, logout } from '../../../../store/slices/auth.slice';
import { Credentials } from '../../../../types/request.types';
import { useState } from 'react';
import { CustomError } from '../../../../types/api.types';
import { useAlert } from '../../../hooks';
import { LoadingButton } from '@mui/lab';

export default function Login() {
    // Hooks
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { setAlert } = useAlert();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<Credentials>({
        resolver: yupResolver(signInSchema),
        mode: 'onTouched',
    });

    // Store
    const { error } = useAppSelector((state) => state.auth);

    const [showProviderError, setShowProviderError] = useState<boolean>(false);

    const onSubmit = async (data: Credentials) => {
        showProviderError && setShowProviderError(false);
        const res = await dispatch(loginWithCredentials(data));
        if (res.meta.requestStatus === 'fulfilled') {
            router.replace('/');
        } else {
            switch (error) {
                case CustomError.EMAIL_ALREADY_EXISTS.message ||
                    error === CustomError.EMAIL_ALREADY_EXISTS_OTHER_PROVIDER.message:
                    setShowProviderError(true);
                    break;
                case CustomError.WRONG_EMAIL.message:
                    setError('email', {
                        type: 'custom',
                        message: "Aucun compte n'est enregistr?? avec cette adresse e-mail",
                    });
                    break;
                case CustomError.WRONG_PASSWORD.message:
                    setError('password', { type: 'custom', message: 'Mot de passe invalide' });
                    break;
                default:
                    setAlert({
                        type: 'error',
                        message: "Erreur lors de la tentative de connecion. Merci d'essayer ult??rieurement.",
                    });
            }
        }
    };

    return (
        <Grid
            container
            maxWidth='xl'
            sx={{ ml: 'auto', mr: 'auto' }}
        >
            <Grid
                item
                xs={6}
                sx={{
                    height: '100%',
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
                        Heureux de vous retouver! Connectez-vous pour acc??der ?? votre compte.
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
                        <LoadingButton
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            type='submit'
                            variant='contained'
                            sx={{ marginTop: 4, marginBottom: 2 }}
                            fullWidth
                            size='large'
                        >
                            Se connecter
                        </LoadingButton>
                        <GoogleButton />
                        {showProviderError && (
                            <Typography
                                color='error'
                                sx={{ mt: 4, textAlign: 'center' }}
                            >
                                Un compte est d??j?? li?? ?? cette adresse e-mail avec une autre m??thode de connexion
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ mt: 4, display: 'flex', gap: 1 }}>
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
                                Inscrivez-vous
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
                    display: 'flex',
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
