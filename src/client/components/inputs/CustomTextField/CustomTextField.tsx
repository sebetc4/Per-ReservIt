import { Grid, TextField, Typography } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type CustomTextField = {
    name: string;
    label: string;
    type: string;
    register: UseFormRegisterReturn;
    error: FieldError | undefined;
}

export default function CustomTextField({ name, label, type, register, error }: CustomTextField) {
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