/* eslint-disable react/prop-types */
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useLocation, useMatch } from 'react-router-dom';
import { AccountCircle, CategoryOutlined, Diversity3, DoubleArrow, Lock, LockOutlined, Logout, MailOutline, NotificationsNone, PaidOutlined, PeopleAltOutlined, Search, Settings, SettingsOutlined, SpaceDashboardOutlined, ViewStreamOutlined } from '@mui/icons-material';
import { Avatar, Badge, Button, ClickAwayListener, Collapse, InputAdornment, ListItemText, Menu, MenuItem, Paper, Stack, TextField, Tooltip } from '@mui/material';
import { LOGOUT } from '../login/graphql/mutation';
import LoadingBar from '../../common/loadingBar/LoadingBar';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@apollo/client';
import { ME } from '../../graphql/query';
import SmallNotification from './notification/SmallNotification';
import OrderPayment from './payment/OrderPayment';
import CDialog from '../../common/dialog/CDialog';

const drawerWidth = 264;

const ListBtn = ({ style, text, icon, link, selected, onClick, notification }) => {
  return (
    <Link onClick={onClick} className='link' to={link ? link : ''}>
      <Box sx={{
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'space-between',
        padding: '8px 12px',
        borderRadius: '4px',
        color: selected ? '#fff' : '#68686F',
        mb: 1,
        cursor: 'pointer',
        bgcolor: selected ? 'primary.main' : '',
        ...style
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          <Typography sx={{
            color: 'gray',
            fontSize: '15px',
            ml: 1
          }}>{text}</Typography>
        </Box>
        {notification && <Typography sx={{
          fontSize: '14px',
          color: '#fff',
          width: '22px',
          height: '22px',
          lineHeight: '21px',
          textAlign: 'center',
          borderRadius: '50%',
          bgcolor: 'primary.dark'
        }}>{notification}</Typography>}

      </Box>
    </Link>
  )
};

const paperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}


function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUsermenuOpen] = useState(null);
  const [openEmail, setOpenEmail] = useState(false)
  const [openNotification, setOpenNotification] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false)

  const { pathname } = useLocation()

  const productDetailsMatchFromMyside = useMatch('/dashboard/from-myside/products/:id')
  const productDetailsMatchFromProducts = useMatch('/dashboard/from-products/products/:id')
  const orderDetailsMatch = useMatch('/dashboard/orders/details/:id')

  const { data: user } = useQuery(ME)

  const [logout, { loading }] = useMutation(LOGOUT, {
    onCompleted: (res) => {
      localStorage.clear()
      toast.success(res.message)
      window.location.href = '/'
    },
  });

  const handleLogout = () => {
    logout()
    localStorage.clear()
    window.location.href = '/'
  }

  const handleDrawerClose = () => {
    setDrawerOpen(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setDrawerOpen(false);
  };
  const handleDrawerToggle = () => {
    if (!drawerOpen) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'center', mt: 2
      }}>
        <Link to='/'>
          <Box sx={{
            width: { xs: '150px', md: '180px' }
          }}>
            <img style={{ width: '100%' }} src="/Logo.svg" alt="" />
          </Box>
        </Link>
      </Toolbar>
      <Stack sx={{ width: '100%', px: 2, my: 3 }} gap={1}>
        <Typography sx={{
          padding: '10px 12px',
          width: '100%',
          color: user?.me.company.isBlocked ? 'gray' : 'primary.main',
          bgcolor: user?.me.company.isBlocked ? 'red' : 'light.main',
          borderRadius: '4px',
          fontSize: '15px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <Lock sx={{
            position: 'absolute',
            display: user?.me.company.isBlocked ? 'block' : 'none',
            color: '#fff',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
          }} />
          Deal: <b>{user?.me.company.name}</b>
        </Typography>
        {
          (user?.me.role === 'company-owner' || user?.me.role === 'company-manager') &&
          <Stack gap={.5} justifyContent='center' sx={{
            padding: '10px 12px',
            color: 'red',
            bgcolor: '#F7DCD9',
            borderRadius: '4px',
            fontSize: '15px',
            textAlign: 'center',
            display: user?.me.company.balance > 0 ? 'flex' : 'none'
          }}>
            <Typography>Due Amount: <b>{user?.me.company.balance}</b>  kr</Typography>
            <Button disabled={user?.me.company.isBlocked} onClick={() => setOpenPaymentDialog(true)} variant='outlined' size='small'>Pay Now</Button>
          </Stack>
        }
      </Stack>
      {/* payment page */}
      <CDialog openDialog={openPaymentDialog} >
        <OrderPayment closeDialog={() => setOpenPaymentDialog(false)} />
      </CDialog>
      <Stack>
        <ListBtn
          onClick={handleDrawerClose}
          notification={''}
          link='/dashboard/myside'
          icon={<SpaceDashboardOutlined fontSize='small' />}
          text='My Side'
          selected={
            pathname === '/dashboard/myside'
            || pathname === '/dashboard/myside/cart'
            || pathname === '/dashboard/myside/checkout'
            || pathname === '/dashboard/myside/complete'
            || pathname === productDetailsMatchFromMyside?.pathname
          } />
        {
          (user?.me.role === 'company-owner' || user?.me.role === 'company-manager') &&
          <ListBtn
            onClick={handleDrawerClose}
            link='/dashboard/manage-staff'
            icon={<PeopleAltOutlined fontSize='small' />}
            text='Manage Staff'
            selected={pathname === '/dashboard/manage-staff'}
          />
        }
        {/* <Typography sx={{
          color: '#C2C2C2',
          textTransform: 'uppercase',
          fontSize: '14px', my: 2
        }}>Company</Typography> */}
        {
          (user?.me.role === 'company-owner' || user?.me.role === 'company-manager') &&
          <ListBtn
            onClick={handleDrawerClose}
            link='/dashboard/meetings'
            icon={<Diversity3 fontSize='small' />}
            text='Meeting-Schedule'
            selected={pathname === '/dashboard/meetings'}
          />
        }
        <ListBtn
          onClick={handleDrawerClose}
          notification={''}
          link={'dashboard/products'}
          icon={<CategoryOutlined fontSize='small' />}
          text='Products'
          selected={
            pathname === '/dashboard/products'
            || pathname === '/dashboard/products/cart'
            || pathname === '/dashboard/products/checkout'
            || pathname === productDetailsMatchFromProducts?.pathname
          } />
        <ListBtn
          onClick={handleDrawerClose}
          notification={''}
          link={'dashboard/staffs-order'}
          icon={<PeopleAltOutlined fontSize='small' />}
          text='Staffs-Order-Req'
          selected={pathname === '/dashboard/staffs-order'}
        />
        <ListBtn
          onClick={handleDrawerClose}
          notification={''}
          link={'dashboard/orders'}
          icon={<ViewStreamOutlined fontSize='small' />}
          text='Orders-History'
          selected={pathname === '/dashboard/orders' || pathname == orderDetailsMatch?.pathname}
        />
        <ListBtn
          onClick={handleDrawerClose}
          notification={''}
          link={'dashboard/payments-history'}
          icon={<PaidOutlined fontSize='small' />}
          text='Payments-History'
          selected={pathname === '/dashboard/payments-history'}
        />
        <ListBtn
          onClick={handleDrawerClose}
          link={'dashboard/setting'}
          icon={<SettingsOutlined fontSize='small' />}
          text='Setting'
          selected={pathname === '/dashboard/setting'}
        />
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {loading && <LoadingBar />}
      <AppBar
        color='white'
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box />
          {/* <TextField sx={{
            mr: { xs: 0, sm: 2, md: 20 },
            maxWidth: '700px',
            width: '100%'
          }}
            size='small'
            placeholder='Type to search'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{
                    display: { xs: 'none', md: 'block' }
                  }} />
                </InputAdornment>
              )
            }}
          /> */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            {/* <ClickAwayListener onClickAway={() => setOpenEmail(false)}>
              <Box sx={{
                position: 'relative'
              }}>
                <IconButton onClick={() => (
                  setOpenEmail(!openEmail),
                  setOpenNotification(false)
                )} sx={{ color: 'darkgray' }}>
                  <Badge badgeContent={0} color="error">
                    <MailOutline />
                  </Badge>
                </IconButton>
                <Collapse sx={{
                  position: 'absolute',
                  right: { xs: -80, md: 0 },
                  top: 55,
                  zIndex: 9999999
                }} in={openEmail}>
                  <Box sx={{
                    width: { xs: '90vw', sm: '300px', md: '350px' },
                    maxHeight: '500px',
                    overflowY: 'auto',
                    bgcolor: '#fff',
                    border: '1px solid gray',
                    borderRadius: '8px', p: '10px 20px',
                  }}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsam asperiores quasi dolor, recusandae sequi ducimus nam labore impedit quam?</p>
                  </Box>
                </Collapse>
              </Box>
            </ClickAwayListener> */}

            <ClickAwayListener onClickAway={() => setOpenNotification(false)}>
              <Box sx={{
                position: 'relative'
              }}>
                <IconButton onClick={() => (
                  setOpenNotification(!openNotification),
                  setOpenEmail(false)
                )} sx={{ color: 'darkgray' }} color="inherit"
                >
                  <Badge badgeContent={2} color="error">
                    <NotificationsNone />
                  </Badge>
                </IconButton>
                <Collapse sx={{
                  position: 'absolute',
                  left: { xs: '50%', md: '0' },
                  transform: 'translateX(-50%)',
                  top: 55,
                }} in={openNotification}>
                  <Box sx={{
                    width: { xs: '300px', sm: '300px', md: '350px' },
                    maxHeight: '800px',
                    overflowY: 'auto',
                    zIndex: 99999,
                    bgcolor: '#fff',
                    border: '1px solid lightgray',
                    borderRadius: '8px', p: '10px 20px',
                  }}>
                    <SmallNotification />
                  </Box>
                </Collapse>
              </Box>
            </ClickAwayListener>
            {/* user menu */}
            <ClickAwayListener onClickAway={() => setUsermenuOpen(false)}>
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  disableRipple
                  onClick={() => setUsermenuOpen(!userMenuOpen)}
                  size="small"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar src={user?.me.photoUrl ? user?.me.photoUrl : ''} sx={{ width: 32, height: 32 }} />
                  <Box ml={1}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{user?.me.username}</Typography>
                    <Typography sx={{
                      fontSize: '12px',
                      bgcolor: user?.me.role === 'company-manager' ?
                        'primary.main' : user?.me.role === 'company-owner' ?
                          'purple' : 'gray.main',
                      px: 1, borderRadius: '50px',
                      color: user?.me.role === 'company-manager' ?
                        '#fff' : user?.me.role === 'company-owner' ?
                          '#fff' : 'inherit',
                    }}>{user?.me.role.replace('company-', '')}</Typography>
                  </Box>
                </IconButton>

                <Collapse sx={{
                  position: 'absolute',
                  top: 65,
                  right: 0,
                  minWidth: '250px',
                  pt: 2,
                  bgcolor: '#fff',
                  boxShadow: 3,
                  borderRadius: '8px'
                }} in={userMenuOpen}>
                  <Stack sx={{ width: '100%' }} alignItems='center'>
                    <Avatar src={user?.me.photoUrl ?? ''} sx={{ width: '100px', height: '100px', mb: 2 }} />
                    <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>{user?.me.username}</Typography>
                    <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>{user?.me.email}</Typography>
                    <Typography sx={{ textAlign: 'center', fontSize: '14px', mb: 2 }}>{user?.me.phone}</Typography>
                    {/* <MenuItem onClick={() => setUsermenuOpen(false)}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem> */}
                    <Divider sx={{ width: '100%' }} />
                    <MenuItem onClick={() => (
                      setUsermenuOpen(false),
                      handleLogout()
                    )}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Stack>
                </Collapse>

                {/* <Menu
                sx={{ p: 3 }}
                anchorEl={userMenuOpen}
                id="account-menu"
                open={open}
                onClose={handleUserMenuClose}
                onClick={handleUserMenuClose}
                PaperProps={paperProps}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Link className='link' to='/dashboard/setting'>
                  <MenuItem sx={{ width: '200px' }} onClick={handleUserMenuClose}>
                    <Stack sx={{ width: '100%' }} alignItems='center'>
                      <Avatar />
                      <Typography>{user?.me.username}</Typography>
                      <Typography>{user?.me.email}</Typography>
                    </Stack>
                  </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={handleUserMenuClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => (
                  handleUserMenuClose(),
                  handleLogout()
                )}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                    </MenuItem>
                    </Menu> */}
              </Box>
            </ClickAwayListener>
            {/* user menu end */}
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1, p: 3,
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` }

        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;