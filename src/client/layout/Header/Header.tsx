import { useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const pages = [
    { name: 'Accueil', link: '/' },
    { name: 'Recettes', link: '/recipes' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function ResponsiveAppBar() {
    // Hooks
    const router = useRouter();

    // State
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [connected, setConnecter] = useState<boolean>(false);

    // Handlers
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);

    const handleCloseNavMenu = () => setAnchorElNav(null);

    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <AppBar
            position='static'
        >
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Link
                        href='/'
                        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                    >
                        <Typography
                            variant='logo'
                            noWrap
                            sx={{
                                mr: 4,
                                ml: 1,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                textDecoration: 'none',
                                fontSize: '1.8rem',
                                color: '#fafafa',
                            }}
                        >
                            Reserv'It
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                        >
                            {pages.map((page) => (
                                <Link
                                    key={page.name}
                                    href={page.link}
                                    style={{
                                        color: 'black',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>{page.name}</MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <NewspaperIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant='h5'
                        noWrap
                        component='a'
                        href=''
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Reserv'it
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link
                                key={page.name}
                                href={page.link}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        color: '#fafafa',
                                        display: 'block',
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                    }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {connected ? (
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
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting}
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign='center'>{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <Box>
                                <Button
                                    sx={{ mr: 4 }}
                                    onClick={() => router.replace('/sign-up')}
                                    color='secondary'
                                >
                                    Inscription
                                </Button>
                                <Button
                                    variant='contained'
                                    onClick={() => router.replace('/sign-in')}
                                    color='secondary'
                                >
                                    Connexion
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
