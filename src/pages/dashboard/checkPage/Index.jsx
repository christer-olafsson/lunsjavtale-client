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

  const openPaymentGateway = (paymentUrl) => {
    window.location.href = paymentUrl
  };

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
      toast.success('Bestilling plassert')
      setErrors({})
      if (res.placeOrder.paymentUrl) {
        openPaymentGateway(res.placeOrder.paymentUrl)
      } else {
        navigate('/dashboard/orders')
      }

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
      setErrors({ address: 'Fakturaadresse er påkrevd!' })
      toast.error('Fakturaadresse er påkrevd!')
      return
    }
    if (!shippingAddressId) {
      setErrors({ shippingAddress: 'Leveringsadresse er påkrevd!' })
      toast.error('Leveringsadresse er påkrevd!')
      return
    }
    if (!paymentType) {
      setErrors({ paymentType: 'Betalingstype er påkrevd!' })
      toast.error('Betalingstype er påkrevd!')
      return
    }
    if (companyAllowance === null) {
      setErrors({ companyAllowance: 'Firma godtgjørelse er påkrevd!' })
      toast.error('Firma godtgjørelse er påkrevd!')
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
    if (companyAllowance !== null) {
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
        <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Kasse</Typography>
      </Stack>
      <Stack direction={{ xs: 'column-reverse', md: 'row' }} gap={{ xs: 2, lg: 3 }} mt={3}>

        <Box sx={{
          width: { xs: '100%', lg: '70%' },
          p: { xs: 0, lg: 3 },
        }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} aria-label="basic tabs example">
              <Tab sx={{ textTransform: 'none' }} label="Faktureringsinformasjon" />
              <Tab sx={{ textTransform: 'none' }} label="Fraktinformasjon" />
              <Tab sx={{ textTransform: 'none' }} label="Betalingsinformasjon" />
            </Tabs>
          </Box>

          <CustomTabPanel value={tabValue} index={0}>
            <Box>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Faktureringsinformasjon</Typography>
              <Typography>Vennligst fyll ut all informasjon nedenfor</Typography>

              <Stack flex={1} gap={2} mt={3}>
                <TextField
                  value={billingAddressPayload.firstName}
                  onChange={handleBillingInputChange}
                  name='firstName'
                  label="Fornavn"
                  variant="standard"
                />
                <TextField
                  value={billingAddressPayload.lastName}
                  onChange={handleBillingInputChange}
                  name='lastName'
                  label="Etternavn"
                  variant="standard"
                />
                <TextField
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                  value={billingAddressPayload.address}
                  onChange={handleBillingInputChange}
                  name='address'
                  label="Adresse"
                  variant="standard"
                />
                <TextField
                  value={billingAddressPayload.sector}
                  onChange={handleBillingInputChange}
                  name='sector'
                  label="Sektor"
                  variant="standard"
                />
                <TextField
                  value={billingAddressPayload.phone}
                  onChange={handleBillingInputChange}
                  name='phone'
                  type='number'
                  label="Telefon"
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
                >Fortsett til frakt
                </Button>
              </Stack>

            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <ShippingInfo shippingInfoErr={errors.shippingAddress} />
            <Stack sx={{ mt: 4 }} gap={2} direction='row' justifyContent='space-between'>
              <Button onClick={() => setTabValue(0)} sx={{ textWrap: 'nowrap' }} variant='outlined' >Tilbake til fakturainformasjon</Button>
              <Button onClick={() => setTabValue(2)} sx={{ textWrap: 'nowrap' }} variant='contained' >Fortsett til betaling</Button>
            </Stack>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2}>
            <Stack>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Betalingsvalg</Typography>
              <Typography>Vennligst fyll ut all informasjon nedenfor</Typography>

              <FormControl error={Boolean(errors.paymentType)} sx={{ my: 2 }}>
                <InputLabel >Betalingstype</InputLabel>
                <Select
                  value={paymentType}
                  label="Betalingstype"
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <MenuItem value={'online'}>Vipps</MenuItem>
                  <MenuItem value={'pay-by-invoice'}>Betal med faktura</MenuItem>
                  <MenuItem value={'cash-on-delivery'}>Kontant ved levering</MenuItem>
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
                <Button onClick={() => setTabValue(1)} sx={{ textWrap: 'nowrap' }} variant='outlined' >Tilbake til fraktinformasjon</Button>
                {/* <Link to='/dashboard/complete'> */}
                <CButton isLoading={loading} onClick={handleSendPaymentInfo} variant='contained' style={{ textWrap: 'nowrap' }}>{paymentType === 'online' ? 'Betal nå' : 'Plasser bestilling'}</CButton>
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