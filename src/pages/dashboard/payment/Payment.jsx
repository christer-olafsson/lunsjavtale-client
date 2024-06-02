import { Add, ArrowForwardIos, Check } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import DataTable from '../../../components/dashboard/DataTable'


const rows = [
  { id: 1, amount: '1200', status: 'success', date: 'Dec 15, 2024', info: 'democontact2132@mail.com' },
  { id: 2, amount: '1200', status: 'success', date: 'Dec 15, 2024', info: 'democontact2132@mail.com' },
  { id: 3, amount: '1200', status: 'success', date: 'Dec 15, 2024', info: 'democontact2132@mail.com' },
]

const Payment = () => {

  const columns = [
    {
      field: 'amount', headerName: 'Amount', width: 150,
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
      field: 'status', headerName: 'Status', width: 150,
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
    {
      field: 'date', headerName: 'Date', width: 150, renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Date</Typography>
      ),
    },
    {
      field: 'info', headerName: 'Info', width: 250, renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Info</Typography>
      ),
    },
  ]
  return (
    <Box>
      <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Transaction History</Typography>
      <Box >
        <Stack direction='row' alignItems='center' justifyContent='space-between' mt={2}>
          <Box />
          <Button sx={{ mr: { xs: 2, lg: 0 } }} startIcon={<Add />} variant='contained'>Create Payment</Button>
        </Stack>
        <Box mt={3}>
          <DataTable columns={columns} rows={rows} />
        </Box>
      </Box>
    </Box>
  )
}

export default Payment