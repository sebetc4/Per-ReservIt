import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <Box sx={{
            mt: 6,
            pt: 4,
            pb: 4,
            backgroundColor: '#3E6D9C'
        }}>

        <Container maxWidth='xl'>
            <Typography textAlign='center'>
                Reserv'It - <Link href='https://sebastien-etcheto.com'>Sébastien ETCHETO</Link>
            </Typography>
        </Container>
        </Box>
    );
}
