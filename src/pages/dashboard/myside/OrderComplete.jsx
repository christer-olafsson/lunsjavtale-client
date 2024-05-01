import { useTheme } from '@emotion/react'
import { ArrowBack } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import OrderSummary from '../../../components/dashboard/OrderSummary'

const OrderComplete = () => {
  const theme = useTheme()
  return (
    <Box sx={{ maxWidth: '1368px' }}>

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Link to='/dashboard/myside/checkout'>
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Checkout</Typography>
        <Box></Box>
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 2, lg: 3 }} mt={3}>


        <Box sx={{
          width: { xs: '100%', lg: '70%' },
          p: { xs: 0, lg: 3 },
          display: 'flex',
          flexDirection: 'column',
          textAlign:'center',
          justifyContent:'center',
          alignItems:'center',
          gap: 1
        }}>
          <img style={{width:'150px'}} src="/image 30.png" alt="" />
          <Typography sx={{fontSize:'18px',fontWeight:600}}>Thank you ! Your Order is Completed !</Typography>
          <Typography sx={{fontSize:'14px',fontWeight:400}}>You will receive an order confirmation email with details of your order.</Typography>
          <Box sx={{display:'inline-flex',textAlign:'center'}}>
            <Typography sx={{fontSize:'24px',fontWeight:600}}>Order ID:</Typography>
            <Typography sx={{fontSize:'24px',fontWeight:600,color:'primary.main',ml:1}}>#2548654 </Typography>
          </Box>
        </Box>
        <OrderSummary/>
      </Stack>
    </Box>
  )
}

export default OrderComplete