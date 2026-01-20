import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Button, FormControl, InputLabel, Select, Tooltip} from "@mui/material";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AddchartIcon from '@mui/icons-material/Addchart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import ElevatorIcon from '@mui/icons-material/Elevator';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MemoryIcon from '@mui/icons-material/Memory';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";


import {Link, Outlet, useLocation} from "react-router-dom";
import {logout} from "../../store/auth/authAction";
import LoginFormDialog from "../auth/login-form";
import RegisterFormDialog from "../auth/register-form";
import {ColorModeContext} from "../../App";
import LanguageSelect from "./language-select";
import {useTranslation} from "react-i18next";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function Layout() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const { t } = useTranslation();

    const [open, setOpen] = React.useState(false);
    const isLogin = useSelector(state => state.user.is_authorized);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const pages = [
        {text: t('navigation.products'), href:"products"},
        {text: t('navigation.pricing'), href:"pricing"},
        {text: t('navigation.devblog'), href:"devblog"}
    ]


    const dashboardPages = [
        {text: t('navigation.qualifications'), href: "qualifications", icon: <ElevatorIcon color={useLocation().pathname === "/qualifications" ? "primary" : "action"}/>},
        {text: t('navigation.workers'), href: "workers", icon: <AccessibilityNewIcon color={useLocation().pathname === "/workers" ? "primary" : "action"}/>},
        {text: t('navigation.tasks'), href: "tasks", icon: <AddchartIcon color={useLocation().pathname === "/tasks" ? "primary" : "action"}/>},
        {text: t('navigation.tasks_appointments'), href: "tasks-appointments", icon: <ReceiptLongIcon color={useLocation().pathname === "/tasks-appointments" ? "primary" : "action"}/>},
        {text: t('navigation.workers_logs'), href: "workers-logs", icon: <MenuBookIcon color={useLocation().pathname === "/workers-logs" ? "primary" : "action"}/>},
        {text: t('navigation.iot'), href: "iot", icon: <MemoryIcon color={useLocation().pathname === "/iot" ? "primary" : "action"}/>},
        {text: t('navigation.voting'), href: "voting", icon: <ThumbsUpDownOutlinedIcon color={useLocation().pathname === "/voting" ? "primary" : "action"}/>},
        {text: t('navigation.auto_appointment'), href: "auto-appointment", icon: <IntegrationInstructionsIcon color={useLocation().pathname === "/auto-appointment" ? "primary" : "action"}/>}
    ];

    const additionalPages = [
        {text: t('navigation.tech_support'), href: "tech-support", icon: <HelpOutlineSharpIcon color={useLocation().pathname === "/tech-support" ? "primary" : "action"}/>},
        {text: t('navigation.offers'), href: "offers", icon: <ShoppingBasketIcon color={useLocation().pathname === "/offers" ? "primary" : "action"}/>},
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        const res = dispatch(logout());
        res.then((value) => {
            if (value.error) {
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
            } else {
                handleCloseUserMenu();
            }
        });
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    {isLogin ? (
                        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
                                    sx={{marginRight: 5, ...(open && {display: 'none'}),}}>
                            <MenuIcon/>
                        </IconButton>) : null}
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        component={Link}
                        to={""}
                    >
                        WorkerOnline
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <ArrowDropDownCircleIcon/>
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
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.text} onClick={handleCloseNavMenu} component={Link} to={page.href}>
                                    <Typography textAlign="center">{page.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h7"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        component={Link}
                        to={""}
                    >
                        WorkerOnline
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.text}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                                component={Link} to={page.href}
                            >
                                {page.text}
                            </Button>
                        ))}
                    </Box>

                    <LanguageSelect/>

                    <Box
                        sx={{flexGrow: 0}}
                    >
                        <IconButton sx={{ml: 1, mr: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Box>
                    {isLogin ? (
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenUserMenu}
                                    color="inherit"
                                >
                                    <AccountCircle fontSize={"large"}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
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
                                <MenuItem component={Link} to={'profile'} key={'profile'}>
                                    <Typography textAlign="center">{t('ProfilePage.profile')}</Typography>
                                </MenuItem>
                                <MenuItem key={'logout'} onClick={handleLogout}>
                                    <Typography textAlign="center">{t('ProfilePage.logout')}</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (<><LoginFormDialog/> | <RegisterFormDialog/></>)}
                </Toolbar>
            </AppBar>
            {isLogin ?
                (<Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                        {dashboardPages.map((page) => (
                            <ListItem key={page.text} disablePadding sx={{display: 'block'}}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        ustifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    component={Link}
                                    to={page.href}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {page.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={page.text} sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        {additionalPages.map((page) => (
                            <ListItem key={page.text} disablePadding sx={{display: 'block'}}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        ustifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    component={Link}
                                    to={page.href}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {page.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={page.text} sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>) : null}
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                <Outlet/>
            </Box>
        </Box>
    );
}