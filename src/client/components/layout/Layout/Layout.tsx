import { Box, CircularProgress, Container, Fade } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { AlertComponent, Header, Footer } from '../..';
import { setAlert } from '../../../../store/slices/alert.slice';
import { CustomError } from '../../../../types/api.types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {

    // Hooks
    const dispatch = useAppDispatch();

    // Store
    const { isChecked: authIsChecked, error: authError } = useAppSelector((state) => state.auth);

    // State
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

    useEffect(() => {
        authError === CustomError.INVALID_TOKEN.message &&
            dispatch(setAlert({ type: 'error', message: 'Votre session n\'est plus valide. Merci de vous reconnecter.' }));
    }), [authError];

    // Handle body style when toggle showSearchBar
    useEffect(() => {
        if (showSearchBar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showSearchBar]);

    // Handlers
    const handleOpenSearchBar = () => setShowSearchBar(true);
    const handleCloseSearchBar = () => setShowSearchBar(false);

    return authIsChecked ? (
        <>
            {/* Header */}
            <Header
                showSearchBar={showSearchBar}
                handleOpenSearchBar={handleOpenSearchBar}
            />

            {/* Main */}
            <Box
                component='main'
                sx={{
                    width: '100%',
                    position: 'relative',
                    minHeight: `calc(100vh - 201px)`,
                    display: 'flex',
                    mt: '80px',
                    pt: 6,
                    pb: 6,
                }}
            >
                {children}
            </Box>

            {/* Footer */}
            <Footer />

            {/* Alert */}
            <AlertComponent />

            {/* Overlay */}
            <Fade in={showSearchBar}>
                <Box
                    sx={{
                        position: 'fixed',
                        zIndex: '1',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    }}
                    onClick={handleCloseSearchBar}
                />
            </Fade>
        </>
    ) : (
        <Container sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Container>
    );
}
