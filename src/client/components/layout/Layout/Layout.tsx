import { Box, CircularProgress, Container, Fade } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { AlertComponent, Header, Footer  } from '../..';
import { useAppSelector } from '../../../hooks/redux.hooks';

interface ILayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {

    // Store
    const { loading } = useAppSelector((state) => state.user);

    // State
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

    // Handlers
    const handleOpenSearchBar = () => setShowSearchBar(true);
    const handleCloseSearchBar = () => setShowSearchBar(false);

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

    return !loading ? (
        <>
            {/* Header */}
            <Header
                showSearchBar={showSearchBar}
                handleOpenSearchBar={handleOpenSearchBar}
            />

            {/* Main */}
            <Container
                maxWidth='xl'
                component='main'
                sx={{
                    mt: '80px',
                    pt: 6,
                    pb: 6,
                }}
            >
                {children}
            </Container>

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
