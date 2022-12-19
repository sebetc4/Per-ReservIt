import { Box, CircularProgress, Container, Fade } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { AlertComponent, Header, Footer } from '../..';
import { logout } from '../../../../store/slices/auth.slice';
import { SessionStatus } from '../../../../types/api.types';
import { useAlert } from '../../../hooks';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {

    // Hooks
    const dispatch = useAppDispatch();
    const { setAlert } = useAlert();

    // Store
    const { isChecked: authIsChecked, sessionStatus } = useAppSelector((state) => state.auth);

    // State
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

    // Handle Invalid Session
    useEffect(() => {
        if (sessionStatus === SessionStatus.INVALID) {
            setAlert({ type: 'error', message: "Votre session n'est plus valide. Merci de vous reconnecter." });
            dispatch(logout())
        }
    });

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
