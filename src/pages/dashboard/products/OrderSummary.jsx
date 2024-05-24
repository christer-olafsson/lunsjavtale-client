import { Close, Edit } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CDialog from '../../../common/dialog/CDialog';
import { ME } from '../../../graphql/query';
import { ADDED_CARTS } from './graphql/query';

const OrderSummary = () => {
  const [allowanceDialog, setAllowanceDialog] = useState(false);
  const [allowanceValue, setAllowanceValue] = useState('0%');
  const [addedCarts, setAddedCarts] = useState([]);
  const [totalCalculatedValue, setTotalCalculatedValue] = useState({})




  const calculateTotals = (data) => {
    const totalPricesWithTax = data.reduce((acc, item) => acc + parseFloat(item.totalPriceWithTax), 0);
    const totalPrices = data.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
    const totalTax = totalPricesWithTax - totalPrices;
    return {
      totalPrices: totalPrices.toFixed(2),
      totalPricesWithTax: totalPricesWithTax.toFixed(2),
      totalTax: totalTax.toFixed(2)
    };
  };


  useEffect(() => {
    setTotalCalculatedValue(calculateTotals(addedCarts))
  }, [addedCarts])






  console.log(totalCalculatedValue)

  const { pathname } = useLocation();
  const { data: user } = useQuery(ME)

  const { loading, error } = useQuery(ADDED_CARTS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddedCarts(res.addedCarts.edges.map(item => item.node))
    }
  });

  const isMySideCartPage = pathname === '/dashboard/myside/cart';
  const isProductCartPage = pathname === '/dashboard/products/cart';

  function handleAllowanceDialogClose() {
    setAllowanceDialog(false)
  }


  return (
    <Stack sx={{
      position: 'sticky',
      top: 80,
      height: 'fit-content',
      flex: 1,
      mt: { xs: 6, lg: 0 },
      mb: 6,
      // border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '8px'
    }}>
      <Typography sx={{ fontSize: '24px', fontWeight: 600, px: 2, pt: 2 }}>Order Summary</Typography>
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
                setAllowanceValue(newInputValue);
              }}
              disablePortal
              id="combo-box-demo"
              options={['0%', '25%', '30%', '35%', '40%', '45%', '50%', '75%', '100%']}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Select your percent" />}
            />
          </Box>
          <Button onClick={handleAllowanceDialogClose} variant='contained'>Continue</Button>
        </Stack>
      </CDialog>
      {
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
      }


      <Stack direction='row' justifyContent='space-between' p={isMySideCartPage ? 0 : 2}>
        <Stack sx={{ px: 2 }} gap={3}>
          <Typography>SubTotal :</Typography>
          {/* <Typography>Discount (VELZON15) :</Typography> */}
          {/* <Typography>Shipping Charge :</Typography> */}
          <Typography>Estimated Tax (15%) :</Typography>
        </Stack>
        <Stack sx={{ px: 2, mb: 2 }} gap={3}>
          <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>kr {totalCalculatedValue.totalPrices}</Typography>
          {/* <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>- $ 53.99</Typography> */}
          {/* <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>$ 65.00</Typography> */}
          <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>kr {totalCalculatedValue.totalTax}</Typography>
        </Stack>
      </Stack>
      {
        (pathname === '/dashboard/products/checkout') &&
        (user?.me.role === 'owner' || user?.me.role === 'manager') &&
        (pathname === '/dashboard/complete' ?
          <Button disableRipple sx={{ mx: 4 }} variant='outlined'>Company Allowance {allowanceValue}</Button> :
          <Button sx={{ mx: isMySideCartPage ? 0 : 4, }} onClick={() => setAllowanceDialog(true)} endIcon={<Edit />} variant='outlined'>Company Allowance {allowanceValue}</Button>)
      }
      <Stack sx={{
        bgcolor: 'light.main',
        p: 2, borderRadius: '8px', mt: 2
      }} direction='row' justifyContent='space-between'>
        <Typography sx={{ fontWeight: 600 }}>Total(NOK) :</Typography>
        <Typography sx={{ fontWeight: 600 }}>kr {totalCalculatedValue.totalPricesWithTax}</Typography>
      </Stack>
      {
        (isMySideCartPage || isProductCartPage) &&
        <Link to={isProductCartPage ? '/dashboard/products/checkout' : '/dashboard/myside/checkout'}>
          <Button variant='contained' sx={{ my: 3, width: '100%' }}>Checkout</Button>
        </Link>
      }
    </Stack>
  )
}

export default OrderSummary