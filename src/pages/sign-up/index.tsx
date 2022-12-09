import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Typography, Container, Button, Grid } from '@mui/material';

import { CustomPasswordInput, CustomTextField, ProgressButton } from '../../client/components';
import { signUpSchema } from '../../utils/validationSchemas';
import { ISignUpBody } from '../../types/request.types';
import { useRouter } from 'next/router';
import Head from 'next/head';

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
            // await api.post('/api/sign-up', data);
            router.replace('/sign-in');
        } catch (err) {
            // if (matchedApiErrorType(ApiErrors.EMAIL_ALREADY_EXISTS, err)) {
            //     setError('email', { type: 'custom', message: 'Cette adresse e-mail est déjà liée à un compte' });
            // }
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
                    Créer un compte
                </Typography>
                <Typography
                    component='h2'
                    align='center'
                    sx={{
                        marginBottom: 4,
                    }}
                >
                    Rejoignez notre communauté de petits chefs en herbe.
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
                <Typography>
                    Vous avez déjà un compte ? <Link href='/sign-in'>Connectez-vous</Link>
                </Typography>
            </Container>
        </>
    );
}
