import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Container } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { updateGeneralSettings } from '../../../../../store/slices/user.slice';
import { UpdateGeneralSettingsBody } from '../../../../../types/request.types';
import { updateGeneralSettingsSchema } from '../../../../../utils/validationSchemas';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';
import ProgressButton from '../../../buttons/ProgressButton/ProgressButton';
import CustomTextField from '../../../inputs/CustomTextField/CustomTextField';

export default function GeneralSettingsForm() {
    // Hoohs
    const dispatch = useAppDispatch();

    // Store
    const { data: user } = useAppSelector((state) => state.user);

    // Form
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<UpdateGeneralSettingsBody>({
        resolver: yupResolver(updateGeneralSettingsSchema),
        mode: 'onTouched',
        defaultValues: { username: user!.username, email: user!.email },
    });

    const onSubmit = async (data: UpdateGeneralSettingsBody) => {
        try {
            if (user?.email !== data.email || user?.username !== data.username) {
                dispatch(updateGeneralSettings(data));
            }
        } catch (err) {
            console.log(err);
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

                <ProgressButton
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    type='submit'
                    variant='contained'
                    buttonSx={{ marginTop: 4, marginBottom: 2 }}
                    size='large'
                    fullWidth
                >
                    Modifier
                </ProgressButton>
            </Box>
        </Container>
    );
}
