'use client';
import * as React from 'react';
import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { logout } from '@/lib/actions/user.action';
import { SessionData } from '@/lib/session';

const pages = [{ name: 'studio', link: '/studio' }];

interface Props {
	sessionString: string;
}

const Navbar: FC<Props> = ({ sessionString }) => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const session: SessionData = JSON.parse(sessionString);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const logoutHandler = async () => {
		await logout();
	};

	const navLinkStyles = {
		color: 'inherit',
		textDecoration: 'none',
		textTransform: 'uppercase',
		'&:first-of-type': {
			marginRight: '1rem',
		},
	};

	const btnGroup = (
		<Box>
			<Typography component={Link} href="/register" sx={navLinkStyles}>
				Register
			</Typography>
			<Typography component={Link} href="/login" sx={navLinkStyles}>
				Login
			</Typography>
		</Box>
	);

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
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
							sx={{ display: { xs: 'block', md: 'none' } }}
						>
							{pages.map((page, index) => (
								<MenuItem key={index} onClick={handleCloseNavMenu}>
									<Typography
										component={Link}
										href={page.name === 'studio' ? page.link + `/${session.studioId}` : page.link}
										sx={{ textAlign: 'center', textDecoration: 'none' }}
									>
										{page.name}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page, index) => (
							<Button
								key={index}
								component={Link}
								href={page.link}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page.name}
							</Button>
						))}
					</Box>
					{session.isLoggedIn ? (
						<Box display="flex" sx={{ flexGrow: 0, alignItems: 'center' }}>
							<Typography marginRight={2}>{session.username}</Typography>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="John Doe" src="" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
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
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography
										component={Link}
										href={`/profile/${session.username}`}
										sx={{ textAlign: 'center', textDecoration: 'none' }}
									>
										Profile
									</Typography>
								</MenuItem>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography onClick={logoutHandler} sx={{ textAlign: 'center' }}>
										Logout
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
					) : (
						btnGroup
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navbar;
