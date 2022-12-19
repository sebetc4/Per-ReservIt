import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Typography, Container, Grid } from '@mui/material';
import { api } from '../../../../config/api.config';

import { useRouter } from 'next/router';
import { SignUpBody } from '../../../../types/request.types';
import { signUpSchema } from '../../../../utils/validationSchemas';
import { CustomError } from '../../../../types/api.types';
import { CustomPasswordInput, CustomTextField, GoogleButton } from '../../../../client/components';
import Image from 'next/image';
import SignUpImage from '../../../../../public/images/signup-hotel.jpg';
import { LoadingButton } from '@mui/lab';
import { useAlert, useAppDispatch, useAppSelector } from '../../../hooks';
import { signUp } from '../../../../store/slices/auth.slice';

export default function SignUp() {
    
    // Hooks
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { setAlert } = useAlert();

    // Store
    const { error } = useAppSelector((state) => state.auth);

    // Form
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<SignUpBody>({
        resolver: yupResolver(signUpSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: SignUpBody) => {
        const res = await dispatch(signUp(data));
        router.replace('/login');
        if (res.meta.requestStatus === 'fulfilled') {
            router.replace('/login');
        } else {
            switch (error) {
                case CustomError.EMAIL_ALREADY_EXISTS.message:
                    setError('email', { type: 'custom', message: 'Un compte est déjà lié à cette adresse e-mail.' });
                    break;
                default:
                    setAlert({
                        type: 'error',
                        message: "Erreur lors de la tentative de connecion. Merci d'essayer ultérieurement.",
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
                        Créer un compte
                    </Typography>
                    <Typography
                        component='h2'
                        align='center'
                        sx={{
                            marginBottom: 4,
                        }}
                    >
                        Vous cherchez un hébergement ou vous avez un hébergement à proposer? Rejoignez notre communauté.
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
                                name='username'
                                label='Pseudo'
                                type='text'
                                register={register('username')}
                                error={errors.username}
                            />
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
                            size='large'
                            fullWidth
                        >
                            S'inscrire
                        </LoadingButton>
                        <GoogleButton />
                    </Box>
                    <Box sx={{ marginTop: 4, display: 'flex', gap: 1 }}>
                        <Typography>Vous avez déjà un compte ?</Typography>
                        <Link
                            href='/login'
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
                    src={SignUpImage}
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
