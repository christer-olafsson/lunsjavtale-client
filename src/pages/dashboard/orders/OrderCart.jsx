/* eslint-disable react/prop-types */
import { Box, Button, Collapse, Stack, Tab, Tabs, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CDialog from '../../../common/dialog/CDialog'
import EditOrder from './EditOrder'
import { useQuery } from '@apollo/client'
import { ME } from '../../../graphql/query'
import { ArrowDropDownOutlined, DriveFileRenameOutlineOutlined } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { ORDER } from './graphql/query'
import SelectedStaffs from './SelectedStaffs'
import Loader from '../../../common/loader/Index'
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg'
import ReqFoodChange from './ReqFoodChange'
import ChangeReq from './ChangeReq'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const OrderCart = ({ order, orderCarts }) => {
  const [editOrderDialogOpen, setEditOrderDialogOpen] = useState(false)
  const [reqFoodChangeDialogOpen, setReqFoodChangeDialogOpen] = useState(false)
  const [cartDetailsOpen, setCartDetailsOpen] = useState(false)
  const [tabValue, setTabValue] = useState(0);
  const [currentStaffReqCart, setCurrentStaffReqCart] = useState({})
  const [allStaffReqCart, setAllStaffReqCart] = useState([])

  const { data: user } = useQuery(ME)

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const isStaff = user?.me.role === 'company-employee';

  useEffect(() => {
    if (user && orderCarts) {
      const cartData = orderCarts.node.users.edges.find(
        (data) => data.node.alterCart?.base?.addedFor?.id === user.me.id
      );
      setCurrentStaffReqCart(cartData)
    }
    if (orderCarts) {
      const allReqCart = orderCarts.node.users.edges.filter(item => item.node.alterCart !== null && item.node.alterCart.status !== 'accepted').map(item => item.node)
      setAllStaffReqCart(allReqCart)
    }
  }, [orderCarts, user]);
  // console.log('orderCarts', orderCarts)
  return (
    <Box sx={{
      border: '1px solid lightgray',
      borderRadius: '8px',
      p: 1
    }}>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 0, md: 2 }} alignItems={{ xs: 'start', md: 'center' }} justifyContent='space-between'>
        <Stack direction={{ xs: 'row', md: 'row' }} gap={2} alignItems='center'>
          <img style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '4px',
          }} src={orderCarts?.node.item.attachments?.edges.find(item => item.node.isCover)?.node.fileUrl ?? "/noImage.png"} alt="" />
          <Box>
            {
              (!isStaff && allStaffReqCart.length > 0) &&
              <Typography sx={{
                fontSize: '16px', fontWeight: 600,
                width: 'fit-content',
                color: 'coral',
                border: '1px solid coral',
                borderRadius: '4px', px: 1
              }}> Change Request ({allStaffReqCart?.length})</Typography>
            }
            <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{orderCarts?.node.item.name}</Typography>
            <Typography variant='body2'>Category: <b>{orderCarts?.node.item.category.name}</b></Typography>
            <Typography>Price: <b>{orderCarts?.node?.item.priceWithTax}</b> kr</Typography>
          </Box>
        </Stack>
        {/* req food change dialog */}
        <CDialog openDialog={reqFoodChangeDialogOpen}>
          <ReqFoodChange orderCarts={orderCarts?.node} closeDialog={() => setReqFoodChangeDialogOpen(false)} />
        </CDialog>
        {
          isStaff ? (
            currentStaffReqCart ?
              <Box mt={{ xs: 3, md: 0 }} sx={{ border: '1px solid coral', p: 1, borderRadius: '8px' }}>
                <Typography sx={{ color: 'coral', fontWeight: 600, mb: .5 }}>Requested For Change</Typography>
                <Stack direction={{ xs: 'row', md: 'row' }} gap={2} alignItems='center'>
                  <img style={{
                    border: '1px solid lightgray',
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }} src={currentStaffReqCart?.node?.alterCart?.item.attachments?.edges.find(item => item.node.isCover)?.node.fileUrl ?? "/noImage.png"} alt="" />
                  <Box>
                    <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{currentStaffReqCart?.node?.alterCart?.item.name}</Typography>
                    <Typography variant='body2'>Category: <b>{currentStaffReqCart?.node?.alterCart?.item.category.name}</b></Typography>
                    <Typography>Price: <b>{currentStaffReqCart?.node?.alterCart?.item.priceWithTax}</b> kr</Typography>
                    <Typography sx={{
                      fontSize: '14px',
                      bgcolor: currentStaffReqCart?.node?.alterCart?.status !== 'pending' ? 'green' : 'darkgray',
                      color: '#fff',
                      width: 'fit-content',
                      px: 1, borderRadius: '4px'
                    }}><b>{currentStaffReqCart?.node?.alterCart?.status}</b></Typography>
                  </Box>
                </Stack>
              </Box>
              :
              <Button disabled={
                user?.me.company.isBlocked
                || (order?.status !== 'Placed' && order?.status !== 'Updated' && order?.status !== 'Payment-pending' && order?.status !== 'Payment-completed')
              } sx={{ mt: { xs: 2, md: 0 }, whiteSpace: 'nowrap' }} onClick={() => setReqFoodChangeDialogOpen(true)} variant='contained'>Request Food Change</Button>
          )
            :
            <Stack gap={.5} mr={2}>
              <Typography>Quantity: <b>{orderCarts?.node?.orderedQuantity}</b> </Typography>
              <Typography>Selected Staffs: <b>({orderCarts?.node?.users?.edges?.length})</b></Typography>
              <Typography>Total Price: <b>{orderCarts?.node?.totalPriceWithTax} </b> kr </Typography>
              <Stack direction='row' gap={1}>
                <Button
                  onClick={() => setCartDetailsOpen(!cartDetailsOpen)}
                  // onClick={() => handleSelectedStaffsDetails(orderCarts.node?.id)}
                  variant='outlined'
                  endIcon={<ArrowDropDownOutlined />}
                  size='small'>
                  Details
                </Button>
                <Button
                  disabled={
                    user?.me.company.isBlocked
                    || user?.me.role === 'company-employee'
                    || (order?.status !== 'Placed'
                      && order?.status !== 'Updated'
                      && order?.status !== 'Payment-pending'
                      && order?.status !== 'Payment-completed')
                  }
                  onClick={() => setEditOrderDialogOpen(true)}
                  endIcon={<DriveFileRenameOutlineOutlined />}
                  variant='contained'
                  size='small'>
                  Update
                </Button>
              </Stack>
            </Stack>
        }
        {/* edit order */}
        <CDialog
          fullScreen={isMobile}
          maxWidth='md'
          openDialog={editOrderDialogOpen}
          closeDialog={() => setEditOrderDialogOpen(false)}
        >
          <EditOrder
            closeDialog={() => setEditOrderDialogOpen(false)}
            data={orderCarts?.node}
          />
        </CDialog>
      </Stack>
      <Collapse in={cartDetailsOpen}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)}>
              <Tab label="Selected Staffs" {...a11yProps(0)} />
              <Tab label={`Change Request (${allStaffReqCart.length})`} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
            <SelectedStaffs order={order} orderCarts={orderCarts?.node} />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <ChangeReq orderCarts={orderCarts} />
          </CustomTabPanel>
        </Box>
      </Collapse>
    </Box>
  )
}

export default OrderCart