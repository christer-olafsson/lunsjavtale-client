import { Close, Edit } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CDialog from '../../common/dialog/CDialog';
import { useTheme } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';

const OrderSummary = () => {
  const [allowanceDialog, setAllowanceDialog] = useState(false);
  const [allowanceValue, setAllowanceValue] = useState('0%');

  const { pathname } = useLocation();

  const isMySideCartPage = pathname === '/dashboard/myside/cart';
  const isProductCartPage = pathname === '/dashboard/products/cart';

  function handleAllowanceDialogClose() {
    setAllowanceDialog(false)
  }

  const theme = useTheme();

  return (
    <Stack sx={{
      flex: 1,
      mt: {xs:6,lg:0},
      mb:6,
      border: isMySideCartPage || isProductCartPage ? '' : `1px solid ${theme.palette.primary.main}`,
      borderRadius: '8px'
    }}>
      <Typography sx={{ fontSize: '24px', fontWeight: 600, px: 2, pt: 2 }}>Order Summary</Typography>
      <Stack sx={{
        bgcolor: 'light.main',
        p: 2, mt: 2,
        display: isMySideCartPage || isProductCartPage ? 'none' : 'flex'
      }} direction='row' justifyContent='space-between'>
        <Typography sx={{flex:1, fontWeight: 600, fontSize: '14px' }}>Product</Typography>
        <Typography sx={{flex:1, fontWeight: 600, fontSize: '14px' }}>Product Info</Typography>
        <Typography sx={{flex:1, fontWeight: 600, fontSize: '14px' }}>Price</Typography>
      </Stack>

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
        isMySideCartPage ?
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
          </Box> :
          <Stack gap={1} mb={1} p={2}>
            {
              [1, 2, 3].map((item, id) => (
                <Stack key={id} sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  p: 1.5, borderRadius: '8px'
                }} direction='row' mt={1} alignItems='center'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }} src="/insImg3.png" alt="" />
                    <Box>
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, lineHeight: '15px', mb: .5 }} mr={4}>The lunch collective's Caesar salad</Typography>
                      <Typography sx={{ fontSize: '14px' }} mr={4}>$200.00 x2</Typography>
                    </Box>
                  </Box>
                  <Typography>$200.00</Typography>
                </Stack>
              ))
            }
          </Stack>
      }


      <Stack direction='row' justifyContent='space-between' p={isMySideCartPage ? 0 : 2}>
        <Stack sx={{ px: 2 }} gap={3}>
          <Typography>SubTotal</Typography>
          <Typography>Discount (VELZON15) :</Typography>
          <Typography>Shipping Charge :</Typography>
          <Typography>Estimated Tax (12.5%) :</Typography>
        </Stack>
        <Stack sx={{ px: 2, mb: 2 }} gap={3}>
          <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>$ 359.96</Typography>
          <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>- $ 53.99</Typography>
          <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>$ 65.00</Typography>
          <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end' }}>$ 44.99</Typography>
        </Stack>
      </Stack>
      {
        pathname === '/dashboard/complete' ?
          <Button disableRipple sx={{ mx: 4 }} variant='outlined'>Company Allowance {allowanceValue}</Button> :
          <Button sx={{mx: isMySideCartPage ? 0 : 4  }} onClick={() => setAllowanceDialog(true)} endIcon={<Edit />} variant='outlined'>Company Allowance {allowanceValue}</Button>
      }
      <Stack sx={{
        bgcolor: 'light.main',
        p: 2, borderRadius: '8px', mt: 2
      }} direction='row' justifyContent='space-between'>
        <Typography sx={{ fontWeight: 600 }}>Total(USD) :</Typography>
        <Typography sx={{ fontWeight: 600 }}>$415.96</Typography>
      </Stack>
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