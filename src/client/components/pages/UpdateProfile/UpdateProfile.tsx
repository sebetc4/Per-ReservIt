import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Typography, Container, Grid } from '@mui/material';

import { useRouter } from 'next/router';
import { ISignUpBody } from '../../../../types/request.types';
import { signUpSchema } from '../../../../utils/validationSchemas';
import { api } from '../../../../config/api.config';
import { HttpErrors } from '../../../../types/api.types';
import { CustomError } from '../../../../server/middlewares/errors.middleware';
import CustomTextField from '../../inputs/CustomTextField/CustomTextField';
import ProgressButton from '../../buttons/ProgressButton/ProgressButton';
import CustomPasswordInput from '../../inputs/CustomPasswordInput/CustomPasswordInput';

export default function UpdateProfilePage() {
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
            if (err instanceof CustomError  && err.message === HttpErrors.EMAIL_ALREADY_EXISTS.message) {
                setError('email', { type: 'custom', message: 'Cette adresse e-mail est déjà liée à un compte' });
            }
        }
    };

    return (
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
            <Typography>
                Vous avez déjà un compte ? <Link href='/login'>Connectez-vous</Link>
            </Typography>
        </Container>
    );
}
