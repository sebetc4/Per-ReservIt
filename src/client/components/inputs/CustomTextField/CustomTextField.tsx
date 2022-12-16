import { Grid, TextField, Typography } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type CustomTextField = {
    name: string;
    label: string;
    type: string;
    register: UseFormRegisterReturn;
    disabled?: boolean;
    error: FieldError | undefined;
}

export default function CustomTextField({ name, label, type, register, error, disabled }: CustomTextField) {
    return (
        <Grid
            item
            xs={12}
        >
            <TextField
                required
                id={`${name}-input`}
                label={label}
                variant='outlined'
                type={type}
                fullWidth
                disabled={disabled}
                {...register}
                error={!!error}
            />
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