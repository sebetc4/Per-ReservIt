import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Container } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { updatePassword } from '../../../../../store/slices/user.slice';
import { UpdatePasswordBody } from '../../../../../types/request.types';
import { updatePasswordSchema } from '../../../../../utils/validationSchemas';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CustomPasswordInput from '../../../inputs/CustomPasswordInput/CustomPasswordInput';
import { useAlert } from '../../../../hooks';
import { CustomError } from '../../../../../types/api.types';

export default function AccountForm() {
    // Hoohs
    const dispatch = useAppDispatch();
    const { setAlert } = useAlert();

    // Store
    const { error } = useAppSelector((state) => state.user);

    // Form
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        setError,
    } = useForm<UpdatePasswordBody>({
        resolver: yupResolver(updatePasswordSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: UpdatePasswordBody) => {
        const res = await dispatch(updatePassword(data));
        if (res.meta.requestStatus === 'fulfilled') {
            setAlert({ type: 'success', message: 'Votre mot de passe a été mis à jour.' });
        } else {
            switch (error) {
                case CustomError.WRONG_PASSWORD.message:
                    setError('currentPassword', {
                        type: 'custom',
                        message: 'Mot de passe incorrect',
                    });
                    break;
                default:
                    setAlert({
                        type: 'error',
                        message:
                            "Erreur lors de la modification de votre mot de passe. Merci d'essayer ultérieurement.",
                    });
            }
        }
    };

    return (
        <Container maxWidth='xs'>
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                maxWidth='xs'
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
                    <CustomPasswordInput
                        name='currentPassword'
                        label='Mot de passe actuel'
                        register={register('currentPassword')}
                        error={errors.currentPassword}
                    />
                    <CustomPasswordInput
                        name='password'
                        label='Mot de passe'
                        register={register('newPassword')}
                        error={errors.newPassword}
                    />
                    <CustomPasswordInput
                        name='password'
                        label='Mot de passe'
                        register={register('confirmPassword')}
                        error={errors.confirmPassword}
                    />
                </Grid>

                <LoadingButton
                    loading={isSubmitting}
                    disabled={isSubmitting || !isDirty}
                    size='large'
                    type='submit'
                    variant='contained'
                    loadingPosition='start'
                    startIcon={
                        <SaveOutlinedIcon
                            fontSize='large'
                            sx={{ mb: 0.5 }}
                        />
                    }
                    sx={{ marginTop: 4, marginBottom: 2 }}
                    fullWidth
                >
                    Enregistrer les modifications
                </LoadingButton>
            </Box>
        </Container>
    );
}
