import { RefObject, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import {
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    MenuItem,
    Button,
    Tooltip,
    Avatar,
    Collapse,
    Grow,
    useTheme,
    Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Search } from '../..';
import { useAppSelector } from '../../../hooks/redux.hooks';
import { signOut } from 'next-auth/react';

interface IHeaderProps {
    showSearchBar: boolean;
    handleOpenSearchBar: () => void;
}

export default function Header({ showSearchBar, handleOpenSearchBar }: IHeaderProps) {
    // Hooks
    const theme = useTheme();
    const router = useRouter();
    const { isAuth } = useAppSelector((state) => state.user);

    // State
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [headerOnTop, setHeaderOnTop] = useState<boolean>(true);

    useEffect(() => {
        const handleHeaderOnTop = () => setHeaderOnTop(window.scrollY === 0);
        window.addEventListener('scroll', handleHeaderOnTop);
        handleHeaderOnTop();
        return () => {
            window.removeEventListener('scroll', handleHeaderOnTop);
        };
    }, []);

    const rightMenu = [
        {
            name: 'Réservations',
            action: () => router.replace('/bookings'),
        },
        {
            name: 'Profil',
            action: () => router.replace('/profile'),
        },
        {
            name: 'Déconnexion',
            action: async () => {
                await signOut({ redirect: false });
                router.replace('/');
            },
        },
    ];

    // Handlers
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);

    const handleCloseNavMenu = () => setAnchorElNav(null);

    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleClickOnRightMenuItem = (action: () => void) => {
        handleCloseUserMenu();
        action();
    };

    return (
        <AppBar
            position='fixed'
            sx={{
                pt: 1,
                pb: 1,
                transition: 'all .3s',
                boxShadow:
                    headerOnTop && !showSearchBar
                        ? 'none'
                        : '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                backgroundColor: headerOnTop && !showSearchBar ? 'transparent' : theme.palette.grey[100],
            }}
            color='default'
        >
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    {/* Mobile */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleOpenNavMenu}
                                color='inherit'
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            ></Menu>
                        </Box>
                        <Typography
                            variant='logo'
                            noWrap
                            sx={{
                                mr: 2,
                                flexGrow: 1,
                                fontWeight: 700,
                                fontSize: '1.5rem',
                                letterSpacing: '.2rem',
                                color: '#fafafa',
                                textDecoration: 'none',
                            }}
                        >
                            Reserv'it
                        </Typography>
                    </Box>

                    {/* Desktop */}
                    <Grid container>
                        {/* Left block */}
                        <Grid
                            item
                            xs={3}
                            sx={{ display: 'flex', alignItems: 'center'}}
                        >
                            <Link
                                href='/'
                                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                            >
                                <Typography
                                    variant='logo'
                                    noWrap
                                    color='primary'
                                    sx={{
                                        mr: 4,
                                        ml: 1,
                                        display: { xs: 'none', md: 'flex' },
                                        fontWeight: 700,
                                        letterSpacing: '.2rem',
                                        textDecoration: 'none',
                                        fontSize: '1.8rem',
                                    }}
                                >
                                    Reserv'It
                                </Typography>
                            </Link>
                        </Grid>

                        {/* Middle Block */}
                        <Grid
                            item
                            xs={6}
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Grow
                                in={!showSearchBar}
                                appear={false}
                            >
                                <Button
                                    onClick={handleOpenSearchBar}
                                    variant='outlined'
                                    sx={{
                                        borderRadius: '2rem',
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        padding: 0,
                                        pl: 2,
                                        overflow: 'hidden',
                                    }}
                                >
                                    Une idée de destination? Recherchez votre hebergement
                                    <Box
                                        sx={{
                                            backgroundColor: '#E14D2A',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '3rem',
                                            width: '3rem',
                                            ml: 2,
                                        }}
                                    >
                                        <SearchIcon sx={{ color: '#f7f7f7' }} />
                                    </Box>
                                </Button>
                            </Grow>
                        </Grid>

                        {/* Right Block */}
                        <Grid
                            item
                            xs={3}
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            {isAuth ? (
                                <>
                                    <Tooltip title='Open settings'>
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            <Avatar alt='Remy Sharp' />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id='menu-appbar'
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {rightMenu.map((item) => (
                                            <MenuItem
                                                key={item.name}
                                                onClick={() => handleClickOnRightMenuItem(item.action)}
                                            >
                                                <Typography textAlign='center'>{item.name}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ) : (
                                <Box>
                                    <Button
                                        sx={{ mr: 4 }}
                                        onClick={() => router.replace('/signup')}
                                    >
                                        Inscription
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        onClick={() => router.replace('/login')}
                                    >
                                        Connexion
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
                <Box>
                    <Collapse in={showSearchBar}>
                        <Search />
                    </Collapse>
                </Box>
            </Container>
        </AppBar>
    );
}
