import React, { SyntheticEvent, useEffect, useState } from 'react';

import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { removeAlert } from '../../../store/slices/alert.slice';

export default function AlertComponent() {

    // Store
    const alert = useAppSelector((state) => state.alert);

    // State
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // 
    useEffect(() => {
        !!alert.type && setOpen(true);
    }, [alert]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={alert.type || undefined}
                sx={{ width: '100%' }}
                variant='filled'
                elevation={6}
            >
                {alert.message}
            </Alert>
        </Snackbar>
    );
}
