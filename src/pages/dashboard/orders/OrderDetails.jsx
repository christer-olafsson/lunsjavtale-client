import { ArrowBack, Download } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ORDER } from './graphql/query';
import { useQuery } from '@apollo/client';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import CDialog from '../../../common/dialog/CDialog';
import { ME } from '../../../graphql/query';
import { format } from 'date-fns';
import InvoiceTemplate, { downloadPDF } from './InvoiceTemplate';
import LoadingBar from '../../../common/loadingBar/LoadingBar';
import PayCompanyDue from './PayCompanyDue';
import OrderCart from './OrderCart';
import PayStaffDue from './PayStaffDue';


const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const [currentStaffOrder, setCurrentStaffOrder] = useState({})

  const [openSlideDrawer, setOpenSlideDrawer] = useState(false);
  const [openStaffPaymentDialog, setOpenStaffPaymentDialog] = useState(false)
  const [openCompanyPaymentDialog, setOpenCompanyPaymentDialog] = useState(false)
  const [currentStaffCart, setCurrentStaffCart] = useState([]);


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
      addedFor: user?.me.role === 'company-employee' ? user?.me.id : null
    },
    onCompleted: (res) => {
      setOrder(res.order)
    },
  });

  const isStaff = user?.me.role === 'company-employee';

  const totalCurrentStaffDue = currentStaffCart.reduce((total, user) => total + parseFloat(user.dueAmount), 0).toFixed(2)

  useEffect(() => {
    const users = [];
    order?.orderCarts?.edges.forEach((cartEdge) => {
      cartEdge.node.users.edges.forEach((userEdge) => {
        if (userEdge.node.addedFor?.id === user?.me.id) {
          users.push(userEdge.node);
        }
      });
    });
    setCurrentStaffCart(users);
  }, [order]);

  if (loading) {
    return <Loader />
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
        <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Bestillingsdetaljer</Typography>
      </Stack>
      {/* invoice page */}
      <InvoiceTemplate data={order} toggleDrawer={toggleDrawer} />
      {/* </SlideDrawer> */}
      {/* <SlideDrawer openSlideDrawer={openSlideDrawer} toggleDrawer={toggleDrawer}>
        <InvoiceTemplate data={order} toggleDrawer={toggleDrawer} />
      </SlideDrawer> */}

      {/* create staff payment */}
      <CDialog openDialog={openStaffPaymentDialog}>
        <PayStaffDue orderData={order} staffCart={currentStaffCart} totalDue={totalCurrentStaffDue} closeDialog={() => setOpenStaffPaymentDialog(false)} />
      </CDialog>
      {/* create company payment */}
      <CDialog openDialog={openCompanyPaymentDialog}>
        <PayCompanyDue isCompany orderData={order} closeDialog={() => setOpenCompanyPaymentDialog(false)} />
      </CDialog>

      <Box mt={3}>
        <Stack direction='row' alignItems='center' gap={3}>
          {
            (order?.status === 'Delivered') && !isStaff &&
            <Button size='small'
              // onClick={toggleDrawer}
              onClick={() => downloadPDF()}
              sx={{ borderRadius: '50px', height: '30px', mb: 2 }} variant='outlined' startIcon={<Download />}>Faktura</Button>
          }
        </Stack>
        <Stack gap={1}>
          <Stack direction='row' alignItems='center'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Status:</b></Typography>
            <Stack alignItems='center' sx={{
              display: 'inline-flex',
              padding: '0px 12px',
              bgcolor:
                order?.status === 'Cancelled' ? 'red' :
                  order?.status === 'Placed' ? '#6251DA' :
                    order?.status === 'Updated' ? '#6251DA' :
                      order?.status === 'Confirmed' ? '#433878' :
                        order?.status === 'Delivered' ? 'green' :
                          order?.status === 'Processing' ? '#B17457' :
                            order?.status === 'Payment-completed' ? '#00695c' :
                              order?.status === 'Ready-to-deliver' ? '#283593' :
                                order?.status === 'Payment-pending' ? '#c2185b' :
                                  '#616161',
              color: '#FFF',
              borderRadius: '4px',
              minWidth: '150px',
            }}>
              <Typography sx={{ fontWeight: 600, }} >{order?.status}</Typography>
            </Stack>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Bestillings-ID:</b></Typography>
            <Typography>#{order?.id}</Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Bestilt den:</b></Typography>
            <Box >
              {
                order?.createdOn &&
                <Typography sx={{ whiteSpace: 'nowrap' }}>
                  <b>{format(order?.createdOn, 'dd-MM-yyyy')}</b>
                  <span style={{ fontSize: '13px', marginLeft: '5px' }}>{format(order?.createdOn, 'hh:mm a')}</span>
                </Typography>
              }
            </Box>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Leveringsdato:</b></Typography>
            {order?.deliveryDate && <Typography><b>{format(order?.deliveryDate, 'dd-MM-yyyy')}</b></Typography>}

          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Betalingsmetode:</b></Typography>
            <Typography>{order?.paymentType === 'online' ? 'Vipps' : order?.paymentType}</Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Firma godtgjørelse:</b></Typography>
            <Typography>{order?.companyAllowance ?? '0'} %</Typography>
          </Stack>

          {
            !isStaff &&
            <>
              <Stack direction='row'>
                <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Rabattbeløp:</b></Typography>
                <Typography>{order?.discountAmount} kr</Typography>
              </Stack>
              <Stack direction='row'>
                <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Sluttpris:</b></Typography>
                <Typography sx={{ color: 'blue', fontWeight: 600 }}>{order?.finalPrice ?? '0'} kr</Typography>
              </Stack>
              <Stack direction='row'>
                <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Firma skyldig beløp:</b></Typography>
                <Stack direction='row'>
                  <Typography sx={{ fontWeight: 600, color: 'coral' }} mr={1}>{order?.companyDueAmount} kr </Typography>
                </Stack>
              </Stack>
              <Stack direction='row'>
                <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Ansattes skyldig beløp:</b></Typography>
                <Stack direction='row'>
                  <Typography sx={{ fontWeight: 600, color: 'coral' }} mr={1}>{order?.employeeDueAmount} kr </Typography>
                </Stack>
              </Stack>
              <Stack direction='row'>
                <Typography sx={{ width: '200px', whiteSpace: 'nowarp' }}> <b>Betalt beløp:</b></Typography>
                <Typography sx={{ fontWeight: 600, color: 'green' }}>{order?.paidAmount} kr</Typography>
              </Stack>
            </>
          }

          {/* staff due  */}
          {
            isStaff &&
            <Stack direction='row' alignItems='center' sx={{
              border: '1px solid lightgray',
              maxWidth: 'fit-content',
              whiteSpace: 'nowrap',
              pl: 1, borderRadius: '4px', mt: 2,
            }}>
              <Typography sx={{ color: 'coral' }}>
                Totalt skyldig:
                <b style={{ marginLeft: '5px' }}>{totalCurrentStaffDue}</b> kr
              </Typography>
              <Button
                disabled={totalCurrentStaffDue === '0.00'}
                onClick={() => setOpenStaffPaymentDialog(true)}
                sx={{ alignSelf: 'flex-start', ml: 2 }}
                variant='contained'>
                Betal nå (Vipps)
              </Button>
            </Stack>
          }

          {/* Company due */}
          <Stack direction='row' alignItems=' center' sx={{
            display: isStaff ? 'none' : 'flex',
            border: '1px solid lightgray',
            maxWidth: 'fit-content',
            whiteSpace: 'nowrap',
            pl: 1, borderRadius: '4px', mt: 2, mb: 1
          }}>
            <Typography sx={{ color: 'coral' }}>
              Firma skyldig
              <b style={{ marginLeft: '5px' }}>{order?.companyDueAmount}</b> kr
            </Typography>
            <Button
              disabled={(order?.companyDueAmount === '0.00')}
              onClick={() => setOpenCompanyPaymentDialog(true)}
              sx={{ alignSelf: 'flex-start', ml: 2 }}
              variant='contained'>
              {
                isStaff ? 'Betal nå (Vipps)' : 'Betal nå (Vipps)'
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
              Merk: <b>{order?.note}</b>
            </Typography>
          }
        </Stack>

        <Divider sx={{ mt: 2 }} />

        <Stack direction={{ xs: 'column', lg: 'row' }} mt={3} gap={6}>
          <Box>
            {/* order cart */}
            <Stack gap={3}>
              {
                loading ? <Loader /> : orderErr ? <ErrorMsg /> : order === null ?
                  <Typography>Bestilling ikke funnet!</Typography> :
                  order?.orderCarts?.edges.map(data => (
                    <OrderCart order={order} orderCarts={data} key={data.node.id} />
                  ))
              }
            </Stack>
            {/* order timeline */}
            <Stack mt={4}>
              <Typography variant='h5' sx={{ px: 3, mb: 2 }}>Bestillingstidslinje</Typography>
              <Box sx={{ px: 3 }}>
                {order?.statuses?.edges.map((status, index) => (
                  <Box key={status.node.id} sx={{ display: 'flex', mb: 2 }}>
                    <Box sx={{
                      width: 2,
                      bgcolor: 'primary.main',
                      mr: 2,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: -4,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                      }
                    }} />
                    <Box>
                      <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                        {status.node.status}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {format(status?.node.createdOn, 'dd-MM-yyyy')}
                        <span style={{ fontSize: '12px', marginLeft: '5px', fontWeight: 600 }}>{format(status?.node.createdOn, 'hh:mm a')}</span>
                      </Typography>
                      {status.node.note && (
                        <Typography variant='body2' sx={{ mt: 1 }}>
                          {status.node.note}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Box>

        </Stack>

      </Box >
    </Box >
  )
}

export default OrderDetails