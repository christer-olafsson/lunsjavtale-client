import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import Cart from '../../../components/dashboard/Cart';
import OrderSummary from '../../../components/dashboard/OrderSummary';

const ProductCartPage = () => {
  return (
    <Box maxWidth='lg'>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Link to='/dashboard/products'>
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Shopping Cart</Typography>
        <Box></Box>
      </Stack>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={{ xs: 2, lg: 3 }} mt={3}>
        <Box sx={{
          width: { xs: '100%', lg: '70%' },
          p: { xs: 0, lg: 3 },
        }}>
          <Cart />
        </Box>
        <OrderSummary />
      </Stack>
    </Box>
  )
}

export default ProductCartPage