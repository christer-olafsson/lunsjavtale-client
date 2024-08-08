import { useTheme } from '@emotion/react';
import { ArrowBack, CheckCircle } from '@mui/icons-material';
import { Box, Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../products/OrderSummary';
import { useMutation, useQuery } from '@apollo/client';
import { ADDRESSES } from './graphql/query';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import ShippingInfo from './shippingInfo/ShippingInfo';
import { PLACE_ORDER } from './graphql/mutation';
import { ME } from '../../../graphql/query';
import { ORDERS } from '../orders/graphql/query';

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
      {value === index && (
        <Box mt={3}>
          {children}
        </Box>
      )}
    </div>
  );
}


const CheckPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [companyAllowance, setCompanyAllowance] = useState('100');
  const [shippingAddressId, setShippingAddressId] = useState(null)
  const [paymentType, setPaymentType] = useState('')
  const [errors, setErrors] = useState({})
  const [billingAddressPayload, setBillingAddressPayload] = useState({
    firstName: '',
    lastName: '',
    address: '',
    sector: '',
    phone: '',
  })

  const navigate = useNavigate()

  const { data: user } = useQuery(ME)

  useQuery(ADDRESSES, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setShippingAddressId(res.addresses.edges.find(item => item.node.default)?.node.id ?? null);
    }
  })

  const [placeOrder, { loading }] = useMutation(PLACE_ORDER, {
    onCompleted: (res) => {
      toast.success('Order Placed!')
      setErrors({})
      console.log('order place:', res)
      // navigate('/dashboard/orders')

    },
    refetchQueries: [ADDRESSES, ORDERS],
    onError: (err) => {
      toast.error(err.message)
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const graphqlError = err.graphQLErrors[0];
        const { extensions } = graphqlError;
        if (extensions && extensions.errors) {
          setErrors(extensions.errors)
        }
      }
    }
  });

  const handleBillingInputChange = (e) => {
    setBillingAddressPayload({ ...billingAddressPayload, [e.target.name]: e.target.value })
  }

  const handleSendPaymentInfo = () => {
    if (!billingAddressPayload.address) {
      setErrors({ address: 'Billing Address Required!' })
      toast.error('Billing Address Required!')
      return
    }
    if (!shippingAddressId) {
      setErrors({ shippingAddress: 'Shipping Address Required!' })
      toast.error('Shipping Address Required!')
      return
    }
    if (!paymentType) {
      setErrors({ paymentType: 'Payment Type Required!' })
      toast.error('Payment Type Required!')
      return
    }
    if (companyAllowance === null) {
      setErrors({ companyAllowance: 'CompanyAllowance Required!' })
      toast.error('CompanyAllowance Required!')
      return
    }
    placeOrder({
      variables: {
        billingAddress: {
          ...billingAddressPayload
        },
        companyAllowance: parseInt(companyAllowance),
        paymentType: paymentType,
        shippingAddress: shippingAddressId
      }
    })
  }

  useEffect(() => {
    if(companyAllowance !== null){
      setErrors({ companyAllowance: '' })
    }
  }, [companyAllowance])
  


  useEffect(() => {
    const data = user?.me?.company?.billingAddress ?? {}
    setBillingAddressPayload({
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      address: data.address ?? '',
      sector: data.sector ?? '',
      phone: data.phone ?? '',
    })
  }, [user])

  return (
    <Box sx={{ maxWidth: '1368px' }}>
      <Stack direction='row' alignItems='center'>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Checkout</Typography>
      </Stack>
      <Stack direction={{ xs: 'column-reverse', md: 'row' }} gap={{ xs: 2, lg: 3 }} mt={3}>

        <Box sx={{
          width: { xs: '100%', lg: '70%' },
          p: { xs: 0, lg: 3 },
        }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} aria-label="basic tabs example">
              <Tab sx={{ textTransform: 'none' }} label="Billing Information" />
              <Tab sx={{ textTransform: 'none' }} label="Shipping Information" />
              <Tab sx={{ textTransform: 'none' }} label="Payment Information" />
            </Tabs>
          </Box>

          <CustomTabPanel value={tabValue} index={0}>
            <Box>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Billing Information</Typography>
              <Typography>Please fill all information below</Typography>

              <Stack flex={1} gap={2} mt={3}>
                <TextField
                  value={billingAddressPayload.firstName}
                  onChange={handleBillingInputChange}
                  name='firstName'
                  label="First Name"
                  variant="standard"
                />
                <TextField
                  value={billingAddressPayload.lastName}
                  onChange={handleBillingInputChange}
                  name='lastName'
                  label="Last Name"
                  variant="standard"
                />
                <TextField
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                  value={billingAddressPayload.address}
                  onChange={handleBillingInputChange}
                  name='address'
                  label="Address"
                  variant="standard"
                />
                <TextField
                  value={billingAddressPayload.sector}
                  onChange={handleBillingInputChange}
                  name='sector'
                  label="Sector"
                  variant="standard"
                />
                <TextField
                  value={billingAddressPayload.phone}
                  onChange={handleBillingInputChange}
                  name='phone'
                  type='number'
                  label="Phone"
                  variant="standard"
                />
                <Button
                  onClick={() => setTabValue(1)}
                  variant='contained'
                  sx={{
                    textWrap: 'nowrap',
                    alignSelf: 'flex-end',
                    justifySelf: 'end',
                    mt: 2
                  }}
                >Processing to Shipping
                </Button>
              </Stack>

            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <ShippingInfo shippingInfoErr={errors.shippingAddress} />
            <Stack sx={{ mt: 4 }} gap={2} direction='row' justifyContent='space-between'>
              <Button onClick={() => setTabValue(0)} sx={{ textWrap: 'nowrap' }} variant='outlined' >Back to Billing Info</Button>
              <Button onClick={() => setTabValue(2)} sx={{ textWrap: 'nowrap' }} variant='contained' >Continue to Payment</Button>
            </Stack>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2}>
            <Stack>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Payment Selection</Typography>
              <Typography>Please fill all information below</Typography>

              <FormControl error={Boolean(errors.paymentType)} sx={{ my: 2 }}>
                <InputLabel >Payment Type</InputLabel>
                <Select
                  value={paymentType}
                  label="Payment Type"
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <MenuItem value={'online'}>Online</MenuItem>
                  <MenuItem value={'pay-by-invoice'}>Pay By Invoice</MenuItem>
                  <MenuItem value={'cash-on-delivery'}>Cash On Delivery</MenuItem>
                </Select>
              </FormControl>

              {
                errors.length > 0 &&
                <ul style={{ color: 'red', fontSize: '13px' }}>
                  {
                    errors.map((err, id) => (
                      <li key={id}>{err}</li>
                    ))
                  }
                </ul>
              }

              {/* <Stack mt={5} gap={2}>
                <TextField size='small' label='Name on card' />
                <TextField size='small' label='Card Number' />
                <TextField size='small' label='Exprit' />
                <TextField size='small' label='CCV' />
              </Stack> */}
              <Stack sx={{ mt: 4 }} gap={2} direction='row' justifyContent='space-between'>
                <Button onClick={() => setTabValue(1)} sx={{ textWrap: 'nowrap' }} variant='outlined' >Back to Shipping Info</Button>
                {/* <Link to='/dashboard/complete'> */}
                <CButton isLoading={loading} onClick={handleSendPaymentInfo} variant='contained' style={{ textWrap: 'nowrap' }}>Place Order</CButton>
                {/* </Link> */}
              </Stack>
            </Stack>
          </CustomTabPanel>
        </Box>
        <OrderSummary
          errors={errors}
          companyAllowance={companyAllowance}
          setCompanyAllowance={setCompanyAllowance} />
      </Stack>
    </Box>
  )
}

export default CheckPage