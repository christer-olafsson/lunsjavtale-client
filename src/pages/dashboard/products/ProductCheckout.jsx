import { useTheme } from '@emotion/react';
import { ArrowBack, CheckCircle, Close, Edit } from '@mui/icons-material'
import { Autocomplete, Box, Button, Divider, IconButton, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CButton from '../../../common/CButton/CButton';
import CDialog from '../../../common/dialog/CDialog';
import OrderSummary from '../../../components/dashboard/OrderSummary';
import CheckOut from '../../../components/dashboard/CheckOut';


const ProductCheckout = () => {
 
  return (
    <Box sx={{ maxWidth: '1368px' }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Link to='/dashboard/products/cart'>
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
        }}>
         <CheckOut/>
        </Box>
        <OrderSummary />
      </Stack>
    </Box>
  )
}

export default ProductCheckout