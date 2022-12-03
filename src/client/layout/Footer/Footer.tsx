import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <Container maxWidth='xl'>
            <Typography textAlign='center'>
                Reserv'It - <Link href='https://sebastien-etcheto.com'>Sébastien ETCHETO</Link>
            </Typography>
        </Container>
    );
}
