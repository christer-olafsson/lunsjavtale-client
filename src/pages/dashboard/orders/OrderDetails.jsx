import { Add, ArrowBack, ArrowDropDown, ArrowDropDownOutlined, BorderColor, Download, DriveFileRenameOutlineOutlined, Edit, Error, KeyboardDoubleArrowRightOutlined, Search } from '@mui/icons-material';
import { Box, Button, Chip, Collapse, Divider, IconButton, Input, Rating, Stack, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ORDER } from './graphql/query';
import { useQuery } from '@apollo/client';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator, timelineItemClasses } from '@mui/lab'
import CDialog from '../../../common/dialog/CDialog';
import EditOrder from './EditOrder';
import { ME } from '../../../graphql/query';
import SelectedStaffs from './SelectedStaffs';
import { format } from 'date-fns';
import SlideDrawer from '../products/SlideDrawer';
import InvoiceTemplate, { downloadPDF } from './InvoiceTemplate';
import LoadingBar from '../../../common/loadingBar/LoadingBar';
import CreatePayment from './CreatePayment';


const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const [ratingCount, setRatingCount] = useState(5);
  const [editOrderDialogOpen, setEditOrderDialogOpen] = useState(false)
  const [editOrderId, setEditOrderId] = useState('')
  const [selectedStaffDetailsId, setSelectedStaffDetailsId] = useState('')
  const [openSlideDrawer, setOpenSlideDrawer] = useState(false);
  const [openStaffPaymentDialog, setOpenStaffPaymentDialog] = useState(false)
  const [openCompanyPaymentDialog, setOpenCompanyPaymentDialog] = useState(false)
  const [currentStaffOrder, setCurrentStaffOrder] = useState({})


  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const { id } = useParams()
  const { data: user } = useQuery(ME)
  const navigate = useNavigate()

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenSlideDrawer(!openSlideDrawer);
  };

  const { loading, error: orderErr } = useQuery(ORDER, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      id,
      addedFor: user?.me.role !== 'employee' ? null : user?.me.id
    },
    onCompleted: (res) => {
      setOrder(res.order)
    },
  });

  const isStaff = user?.me.role === 'company-employee';

  const handleEditDialog = (id) => {
    setEditOrderId(id)
    setEditOrderDialogOpen(true)
  }

  const handleSelectedStaffsDetails = (id) => {
    if (selectedStaffDetailsId) {
      setSelectedStaffDetailsId('')
    } else {
      setSelectedStaffDetailsId(id)

    }
  }
  console.log(order)
  useEffect(() => {
    if (order) {
      const userCarts = order?.orderCarts?.edges?.map(item => item.node?.users?.edges || []) || [];
      const selectedUsers = userCarts.flat().map(user => user?.node);
      const isCurrentStaff = selectedUsers?.find(data => data?.addedFor?.id === user?.me?.id);
      setCurrentStaffOrder(isCurrentStaff)
    }
  }, [order])

  if (loading) {
    return <LoadingBar />
  }
  if (orderErr) {
    return <ErrorMsg />
  }
  return (
    <Box maxWidth='xl'>
      <Stack direction='row' gap={2}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Order Details</Typography>
      </Stack>
      {/* invoice page */}
      <InvoiceTemplate data={order} toggleDrawer={toggleDrawer} />
      {/* </SlideDrawer> */}
      {/* <SlideDrawer openSlideDrawer={openSlideDrawer} toggleDrawer={toggleDrawer}>
        <InvoiceTemplate data={order} toggleDrawer={toggleDrawer} />
      </SlideDrawer> */}

      {/* create staff payment */}
      <CDialog openDialog={openStaffPaymentDialog}>
        <CreatePayment isStaffs orderData={order} closeDialog={() => setOpenStaffPaymentDialog(false)} />
      </CDialog>
      {/* create company payment */}
      <CDialog openDialog={openCompanyPaymentDialog}>
        <CreatePayment isCompany orderData={order} closeDialog={() => setOpenCompanyPaymentDialog(false)} />
      </CDialog>

      <Box mt={3}>
        {
          order?.status &&
          <Stack direction='row' alignItems='center' gap={3}>
            <Typography sx={{
              display: 'inline-flex',
              padding: '5px 12px', mb: 2,
              bgcolor: order.status === 'Cancelled'
                ? 'red'
                : order.status === 'Confirmed'
                  ? 'lightgreen'
                  : order.status === 'Payment-completed'
                    ? 'blue'
                    : order.status === 'Delivered'
                      ? 'green'
                      : order.status === 'Processing'
                        ? '#8294C4'
                        : order.status === 'Ready-to-deliver'
                          ? '#01B8A9'
                          : 'yellow',
              color: order.status === 'Placed'
                ? 'dark' : order.status === 'Payment-pending'
                  ? 'dark' : order.status === 'Confirmed' ? 'dark'
                    : order.status === 'Updated' ? 'dark' : '#fff',
              borderRadius: '50px',
            }}>
              <b style={{ marginLeft: '5px' }}>Status: {order?.status}</b>
            </Typography>
            {
              order?.status === 'Delivered' &&
              <Button size='small'
                // onClick={toggleDrawer}
                onClick={() => downloadPDF()}
                sx={{ borderRadius: '50px', height: '30px' }} variant='outlined' startIcon={<Download />}>Invoice</Button>
            }
          </Stack>
        }
        <Stack gap={1}>

          <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Order ID:</b></Typography>
            <Typography>#{order?.id}</Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Created On:</b></Typography>
            <Box >
              {
                order?.createdOn &&
                <Typography sx={{ whiteSpace: 'nowrap' }}>
                  <b>{format(order?.createdOn, 'dd-MM-yyyy')}</b>
                  <span style={{ fontSize: '13px', marginLeft: '5px' }}>{format(order?.createdOn, 'HH:mm')}</span>
                </Typography>
              }
            </Box>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Delivery Date:</b></Typography>
            {order?.deliveryDate && <Typography><b>{format(order?.deliveryDate, 'dd-MM-yyyy')}</b></Typography>}

          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Payment Type:</b></Typography>
            <Typography>{order?.paymentType === 'online' ? 'Vipps' : order?.paymentType}</Typography>
          </Stack>
          {
            user?.me.role === 'company-employee' &&
            <Stack direction='row'>
              <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Discount Amount:</b></Typography>
              <Typography>{order?.discountAmount} kr</Typography>
            </Stack>
          }
          <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Company Allowance:</b></Typography>
            <Typography>{order?.companyAllowance ?? '0'} %</Typography>
          </Stack>
          {
            !isStaff &&
            <>
              <Stack direction='row'>
                <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Company Due Amount:</b></Typography>
                <Stack direction='row'>
                  <Typography sx={{ fontWeight: 600, color: 'coral' }} mr={1}>{order?.companyDueAmount} kr </Typography>
                </Stack>
              </Stack>
              <Stack direction='row'>
                <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Staffs Due Amount:</b></Typography>
                <Stack direction='row'>
                  <Typography sx={{ fontWeight: 600, color: 'coral' }} mr={1}>{order?.employeeDueAmount} kr </Typography>
                </Stack>
              </Stack>
              {/* <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Total Due Amount:</b></Typography>
            <Stack direction='row'>
              <Typography mr={1}>{order?.dueAmount} kr </Typography>
              <Tooltip title='All Staffs due amount'>
                <Error fontSize='small' color='primary' />
              </Tooltip>
            </Stack>
          </Stack> */}
              <Stack direction='row'>
                <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Paid Amount:</b></Typography>
                <Typography sx={{ fontWeight: 600, color: 'green' }}>{order?.paidAmount} kr</Typography>
              </Stack>
            </>
          }
          {
            isStaff &&
            <Stack direction='row'>
              <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Your Due:</b></Typography>
              <Typography sx={{ fontWeight: 600, color: 'coral' }}>{currentStaffOrder?.dueAmount} kr</Typography>
            </Stack>
          }

          {/* staff due */}
          <Stack direction='row' alignItems='center' sx={{
            border: '1px solid lightgray',
            maxWidth: 'fit-content',
            whiteSpace: 'nowrap',
            pl: 1, borderRadius: '4px', mt: 2,
          }}>
            <Typography sx={{ color: 'coral' }}>
              {user?.me.role === 'company-employee' ? 'Due:' : 'Staffs Due:'}
              <b style={{ marginLeft: '5px' }}>{user?.me.role === 'company-employee' ? currentStaffOrder?.dueAmount : order?.employeeDueAmount}</b> kr
            </Typography>
            <Button
              disabled={(currentStaffOrder?.dueAmount === '0.00') || (order?.employeeDueAmount === '0.00')}
              onClick={() => setOpenStaffPaymentDialog(true)}
              sx={{ alignSelf: 'flex-start', ml: 2 }}
              variant='contained'>
              Pay Now (Vipps)
            </Button>
          </Stack>

          {/* Company due */}
          <Stack direction='row' alignItems=' center' sx={{
            display: isStaff ? 'none' : 'flex',
            border: '1px solid lightgray',
            maxWidth: 'fit-content',
            whiteSpace: 'nowrap',
            pl: 1, borderRadius: '4px', mt: 2, mb: 1
          }}>
            <Typography sx={{ color: 'coral' }}>
              Company Due
              <b style={{ marginLeft: '5px' }}>{order?.companyDueAmount}</b> kr
            </Typography>
            <Button
              disabled={(order?.companyDueAmount === '0.00')}
              onClick={() => setOpenCompanyPaymentDialog(true)}
              sx={{ alignSelf: 'flex-start', ml: 2 }}
              variant='contained'>
              {
                isStaff ? 'Pay Now (Vipps)' : 'Pay Now (Vipps)'
              }
            </Button>
          </Stack>

          {
            order?.note &&
            <Typography sx={{
              fontSize: '16px',
              border: '1px solid coral',
              p: 1, mt: 1, borderRadius: '8px',
              maxWidth: '400px',
              color: 'coral'
            }}>
              Note: <b>{order?.note}</b>
            </Typography>
          }
        </Stack>

        <Divider sx={{ mt: 2 }} />

        <Stack sx={{ maxWidth: '1200px' }} direction={{ xs: 'column', lg: 'row' }} mt={3} gap={6}>
          <Box sx={{ width: { xs: '100%', md: '70%' } }}>
            <Stack gap={3}>
              {
                loading ? <Loader /> : orderErr ? <ErrorMsg /> : order === null ?
                  <Typography>Order not Found!</Typography> :
                  order?.orderCarts?.edges.map(data => (
                    <Box sx={{
                      border: '1px solid lightgray',
                      // maxWidth: '800px',
                      borderRadius: '8px',
                      p: 1
                    }} key={data.node.id}>
                      <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 0, md: 2 }} alignItems={{ xs: 'start', md: 'center' }} justifyContent='space-between'>
                        <Stack direction={{ xs: 'row', md: 'row' }} gap={2} alignItems='center'>
                          <img style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }} src={data?.node.item.attachments?.edges.find(item => item.node.isCover)?.node.fileUrl ?? "/noImage.png"} alt="" />
                          <Box>
                            <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{data?.node.item.name}</Typography>
                            <Typography variant='body2'>Category: <b>{data?.node.item.category.name}</b></Typography>
                            <Typography>Price: <b>{data?.node.item.priceWithTax}</b> kr</Typography>
                          </Box>
                        </Stack>
                        <Stack sx={{ display: isStaff ? 'none' : 'flex' }} gap={.5} mr={2}>
                          <Typography>Quantity: <b>{data?.node.orderedQuantity}</b> </Typography>
                          <Typography>Selected Staffs: <b>({data?.node.users?.edges?.length})</b></Typography>
                          <Typography>Total Price: <b>{data?.node.totalPriceWithTax} </b> kr </Typography>
                          <Stack direction='row' gap={1}>
                            <Button
                              onClick={() => handleSelectedStaffsDetails(data.node.id)}
                              variant='outlined'
                              endIcon={<ArrowDropDownOutlined />}
                              size='small'>
                              Details
                            </Button>
                            <Button
                              disabled={
                                user?.me.company.isBlocked
                                || user?.me.role === 'company-employee'
                                || (order?.status !== 'Placed' && order?.status !== 'Updated')
                              }
                              onClick={() => handleEditDialog(data.node.id)}
                              endIcon={<DriveFileRenameOutlineOutlined />}
                              variant='contained'
                              size='small'>
                              Edit
                            </Button>
                          </Stack>
                        </Stack>
                        {/* edit order */}
                        {
                          editOrderId === data.node.id &&
                          <CDialog
                            fullScreen={isMobile}
                            maxWidth='md'
                            openDialog={editOrderDialogOpen}
                            closeDialog={() => setEditOrderDialogOpen(false)}
                          >
                            <EditOrder
                              closeDialog={() => setEditOrderDialogOpen(false)}
                              data={data?.node}
                            />
                          </CDialog>
                        }
                      </Stack>
                      <Collapse in={selectedStaffDetailsId === data.node.id}><SelectedStaffs data={data?.node} /></Collapse>
                    </Box>
                  ))
              }
            </Stack>
            {/* <Box mt={6} maxWidth='700px'>
              <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 3 }}>Timeline</Typography>
              <Timeline sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'primary.main' }} />
                    <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Stack direction='row' justifyContent='space-between'>
                      <Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Feb 09, Monday 2024 </Typography>
                        <Typography sx={{ fontSize: '14px' }}>order place</Typography>
                      </Box>
                      <Typography sx={{ fontSize: '14px' }}>3.35 am</Typography>
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'primary.main' }} />
                    <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Stack direction='row' justifyContent='space-between'>
                      <Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Feb 10, Monday 2024 </Typography>
                        <Typography sx={{ fontSize: '14px' }}>order confirmed, waiting for payment</Typography>
                      </Box>
                      <Typography sx={{ fontSize: '14px' }}>5.20 pm</Typography>
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'primary.main' }} />
                    <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Stack direction='row' justifyContent='space-between'>
                      <Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Feb 10, Monday 2024 </Typography>
                        <Typography sx={{ fontSize: '14px' }}>payment confirmed </Typography>
                      </Box>
                      <Typography sx={{ fontSize: '14px' }}>6.50 pm</Typography>
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'primary.main' }} />
                    <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Stack direction='row' justifyContent='space-between'>
                      <Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Feb 11, Monday 2024 </Typography>
                        <Typography sx={{ fontSize: '14px' }}>product sent to example company</Typography>
                      </Box>
                      <Typography sx={{ fontSize: '14px' }}>4.50 am</Typography>
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'primary.main' }} />
                    <TimelineConnector sx={{ bgcolor: 'primary.main' }} />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Stack direction='row' justifyContent='space-between'>
                      <Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Feb 11, Monday 2024 </Typography>
                        <Typography sx={{ fontSize: '14px' }}>product picked by delivery man</Typography>
                      </Box>
                      <Typography sx={{ fontSize: '14px' }}>1.20 pm</Typography>
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box> */}
          </Box>

          {/* <Box sx={{
            width: { xs: '100%', md: '30%' },
            px: { xs: 0, md: 3 }
          }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 2 }}>Customer Information</Typography>
            <Typography sx={{ fontSize: '16px' }}>Info:</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 600, }}>{user?.me.company?.name}</Typography>
            {user?.me.username &&
              <Typography sx={{ fontSize: '14px', mb: 4 }}>@{user?.me.username}</Typography>
            }
            <Typography sx={{ fontSize: '16px' }}>Email:</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 4 }}>{user?.me.company?.email}</Typography>
            <Typography sx={{ fontSize: '16px' }}>Shipping address:</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 4 }}>
              {order?.shippingAddress?.address}, {order?.shippingAddress?.city}, {order?.shippingAddress?.postCode}
            </Typography>
            <Typography sx={{ fontSize: '16px' }}>Billing address:</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 4 }}>{order?.billingAddress?.address}</Typography>
          </Box> */}

        </Stack>

      </Box >
    </Box >
  )
}

export default OrderDetails