import { Add, ArrowForwardIos, BorderColor, Check, CheckCircleOutlined, DeleteOutlineOutlined, EditOutlined, ErrorOutline } from '@mui/icons-material'
import { Box, Button, Collapse, FormGroup, IconButton, Paper, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddBillingInfo from './billingInfo/AddBillingInfo'
import CDialog from '../../../../common/dialog/CDialog'
import AddPaymentMethod from './payment/AddPaymentMethod'
import { useLazyQuery, useMutation } from '@apollo/client'
import { PAYMENT_METHODS } from '../graphql/query'
import Loader from '../../../../common/loader/Index'
import ErrorMsg from '../../../../common/ErrorMsg/ErrorMsg'
import { format } from 'date-fns'
import EditPaymentMethod from './payment/EditPaymentMethod'
import { DELETE_PAYMENT_METHOD } from '../graphql/mutation'
import toast from 'react-hot-toast'



const Payment = () => {
  const [openPaymentGateway, setOpenPaymentGateway] = useState(false)
  const [openBillingInfo, setOpenBillingInfo] = useState(false)
  const [openPaymentMethodDialog, setOpenPaymentMethodDialog] = useState(false)
  const [editPaymentMethodId, setEditPaymentMethodId] = useState('')
  const [paymentMethods, setPaymentMethods] = useState([])
  const [deleteId, setDeleteId] = useState('')

  const [fetchPaymentMethods, { loading, error: paymentMethodErr }] = useLazyQuery(PAYMENT_METHODS, {
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      setPaymentMethods(res.paymentMethods.edges.map(item => item.node));
    }
  });

  const [paymentMethodDelete, { loading: deleteLoading }] = useMutation(DELETE_PAYMENT_METHOD, {
    onCompleted: (res) => {
      toast.success(res.deletePaymentMethod.message)
      fetchPaymentMethods()
      setDeleteId('')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const handleDelete = () => {
    paymentMethodDelete({
      variables: {
        id: deleteId
      }
    })
  }

  useEffect(() => {
    fetchPaymentMethods()
  }, [])

  return (
    <Box>
      <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1 }}>Payment Settings</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>View and update your payment  details</Typography>

      {/* payment getway integration */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Payment Gateway Integration</Typography>
          <IconButton onClick={() => setOpenPaymentGateway(!openPaymentGateway)}>
            <ArrowForwardIos sx={{
              transition: 'transform .3s ease',
              transform: openPaymentGateway ? 'rotate(90deg)' : 'none'
            }} />
          </IconButton>
        </Stack>
        <Collapse in={openPaymentGateway} >
          <Stack mt={2} direction='row' alignItems='center' justifyContent='space-between'>
            <Box></Box>
            <Button onClick={() => setOpenPaymentMethodDialog(true)} variant='contained' startIcon={<Add />}>Add</Button>
          </Stack>
          {/* add payment method */}
          <CDialog openDialog={openPaymentMethodDialog}>
            <AddPaymentMethod fetchPaymentMethods={fetchPaymentMethods} closeDialog={() => setOpenPaymentMethodDialog(false)} />
          </CDialog>
          {
            loading ? <Loader /> : paymentMethodErr ? <ErrorMsg /> :
              paymentMethods.map(data => (
                <Box key={data.id} sx={{
                  border: data.isDefault ? '2px solid green' : '1px solid lightgray',
                  borderRadius: '8px',
                  p: { xs: 1.5, md: 3 },
                  mt: 3
                }}>
                  {
                    data.isDefault &&
                    <Typography sx={{ fontSize: '16px', fontWeight: 600, display: 'inline-flex', gap: '5px' }}>
                      <CheckCircleOutlined sx={{ color: 'green' }} />
                      Primary Payment Method
                    </Typography>
                  }
                  <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>Added On: {format(data.createdOn, 'yyyy-MM-dd')}</Typography>
                  <Stack mt={2} direction={{ xs: 'column', md: 'row' }} justifyContent='space-between'>
                    <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
                      <Box sx={{
                        bgcolor: 'light.main',
                        width: '72px', height: '58px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px'
                      }}>
                        <img src="/visaicon.png" alt="" />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
                          Holder Name:
                          <span style={{ fontWeight: 300, marginLeft: '10px' }}>{data.cardHolderName} </span>
                        </Typography>
                        <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
                          Card Number:
                          <span style={{ fontWeight: 300, marginLeft: '10px' }}>{data.cardNumber.replace(/.(?=.{4})/g, '*')} </span>
                        </Typography>
                        <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
                          Expiry:
                          <span style={{ fontWeight: 300, marginLeft: '10px' }}>{format(data.expiry, 'yyyy-MM-dd')} </span>
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack alignSelf='flex-end' direction='row' gap={2}>
                      <IconButton onClick={() => setEditPaymentMethodId(data.id)}>
                        <EditOutlined fontSize='small' />
                      </IconButton>
                      <IconButton onClick={() => setDeleteId(data.id)}>
                        <DeleteOutlineOutlined fontSize='small' />
                      </IconButton>
                    </Stack>
                    {/* edit payment method */}
                    <CDialog openDialog={data.id === editPaymentMethodId}>
                      <EditPaymentMethod fetchPaymentMethods={fetchPaymentMethods} data={data} closeDialog={() => setEditPaymentMethodId('')} />
                    </CDialog>
                    {/* delete */}
                    {
                      <CDialog closeDialog={() => setDeleteId('')} maxWidth='sm' openDialog={data.id === deleteId}>
                        <Box>
                          <ErrorOutline fontSize='large' sx={{ color: 'red' }} />
                          <Typography sx={{ fontSize: { xs: '18px', lg: '22px' }, fontWeight: 600 }}>Confirm Deletion?</Typography>
                          <Typography sx={{ fontSize: '14px', mt: 1 }}>Are you sure you want to delete this payment method? This action cannot be undone.</Typography>
                          <Stack direction='row' gap={2} mt={3}>
                            <Button onClick={() => setDeleteId('')} fullWidth variant='outlined'>Cancel</Button>
                            <Button onClick={handleDelete} disabled={deleteLoading} fullWidth variant='contained' color='error'>Delete</Button>
                          </Stack>
                        </Box>
                      </CDialog>
                    }
                  </Stack>
                </Box>
              ))
          }
        </Collapse>
      </Paper>


      {/* billing information */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Billing Information</Typography>
          <IconButton onClick={() => setOpenBillingInfo(!openBillingInfo)}>
            <ArrowForwardIos sx={{
              transition: 'transform .3s ease',
              transform: openBillingInfo ? 'rotate(90deg)' : 'none'
            }} />
          </IconButton>
        </Stack>
        <Collapse in={openBillingInfo} >
          <AddBillingInfo />
        </Collapse>
      </Paper>
    </Box>
  )
}

export default Payment