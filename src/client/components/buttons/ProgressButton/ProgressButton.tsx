import { Box, Button, CircularProgress, SxProps } from '@mui/material';
import React, { ReactNode } from 'react';

interface IProgressButtonProps {
    children: ReactNode;
    loading: boolean;
    variant?: 'text' | 'contained' | 'outlined';
    type?: 'button' | 'submit' | 'reset';
    buttonSx?: SxProps;
    circularProgressSx?: SxProps;
    handleButtonClick?: () => void;
}

export default function ProgressButton({
    children,
    loading,
    variant,
    type,
    buttonSx,
    circularProgressSx,
    handleButtonClick,
}: IProgressButtonProps) {
    return (
        <Box sx={{ m: 1, position: 'relative' }}>
            <Button
                type={type}
                variant={variant}
                sx={buttonSx}
                disabled={loading}
                onClick={handleButtonClick}
            >
                {children}
            </Button>
            {loading && (
                <CircularProgress
                    size={24}
                    sx={{
                        color: 'primary',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                        ...circularProgressSx,
                    }}
                />
            )}
        </Box>
    );
}
