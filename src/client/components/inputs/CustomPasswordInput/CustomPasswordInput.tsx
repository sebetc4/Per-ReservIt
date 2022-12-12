import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type CustomPasswordInputProps = {
    name: string;
    label: string;
    register: UseFormRegisterReturn;
    error: FieldError | undefined;
}

export default function CustomPasswordInput({ name, label, register, error }: CustomPasswordInputProps) {
    const [showPassword, setShowPasswor] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPasswor((prev) => !prev);

    const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    return (
        <Grid
            item
            xs={12}
        >
            <FormControl
                variant='outlined'
                error={!!error}
                sx={{
                    width: '100%',
                }}
            >
                <InputLabel
                    required
                    htmlFor='password-input'
                >
                    {label}
                </InputLabel>
                <OutlinedInput
                    required
                    id={`${name}-input`}
                    type={showPassword ? 'text' : 'password'}
                    {...register}
                    fullWidth
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='Modifier la visibilité du mot de passe'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={label}
                />
            </FormControl>
            <Typography
                variant='inherit'
                color='error'
                mx={{
                    fontSize: '.8rem',
                    marginTop: 2,
                }}
            >
                {error?.message}
            </Typography>
        </Grid>
    );
}
