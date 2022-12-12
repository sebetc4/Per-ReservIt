import React, { useEffect, useState } from 'react';

import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { removeAlert } from '../../../../store/slices/alert.slice';

function SlideTransition(props: SlideProps) {
    const dispatch = useAppDispatch();

    return (
        <Slide
            {...props}
            direction='up'
            onExited={() => dispatch(removeAlert())}
        />
    );
}

export default function AlertComponent() {
    // Hooks

    // Store
    const {open, message, type} = useAppSelector((state) => state.alert);

    // State
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
    };

    //
    useEffect(() => {
        open && setShowAlert(true)
    }, [open]);

    return (
        <Snackbar
            open={showAlert}
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
