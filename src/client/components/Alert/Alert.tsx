import React, { SyntheticEvent, useEffect, useState } from 'react';

import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { removeAlert } from '../../../store/slices/alert.slice';
import { IAlertState } from '../../../types/alert.types';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }

export default function AlertComponent() {

    // Hooks
    const dispatch = useAppDispatch();

    // Store
    const alert = useAppSelector((state) => state.alert);

    // State
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('')
    const [type, setType] = useState<IAlertState['type']>(null)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        dispatch(removeAlert())
    };

    //
    useEffect(() => {
        if (alert.open) {
            setMessage(alert.message)
            setType(alert.type)
            setOpen(true)
        }

    }, [alert]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
        >
            <Alert
                onClose={handleClose}
                severity={type || undefined}
                sx={{ width: '100%' }}
                variant='filled'
                elevation={6}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
