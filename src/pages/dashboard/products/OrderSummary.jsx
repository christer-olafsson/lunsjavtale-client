/* eslint-disable react/prop-types */
import { Close, Edit } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CDialog from '../../../common/dialog/CDialog';
import { ME } from '../../../graphql/query';
import { ADDED_CARTS } from './graphql/query';
import { useTheme } from '@emotion/react';

const OrderSummary = ({ errors, companyAllowance, setCompanyAllowance }) => {
  const [allowanceDialog, setAllowanceDialog] = useState(false);
  const [addedCarts, setAddedCarts] = useState([]);
  const [totalCalculatedValue, setTotalCalculatedValue] = useState({})

  const { pathname } = useLocation();
  const { data: user } = useQuery(ME)
  const theme = useTheme()

  useQuery(ADDED_CARTS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddedCarts(res.addedCarts.edges.map(item => item.node))
    }
  });


  const calculateTotals = (data, allowancePercent = 0) => {
    const totalPricesWithTax = data.reduce((acc, item) => acc + parseFloat(item.totalPriceWithTax), 0);
    const totalPrices = data.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
    const totalQuantity = data.reduce((acc, item) => acc + parseFloat(item.quantity), 0);

    // Calculate the adjusted total price with tax based on the allowance percentage
    const payByStaffs = totalPricesWithTax * (1 - allowancePercent / 100);
    const payByCompany = totalPricesWithTax - payByStaffs
    return {
      totalPrices: totalPrices.toFixed(2),
      totalPricesWithTax: totalPricesWithTax.toFixed(2),
      payByStaffs: payByStaffs.toFixed(2),
      totalQuantity,
      payByCompany: payByCompany.toFixed(2)
    };
  };



  const isMySideCartPage = pathname === '/dashboard/myside/cart';
  const isProductCartPage = pathname === '/dashboard/products/cart';
  const isCheckoutPage = pathname === '/dashboard/products/checkout';

  function handleAllowanceDialogClose() {
    setAllowanceDialog(false)
  }

  // useEffect(() => {
  //   if (isCheckoutPage) {
  //     setAllowanceDialog(true)
  //   }
  // }, [isCheckoutPage])


  useEffect(() => {
    setTotalCalculatedValue(calculateTotals(addedCarts, companyAllowance))
  }, [addedCarts, companyAllowance])

  return (
    <Stack sx={{
      position: { xs: 'static', md: 'sticky' },
      top: 80,
      height: 'fit-content',
      flex: 1,
      mb: 6,
      p:2,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '8px'
    }}>
      <Typography sx={{ fontSize: '24px', fontWeight: 600}}>Order Summary</Typography>
      {/* <Stack sx={{
        bgcolor: 'light.main',
        p: 2, mt: 2,
        display: isMySideCartPage || isProductCartPage ? 'none' : 'flex'
      }} direction='row' justifyContent='space-between'>
        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: '14px' }}>Product</Typography>
        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: '14px' }}>Product Info</Typography>
        <Typography sx={{ flex: 1, fontWeight: 600, fontSize: '14px' }}>Price</Typography>
      </Stack> */}

      {/* company allowance dialog */}
      <CDialog openDialog={allowanceDialog}>
        <Stack justifyContent='space-between' sx={{
          height: '70vh',
          p: { xs: .5, md: 3 }
        }}>
          <Box>
            <Stack sx={{
              padding: '12px 24px',
              border: '1px solid gray',
              borderRadius: '8px', mb: 2
            }} direction='row' justifyContent='space-between' alignItems='center'>
              <Typography sx={{ fontSize: { xs: '18px', md: '24px' }, fontWeight: 600 }}>Company Allowance</Typography>
              <IconButton onClick={handleAllowanceDialogClose}><Close /></IconButton>
            </Stack>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>How much you want to pay for this order</Typography>
            <Autocomplete
              onInputChange={(event, newInputValue) => {
                setCompanyAllowance(newInputValue);
              }}
              freeSolo
              disablePortal
              options={['0', '25', '30', '35', '40', '45', '50', '75', '100']}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Select your percent" />}
            />
          </Box>
          <Button onClick={handleAllowanceDialogClose} variant='contained'>Continue</Button>
        </Stack>
      </CDialog>
      {/* {
        (pathname === '/dashboard/products/checkout') &&
        <Box sx={{
          bgcolor: 'light.main',
          p: 3,
          borderRadius: '8px',
          my: 4
        }}>
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Have a promo code/coupon code ?</Typography>
          <Stack direction='row' gap={2} alignItems='center' mt={2}>
            <TextField size='small' sx={{ flex: 3 }} placeholder='Enter copun code' />
            <Button variant='contained' sx={{ flex: 1 }}>Apply</Button>
          </Stack>
        </Box>
      } */}


      <Stack direction='row' justifyContent='space-between' p={isMySideCartPage ? 0 : 2}>
        <Stack sx={{ px: 2 }} gap={3}>
          <Typography sx={{ whiteSpace: 'nowrap' }}>SubTotal :</Typography>
          <Typography sx={{ whiteSpace: 'nowrap' }}>Total Quantity :</Typography>
          {/* <Typography>Discount (VELZON15) :</Typography> */}
          {/* <Typography>Shipping Charge :</Typography> */}
        </Stack>
        <Stack sx={{ px: 2 }} gap={3}>
          <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>kr {totalCalculatedValue.totalPrices}</Typography>
          <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}> {totalCalculatedValue.totalQuantity}</Typography>
          {/* <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>- $ 53.99</Typography> */}
          {/* <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>$ 65.00</Typography> */}
        </Stack>
      </Stack>
      {
        (pathname === '/dashboard/products/checkout') &&
        (user?.me.role === 'company-owner' || user?.me.role === 'company-manager') &&
        (pathname === '/dashboard/complete' ? '' :
          <>
            <Button
              sx={{
                mx: isMySideCartPage ? 0 : 4,
                whiteSpace: 'nowrap'
              }}
              onClick={() => setAllowanceDialog(true)}
              color={errors.companyAllowance ? 'error' : 'primary'}
              endIcon={<Edit />}
              variant='outlined'>
              Company Allowance {companyAllowance}%
            </Button>
            {errors.companyAllowance &&
              <Typography variant='body2' sx={{ color: 'red', textAlign: 'center' }}>Company Allowance Required!</Typography>}
          </>
        )
      }
      <Stack sx={{
        bgcolor: 'light.main',
        p: 2, borderRadius: '8px', mt: 2
      }} direction='row' justifyContent='space-between'>
        <Typography sx={{ fontWeight: 600 }}>Total <i style={{ fontWeight: 400, fontSize: '13px' }}>(Tax 15%)</i>  :</Typography>
        <Typography sx={{ fontWeight: 600 }}>kr {totalCalculatedValue.totalPricesWithTax}</Typography>
      </Stack>
      {
        (pathname === '/dashboard/products/checkout') &&
        <>
          <Stack sx={{
            bgcolor: 'light.main',
            // border: `1px solid ${theme.palette.primary.main}`,
            // color:'#fff',
            p: 2, borderRadius: '8px', mt: 2
          }} direction='row' justifyContent='space-between'>
            <Typography sx={{ fontWeight: 600 }}>Total <i style={{ fontWeight: 400, fontSize: '13px' }}>(Pay by Staffs)</i>  :</Typography>
            <Typography sx={{ fontWeight: 600 }}>kr {totalCalculatedValue.payByStaffs}</Typography>
          </Stack>
          <Stack sx={{
            bgcolor: 'light.main',
            border: `1px solid ${theme.palette.primary.main}`,
            // color:'#fff',
            p: 2, borderRadius: '8px', mt: 2
          }} direction='row' justifyContent='space-between'>
            <Typography sx={{ fontWeight: 600 }}>Total <i style={{ fontWeight: 400, fontSize: '13px' }}>(Pay by Company)</i>  :</Typography>
            <Typography sx={{ fontWeight: 600 }}>kr {totalCalculatedValue.payByCompany}</Typography>
          </Stack>
        </>
      }
      {
        (isMySideCartPage || isProductCartPage) &&
        <Link to={isProductCartPage ? '/dashboard/products/checkout' : '/dashboard/myside/checkout'}>
          <Button variant='contained' sx={{ mt: 3, width: '100%' }}>Checkout</Button>
        </Link>
      }
    </Stack>
  )
}

export default OrderSummary