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
import { AccountCircle, CategoryOutlined, Diversity3, Logout, NotificationsNone, PaidOutlined, PeopleAltOutlined, Search, Settings, SettingsOutlined, ShoppingCartCheckout, ShoppingCartOutlined, SpaceDashboardOutlined, ViewStreamOutlined } from '@mui/icons-material';
import { Avatar, Badge, Button, ClickAwayListener, Collapse, MenuItem, Stack } from '@mui/material';
import { LOGOUT } from '../login/graphql/mutation';
import LoadingBar from '../../common/loadingBar/LoadingBar';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@apollo/client';
import { CLIENT_DETAILS, ME } from '../../graphql/query';
import SmallNotification from './notification/SmallNotification';
import OrderPayment from './payment/OrderPayment';
import CDialog from '../../common/dialog/CDialog';
import { UNREAD_NOTIFICATION_COUNT, USER_NOTIFICATIONS } from './notification/query';
import { googleLogout } from '@react-oauth/google';
import { ADDED_EMPLOYEE_CARTS } from './staffsOrder/graphql/query';
import StaffsOrder from './staffsOrder/Index';
import CDrawer from './CDrawer';
import { ADDED_PRODUCTS } from './products/graphql/query';

const drawerWidth = 300;

const ListBtn = ({ style, text, icon, link, selected, onClick, notification }) => {
  return (
    <Link onClick={onClick} className='link' to={link ? link : ''}>
      <Box sx={{
        width: '100%',
        display: 'inline-flex',
        alignItems: 'center',
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
        {notification && <Badge sx={{ ml: 2, mr: .5 }} badgeContent={notification} color="error" />}
      </Box>
    </Link>
  )
};


function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUsermenuOpen] = useState(null);
  const [openEmail, setOpenEmail] = useState(false)
  const [openNotification, setOpenNotification] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false)
  const [unreadNotificationCount, setUnreadNotificationCount] = useState([])
  const [clientDetails, setClientDetails] = useState({})
  const [addedProducts, setAddedProducts] = useState([]);



  useQuery(CLIENT_DETAILS, {
    onCompleted: (res) => {
      setClientDetails(res.clientDetails)
    },
  });

  useQuery(ADDED_PRODUCTS, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddedProducts(res.addedProducts.edges.map(item => item.node))
    }
  });


  const { data: user } = useQuery(ME)

  const [logout, { loading }] = useMutation(LOGOUT, {
    onCompleted: (res) => {
      localStorage.clear()
      toast.success(res.message)
      window.location.href = '/'
    },
  });

  useQuery(UNREAD_NOTIFICATION_COUNT, {
    onCompleted: (res) => {
      setUnreadNotificationCount(res.unreadNotificationCount)
    }
  });


  const handleLogout = () => {
    logout()
    googleLogout()
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
    <Box>
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
        {
          user?.me.company?.isBlocked &&
          <Stack alignItems='center' sx={{
            bgcolor: '#F7DCD9',
            p: '5px 30px',
            color: 'red',
            borderRadius: '4px',
            mb: 1
          }}>
            <Typography sx={{ fontWeight: 600 }}>
              Account Restricted.
            </Typography>
            <a style={{ fontSize: '13px' }} href={`https://wa.me/${clientDetails?.contact}`} target='blank'>Contact</a>
          </Stack>
        }
        <Typography sx={{
          padding: '10px 12px',
          width: '100%',
          color: 'primary.main',
          bgcolor: 'light.main',
          borderRadius: '4px',
          fontSize: '15px',
          textAlign: 'center',
          position: 'relative'
        }}>
          Deal: <b>{user?.me.company?.name}</b>
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
            <Typography>Due: <b>{user?.me.company.balance}</b>  kr</Typography>
            <Button
              disabled={user?.me.company?.isBlocked}
              onClick={() => setOpenPaymentDialog(true)}
              variant='outlined'
              size='small'
            >
              Pay by Vipps
            </Button>
          </Stack>
        }
        {
          (user?.me.role === 'company-employee') &&
          <Stack gap={.5} justifyContent='center' sx={{
            padding: '10px 12px',
            color: 'red',
            bgcolor: '#F7DCD9',
            borderRadius: '4px',
            fontSize: '15px',
            textAlign: 'center',
            display: user?.me.company.balance > 0 ? 'flex' : 'none'
          }}>
            <Typography>Due Amount: <b>{user?.me?.dueAmount}</b>  kr</Typography>
            <Button
              disabled={user?.me.company?.isBlocked || user?.me?.dueAmount === '0.00'}
              onClick={() => setOpenPaymentDialog(true)}
              variant='outlined'
              size='small'
            >
              Pay Now
            </Button>
          </Stack>
        }
      </Stack>
      {/* payment page */}
      <CDialog openDialog={openPaymentDialog} >
        <OrderPayment closeDialog={() => setOpenPaymentDialog(false)} />
      </CDialog>
      {/* drawer item */}
      <CDrawer handleDrawerClose={handleDrawerClose} />
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

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Typography sx={{
              fontSize: { xs: '14px', md: '18px' },
              fontWeight: 600,
              color: 'red', mr: { xs: 0, md: 4 }
            }}>Test Mode</Typography>
            <Link to='/dashboard/cart'>
              <IconButton>
                <Badge badgeContent={addedProducts.length} color='warning'>
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </Link>
            {/* small notification */}
            <ClickAwayListener onClickAway={() => setOpenNotification(false)}>
              <Box sx={{
                position: 'relative'
              }}>
                <IconButton onClick={() => (
                  setOpenNotification(!openNotification),
                  setOpenEmail(false)
                )} sx={{ color: 'darkgray' }} color="inherit"
                >
                  <Badge badgeContent={unreadNotificationCount} color="warning">
                    <NotificationsNone />
                  </Badge>
                </IconButton>
                {
                  openNotification &&
                  <Collapse sx={{
                    position: 'absolute',
                    left: { xs: '50%', md: '0' },
                    transform: 'translateX(-50%)',
                    top: 55,
                  }} in={openNotification}>
                    <SmallNotification onClose={() => setOpenNotification(false)} />
                  </Collapse>
                }
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