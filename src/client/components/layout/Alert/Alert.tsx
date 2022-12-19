import React, { SyntheticEvent } from 'react';

import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { useAlert } from '../../../hooks/alert.hooks';

function SlideTransition(props: SlideProps) {
    
    // Hooks
    const { removeAlert } = useAlert();

    return (
        <Slide
            {...props}
            direction='up'
            onExited={removeAlert}
        />
    );
}

export default function AlertComponent() {

    // Hooks
    const { state: alert, closeAlert, removeAlert } = useAlert();

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        closeAlert();
    };

    return alert && (
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
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