import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import { Image } from 'mui-image';
import logo from '../../images/logo.png';
import './Header.css';
import api from '../Api/Api';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn) {
      if (!localStorage.getItem('wishlist')) {
        createWishList()
      }
    }
  }, [isUserLoggedIn])

  const createWishList = async () => {
    const user = localStorage.getItem('user_id');
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ user });
    try {
      const { data } = api.post("order/wishlist/", body, config);
      localStorage.setItem('wishlist', data.id);
    } catch (err) {
      console.log(err);
    }
  }

  const openNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const openUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeNavMenu = () => {
    setAnchorElNav(null);
  };

  const closeUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = isUserLoggedIn ? [
    "Courses",
    "Categories",
    "Wishlist",
    "Cart",
    "Profile",
    "Dashboard"
  ] : [
    "Courses",
    "Categories",
    "Wishlist",
    "Cart",
    "Login",
    "Signup"
  ];

  const logout = () => {
    const token = localStorage.getItem('auth_token');
    const config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    api.post("auth/token/logout/", token, config);
    localStorage.removeItem('auth_token');
    setIsUserLoggedIn(false);
  };

  const renderUserSettings = () => {
    if (isUserLoggedIn) {
      return (
        <>
          <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
            <Avatar alt="user's avatar" src="" />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={closeUserMenu}
          >
            <MenuItem onClick={closeUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={closeUserMenu}>
              <Typography textAlign="center">Dashboard</Typography>
            </MenuItem>
            <MenuItem onClick={logout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </>
      )
    } else {
      return (
        <>
          <Link className='nav-el secondary-btn' to='/login'>
            Login
          </Link>
          <Link className='nav-el primary-btn' to='/signup'>
            Signup
          </Link>
        </>
      )
    }
  }

  const renderDesktopView = () => {
    return (
      <>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, marginLeft: 5 }}>
          <Link className='nav-el' to='/'>
            <Image sx={{ maxWidth: '48px' }} src={logo} />
          </Link>
          <Stack direction="row" spacing={3}
            sx={{ marginLeft: 5 }}
          >
            <Link className='nav-el' to='/courses'>
              Courses
            </Link>
            <Link className='nav-el' to='/categories'>
              Categories
            </Link>
            <Link className='nav-el' to='/contact'>
              Contact
            </Link>
          </Stack>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, marginRight: 5 }}>
          <Stack direction="row" spacing={3}>
            <Link className='nav-el' to='/wishlist'>
              <IconButton sx={{ color: '#fafafa', p: 0 }}>
                <Badge badgeContent={0} color="secondary">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Link>
            <Link className='nav-el' to='/cart'>
              <IconButton sx={{ color: '#fafafa', p: 0 }}>
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            {renderUserSettings()}
          </Stack>
        </Box>
      </>
    )
  }

  const renderMobileView = () => {
    return (
      <>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, marginLeft: 2 }}>
          <IconButton
            size="large"
            aria-label="navigation menu"
            aria-controls="nav-menu"
            aria-haspopup="true"
            onClick={openNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="nav-menu"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={closeNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map(page => (
              <MenuItem key={page} onClick={closeNavMenu}>
                <Link 
                  to={`./${page.toLowerCase()}`} 
                  style={{textDecoration: 'none', color: '#212121'}}>
                  {page}
                </Link>
              </MenuItem>
            ))}
            <MenuItem onClick={logout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <Link className='nav-el' to='/'>
            <Image sx={{ maxWidth: '48px' }} src={logo} />
          </Link>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" }, marginRight: 3}}>
          <Stack direction="row" spacing={3}>
            <Link className='nav-el' to='/wishlist'>
              <Badge badgeContent={0} color="secondary">
                <FavoriteIcon />
              </Badge>
            </Link>
            <Link className='nav-el' to='/cart'>
              <Badge badgeContent={0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </Stack>
        </Box>
      </>
    )
  }

  return (
    <AppBar sx={{ backgroundColor: "#212121" }}>
      <Toolbar disableGutters>
          {renderDesktopView()}
          {renderMobileView()}
        </Toolbar>
    </AppBar>
  );
};

export default Header;