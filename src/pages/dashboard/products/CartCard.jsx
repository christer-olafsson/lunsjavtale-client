/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { useTheme } from '@emotion/react';
import { Add, ArrowBack, CalendarMonthOutlined, Close, Remove } from '@mui/icons-material';
import { Box, Button, IconButton, ListItem, ListItemIcon, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { REMOVE_CART } from './graphql/mutation';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import { ADDED_CARTS } from './graphql/query';

const CartCard = ({ data }) => {
  const [removeProductId, setRemoveProductId] = useState('');


  const [removeCart, { loading: removeLoading }] = useMutation(REMOVE_CART, {
    onCompleted: (res) => {
      setRemoveProductId(null)
      toast.success(res.removeCart.message)
    },
    refetchQueries: [ADDED_CARTS],
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const handleProductRemove = () => {
    removeCart({
      variables: {
        id: data.id
      }
    })
  }

  return (
    <Paper elevation={2} sx={{
      bgcolor: 'light.main',
    }}>
      <Stack sx={{ p: { xs: 1, lg: 3 } }} direction='row' justifyContent='space-between'>
        <Stack direction='row' gap={2} alignItems='center'>
          <Box sx={{
            width: { xs: '64px', lg: '128px' },
            height: { xs: '64px', lg: '128px' },
            bgcolor: '#fff',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 1
          }}>
            <img style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }} src="/insImg3.png" alt="" />
          </Box>
          <Box>
            <Stack direction='row' gap={1} mb={1}>
              <CalendarMonthOutlined />
              <Typography sx={{ fontWeight: 600 }}>{data?.date}</Typography>
            </Stack>
            <Typography sx={{ fontSize: { xs: '14px', lg: '16px' }, fontWeight: 600 }}>{data?.item?.name}</Typography>
            <Typography sx={{ fontSize: '14px' }} mb={1}>Category: {data?.item?.category.name}</Typography>
            <Typography sx={{
              fontSize: '14px',
              fontWeight: 600,
              border: '1px solid gray',
              width: '140px',
              p: 1, textAlign: 'center',
              borderRadius: '50px'

            }}>Quantity: {data?.quantity}</Typography>
          </Box>
        </Stack>
        <Box>
          <Typography sx={{ fontSize: { xs: '14px', lg: '16px' } }}>Item Price</Typography>
          <Typography sx={{ fontSize: { xs: '14px', lg: '16px' } }}>NOK: {data?.item?.priceWithTax}</Typography>
        </Box>
      </Stack>
      <Stack sx={{
        bgcolor: '#fff',
        px: 3,
        py: 1
      }} direction='row' justifyContent='space-between' alignItems='center'>
        <CButton onClick={handleProductRemove} isLoading={removeLoading} size='small' startIcon={<Close />}>Remove</CButton>
        <Typography sx={{ fontSize: { xs: '14px', lg: '16px' } }}>Total NOK:<b> {data?.totalPriceWithTax}</b></Typography>
      </Stack>
    </Paper>
  )
}

export default CartCard