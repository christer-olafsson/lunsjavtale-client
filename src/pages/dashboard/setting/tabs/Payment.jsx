import { Add, ArrowForwardIos, BorderColor, Check } from '@mui/icons-material'
import { Box, Button, Collapse, FormGroup, IconButton, Paper, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import DataTable from '../../../../components/dashboard/DataTable'

const rows = [
  { id: 1, amount: '1200', status: 'success', date: 'Dec 15, 2024', info: 'democontact2132@mail.com' },
  { id: 2, amount: '1200', status: 'success', date: 'Dec 15, 2024', info: 'democontact2132@mail.com' },
  { id: 3, amount: '1200', status: 'success', date: 'Dec 15, 2024', info: 'democontact2132@mail.com' },
]

const Payment = () => {
  const [openPaymentGateway, setOpenPaymentGateway] = useState(false)
  const [openTransaction, setOpenTransaction] = useState(false)
  const [openBillingInfo, setOpenBillingInfo] = useState(false)

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));


  const columns = [
    {
      field: 'amount', headerName: 'Amount', width: 70,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Amount</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Typography sx={{ fontSize: { xs: '12px', md: '16px' } }}>${params.row.amount}</Typography>
        </Stack>
      )
    },
    {
      field: 'status', headerName: 'Status', width: 120, 
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Status</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%', }} direction='row' alignItems='center'>
          <Stack sx={{ bgcolor: '#EBFFF1', py: '3px', px: '5px', borderRadius: '5px', color: 'primary.main' }} direction='row' alignItems='center'>
            <Check />
            <Typography sx={{ fontSize: { xs: '12px', md: '16px' }, }}>{params.row.status}</Typography>
          </Stack>
        </Stack>
      )
    },
    { field: 'date', headerName: 'Date', width: 120, renderHeader: () => (
      <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Date</Typography>
    ), },
    { field: 'info', headerName: 'Info', width: 250, renderHeader: () => (
      <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Info</Typography>
    ), },
  ]
  return (
    <Box>
      <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1 }}>Payment Settings</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>View and update your payment  details</Typography>

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

      <Paper sx={{ p: {xs:!openTransaction ? 2:0,lg:2}, mt: 3 }}>
        <Stack sx={{px:{xs: !openTransaction ? 0 : 2,lg:0}}} direction='row' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Transaction History</Typography>
          <IconButton onClick={() => setOpenTransaction(!openTransaction)}>
            <ArrowForwardIos sx={{
              transition: 'transform .3s ease',
              transform: openTransaction ? 'rotate(90deg)' : 'none'
            }} />
          </IconButton>
        </Stack>
        <Collapse in={openTransaction} >
          <Typography sx={{ fontSize: '15px', color: 'primary.main',px:{xs:2,lg:0} }}>We received your payments !</Typography>
          <Stack direction='row' alignItems='center' justifyContent='space-between' mt={2}>
            <Box />
            <Button sx={{mr:{xs:2,lg:0}}} startIcon={<Add />} variant='contained'>Create Payment</Button>
          </Stack>
          <Box mt={3}>
            <DataTable columns={columns} rows={rows} />
          </Box>
        </Collapse>
      </Paper>

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
          <FormGroup>
            <Box mt={4}>
              <Stack direction='row' gap={2} mb={2}>
                <Stack flex={1} gap={2}>
                  <TextField required size='small' label='Name' value={'Construccion e inmobiliari'} />
                  <TextField required size='small' label='Business Address' value={'87234 Preston Rd. Inglewoo'} />
                  <TextField required size='small' label='First name' value={'Floyd Miles'} />
                </Stack>
                <Stack flex={1} gap={2}>
                  <TextField required size='small' label='Sector' value={'Closing Office'} />
                  <TextField required size='small' label='Country' value={'Corbin City'} />
                  <TextField required size='small' label='Last Name' value={'Marjorie'} />
                </Stack>
              </Stack>
            </Box>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mt={2}>
              <Box />
              <Button variant='contained'>Save Change</Button>
            </Stack>
          </FormGroup>
        </Collapse>
      </Paper>
    </Box>
  )
}

export default Payment