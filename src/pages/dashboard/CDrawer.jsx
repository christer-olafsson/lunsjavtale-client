/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  AutoAwesomeMotion,
  CategoryOutlined,
  Diversity3,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  LocalPolice,
  NotificationsNoneOutlined,
  PaidOutlined,
  PeopleAltOutlined,
  SettingsOutlined,
  ShoppingCart,
  ShoppingCartCheckout,
  ShoppingCartOutlined,
  SpaceDashboard,
  StickyNote2,
  ViewStreamOutlined,
  Workspaces,
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Badge,
  Collapse,
  Stack,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/query';
import { UNREAD_NOTIFICATION_COUNT } from './notification/query';
import { ADDED_EMPLOYEE_CARTS } from './staffsOrder/graphql/query';
import { ADDED_PRODUCTS } from './products/graphql/query';

const CDrawer = ({ handleDrawerClose }) => {
  const [expandedNavlinkIndex, setExpandedNavlinkIndex] = useState(null);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState([])
  const [addedEmployeeCarts, setAddedEmployeeCarts] = useState([])
  const [addedProducts, setAddedProducts] = useState([]);



  const { data: user } = useQuery(ME)
  const isStaff = user?.me.role === 'company-employee'

  useQuery(UNREAD_NOTIFICATION_COUNT, {
    onCompleted: (res) => {
      setUnreadNotificationCount(res.unreadNotificationCount)
    }
  });
  useQuery(ADDED_EMPLOYEE_CARTS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddedEmployeeCarts(res.addedEmployeeCarts.edges.map(item => item.node))
    },
  });
  useQuery(ADDED_PRODUCTS, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddedProducts(res.addedProducts.edges.map(item => item.node))
    }
  });


  const handleExpandedNavlink = (index) => {
    setExpandedNavlinkIndex(expandedNavlinkIndex === index ? null : index);
  };


  const navItems = [
    { name: 'My Side', icon: <SpaceDashboard />, path: '/dashboard/mySide', end: true },
    { name: 'Order Cart', icon: <ShoppingCartOutlined />, path: '/dashboard/cart', notification: addedProducts.length },
    { name: 'Notifications', icon: <NotificationsNoneOutlined />, path: '/dashboard/notifications', notification: unreadNotificationCount },
    ...(user ? (
      !isStaff ? [
        { name: 'Manage Staffs', icon: <PeopleAltOutlined />, path: '/dashboard/manage-staff' },
        { name: 'Meeting Schedule', icon: <Diversity3 />, path: '/dashboard/meetings' },
      ] : []
    ) : []),
    { name: 'Products', icon: <CategoryOutlined />, path: '/dashboard/products' },
    { name: 'Order History', icon: <ViewStreamOutlined />, path: '/dashboard/orders' },
    { name: 'Payment History', icon: <PaidOutlined />, path: '/dashboard/payments-history' },
    { name: isStaff ? 'My Order Request' : 'Staff Order Request', icon: <ShoppingCartCheckout />, path: '/dashboard/staffs-order', notification: addedEmployeeCarts.length },
    { name: 'Setting ', icon: <SettingsOutlined />, path: '/dashboard/setting' },
  ];



  return (
    <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {navItems.map((item, index) => (
        <ListItem disablePadding key={index} sx={{ display: 'block' }}>
          {item.more ? (
            <>
              <ListItemButton
                sx={{ px: 1, mx: 2, borderRadius: '5px', mb: 0.5, color: 'gray' }}
                onClick={() => handleExpandedNavlink(index)}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 1.5, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {expandedNavlinkIndex === index ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expandedNavlinkIndex === index} timeout="auto" unmountOnExit>
                <List component="div">
                  {item.more.map((subItem, id) => (
                    <NavLink
                      onClick={handleDrawerClose}
                      className="link"
                      key={id}
                      to={subItem.path}
                    >
                      {({ isActive }) => (
                        <ListItemButton
                          sx={{
                            ml: 5,
                            mr: 2,
                            mb: 0.5,
                            borderRadius: '5px',
                            bgcolor: isActive ? 'primary.main' : '',
                            color: isActive ? '#fff' : 'gray',
                            ':hover': {
                              bgcolor: isActive ? 'primary.main' : '#F5F5F5',
                            },
                          }}
                        >
                          <FiberManualRecord sx={{ fontSize: '15px', mr: 0.5 }} />
                          <Typography sx={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
                            {subItem.name}
                          </Typography>
                        </ListItemButton>
                      )}
                    </NavLink>
                  ))}
                </List>
              </Collapse>
            </>
          ) : (
            <NavLink className="link" to={item.path}>
              {({ isActive }) => (
                <Stack
                  direction='row'
                  alignItems='center'
                  onClick={handleDrawerClose}
                  sx={{
                    py: 1,
                    px: 1,
                    mx: 2,
                    borderRadius: '5px',
                    bgcolor: isActive ? 'primary.main' : '',
                    color: isActive ? '#fff' : 'gray',
                    ':hover': {
                      bgcolor: isActive ? 'primary.main' : '#F5F5F5',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: 1.5, color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <Badge sx={{ mr: 2 }} badgeContent={item.notification} color="warning" />
                </Stack>
              )}
            </NavLink>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default CDrawer;
