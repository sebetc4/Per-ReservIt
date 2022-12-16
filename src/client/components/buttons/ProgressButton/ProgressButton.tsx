import { Box, Button, CircularProgress, SxProps } from '@mui/material';
import React, { ReactNode } from 'react';

type ProgressButtonProps = {
    children: ReactNode;
    isLoading: boolean;
    disabled: boolean;
    variant?: 'text' | 'contained' | 'outlined';
    type?: 'button' | 'submit' | 'reset';
    buttonSx?: SxProps;
    circularProgressSx?: SxProps;
    handleOnClick?: () => void;
    fullWidth?: boolean;
    size?: 'small' | 'medium' | 'large'
    onClick?: (event: MouseEvent) => void;
};

export default function ProgressButton({
    children,
    isLoading,
    disabled,
    variant,
    type,
    buttonSx,
    circularProgressSx,
    handleOnClick,
    fullWidth = false,
    size = 'medium',
}: ProgressButtonProps) {
    return (
        <Box sx={{ width: fullWidth? '100%' : 'auto', m: 1, position: 'relative' }}>
            <Button
                type={type}
                variant={variant}
                sx={buttonSx}
                disabled={disabled}
                onClick={handleOnClick}
                fullWidth
                size={size}
            >
                {children}
            </Button>
            {isLoading && (
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
