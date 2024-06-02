import { Add, ArrowForwardIos, BorderColor, Check } from '@mui/icons-material'
import { Box, Button, Collapse, FormGroup, IconButton, Paper, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import AddBillingInfo from './billingInfo/AddBillingInfo'



const Payment = () => {
  const [openPaymentGateway, setOpenPaymentGateway] = useState(false)
  const [openBillingInfo, setOpenBillingInfo] = useState(false)

  
  return (
    <Box>
      <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1 }}>Payment Settings</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>View and update your payment  details</Typography>

      {/* payment getway integration */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Payment Gateway Integration</Typography>
          <IconButton onClick={() => setOpenPaymentGateway(!openPaymentGateway)}>
            <ArrowForwardIos sx={{
              transition: 'transform .3s ease',
              transform: openPaymentGateway ? 'rotate(90deg)' : 'none'
            }} />
          </IconButton>
        </Stack>
        <Collapse in={openPaymentGateway} >
          <Stack mt={2} direction='row' alignItems='center' justifyContent='space-between'>
            <Box></Box>
            <Button variant='contained' startIcon={<Add />}>Add</Button>
          </Stack>
          <Box sx={{
            border: '1px solid lightgray',
            borderRadius: '8px', p: 3, mt: 3
          }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Primary Payment Method</Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>On 04 March, 2024</Typography>
            <Stack mt={2} direction='row' justifyContent='space-between'>
              <Stack direction='row' alignItems='center' spacing={2}>
                <Box sx={{
                  bgcolor: 'light.main',
                  width: '72px', height: '58px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px'
                }}>
                  <img src="/visaicon.png" alt="" />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Visa</Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>******6556</Typography>
                </Box>
              </Stack>
              <IconButton>
                <BorderColor />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{
            border: '1px solid lightgray',
            borderRadius: '8px', p: 3, mt: 3
          }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Payment Method</Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>On 04 March, 2024</Typography>
            <Stack mt={2} direction='row' justifyContent='space-between'>
              <Stack direction='row' alignItems='center' spacing={2}>
                <Box sx={{
                  bgcolor: 'light.main',
                  width: '72px', height: '58px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px'
                }}>
                  <img src="/visaicon.png" alt="" />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Visa</Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>******6556</Typography>
                </Box>
              </Stack>
              <IconButton>
                <BorderColor />
              </IconButton>
            </Stack>
          </Box>
        </Collapse>
      </Paper>
      
      
      {/* billing information */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Billing Information</Typography>
          <IconButton onClick={() => setOpenBillingInfo(!openBillingInfo)}>
            <ArrowForwardIos sx={{
              transition: 'transform .3s ease',
              transform: openBillingInfo ? 'rotate(90deg)' : 'none'
            }} />
          </IconButton>
        </Stack>
        <Collapse in={openBillingInfo} >
          {/* <Stack direction='row' justifyContent='space-between'>
            <Box/>
            <Button variant='contained'>Add Billing Address</Button>
          </Stack> */}
          <AddBillingInfo/>
        </Collapse>
      </Paper>
    </Box>
  )
}

export default Payment