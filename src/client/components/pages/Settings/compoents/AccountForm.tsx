import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Container } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { updateAccount } from '../../../../../store/slices/user.slice';
import { UpdateAccountBody } from '../../../../../types/request.types';
import { updateAccountSchema } from '../../../../../utils/validationSchemas';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';
import CustomTextField from '../../../inputs/CustomTextField/CustomTextField';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useAlert } from '../../../../hooks';

export default function AccountForm() {
    // Hoohs
    const dispatch = useAppDispatch();
    const { setAlert } = useAlert();

    // Store
    const { data: user } = useAppSelector((state) => state.user);

    // Form
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<UpdateAccountBody>({
        resolver: yupResolver(updateAccountSchema),
        mode: 'onTouched',
        defaultValues: { username: user!.username, email: user!.email },
    });

    const onSubmit = async (data: UpdateAccountBody) => {
        if (user?.email !== data.email || user?.username !== data.username) {
            const res = await dispatch(updateAccount(data));
            if (res.meta.requestStatus === 'fulfilled') {
                setAlert({ type: 'success', message: 'Vos modifications ont été enregistrées.' });
            } else {
                setAlert({ type: 'error', message: "Erreur lors de l'enregistrement de vos modifications'. Merci d'essayer ultérieurement." });
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
                    <CustomTextField
                        name='username'
                        label='Pseudo'
                        type='text'
                        register={register('username')}
                        error={errors.username}
                    />
                    <CustomTextField
                        disabled={user?.authProvider !== 'credentials'}
                        name='email'
                        label='Adresse e-mail'
                        type='email'
                        register={register('email')}
                        error={errors.email}
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
