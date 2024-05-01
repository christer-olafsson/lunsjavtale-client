import { useTheme } from '@emotion/react';
import { Add, ArrowBack, Close, Remove } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Cart = () => {
  const [quantity, setQuantity] = useState(3)

  const theme = useTheme();

  const toggleQuantity = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1)
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }
  return (
    <Stack gap={3}>
      {
        [1, 2, 3].map((item, id) => (
          <Paper key={id} elevation={2} sx={{
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
                  <Typography sx={{ fontSize: { xs: '14px', lg: '16px' }, fontWeight: 600 }}>The lunch collective's Caesar salad</Typography>
                  <Typography mb={1}>Lunch</Typography>
                  <Stack sx={{
                    width: { xs: '120px', lg: '150px' },
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '4px'
                  }} direction='row' alignItems='center' justifyContent='space-between' >
                    <IconButton sx={{
                      borderRight: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: 0
                    }} onClick={() => toggleQuantity('decrease')}><Remove sx={{ fontSize: { xs: '13px', lg: '18px' } }} /></IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton sx={{
                      borderLeft: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: 0
                    }} onClick={() => toggleQuantity('increase')}><Add sx={{ fontSize: { xs: '13px', lg: '18px' } }} /></IconButton>
                  </Stack>
                </Box>
              </Stack>
              <Box>
                <Typography sx={{ fontSize: { xs: '14px', lg: '16px' }, fontWeight: 400 }}>Item Price</Typography>
                <Typography sx={{ fontSize: { xs: '14px', lg: '16px' }, fontWeight: 600 }}>$200.00</Typography>
              </Box>
            </Stack>
            <Stack sx={{
              bgcolor: '#fff',
              px: 3,
              py: 1
            }} direction='row' justifyContent='space-between' alignItems='center'>
              <Button size='small' startIcon={<Close />}>Remove</Button>
              <Typography sx={{ fontSize: { xs: '14px', lg: '16px' } }}>Total: <b>$400.00</b></Typography>
            </Stack>
          </Paper>
        ))
      }
    </Stack>
  )
}

export default Cart