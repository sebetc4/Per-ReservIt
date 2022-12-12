import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Typography, Container, Grid } from '@mui/material';
import { api } from '../../../../config/api.config';

import { useRouter } from 'next/router';
import { ISignUpBody } from '../../../../types/request.types';
import { signUpSchema } from '../../../../utils/validationSchemas';
import { HttpErrors } from '../../../../types/api.types';
import { CustomError } from '../../../../server/middlewares/errors.middleware';
import { CustomPasswordInput, CustomTextField, ProgressButton } from '../../../../client/components';
import Image from 'next/image';
import SignUpImage from '../../../../../public/images/signup-hotel.jpg';


export default function SignUp() {
    // Hooks
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<ISignUpBody>({
        resolver: yupResolver(signUpSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: ISignUpBody) => {
        try {
            await api.signUp(data);
            router.replace('/login');
        } catch (err) {
            if (err instanceof CustomError && err.message === HttpErrors.EMAIL_ALREADY_EXISTS.message) {
                setError('email', { type: 'custom', message: 'Cette adresse e-mail est déjà liée à un compte' });
            }
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

                        <ProgressButton
                            loading={isSubmitting}
                            type='submit'
                            variant='contained'
                            buttonSx={{ marginTop: 4, marginBottom: 4 }}
                        >
                            S'inscrire
                        </ProgressButton>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography>Vous avez déjà un compte ?</Typography>
                        <Link href='/signup' style={{textDecoration: 'none'}}>
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
