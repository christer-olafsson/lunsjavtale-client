import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import Cart from '../../../components/dashboard/Cart';
import OrderSummary from '../../../components/dashboard/OrderSummary';

const CartPage = () => {

  // const handleProductSave () => {
  //     productMutation({
  //       variables: {
  //         dates: [
  //           {
  //             date: '12.05.2024',
  //             quantity: 6,
  //             addedFor: [12,20,13,32,23,32]
  //           },
  //           {
  //             date: '13.05.2024',
  //             quantity: 4,
  //             addedFor: [10,20,11,21]
  //           },
  //           {
  //             date: '14.05.2024',
  //             quantity: 3,
  //             addedFor: [15,10,11,]
  //           },
  //         ],
  //         ingredients: [1,2,4],
  //         item: 2
  //       }
  //     })
  // }


  return (
    <Box maxWidth='lg'>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Link to='/dashboard/myside'>
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

export default CartPage