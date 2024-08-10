import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { ORDER_PAYMENTS } from './graphql/query';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import DataTable from '../../../components/dashboard/DataTable';
import { Person2Outlined } from '@mui/icons-material';
import useIsMobile from '../../../hook/useIsMobile';
import { Link } from 'react-router-dom';

const PaymentHistory = () => {
  const [orderPayents, setOrderPayents] = useState([])

  const isMobile = useIsMobile()

  const { loading, error } = useQuery(ORDER_PAYMENTS, {
    onCompleted: (res) => {
      setOrderPayents(res.orderPayments.edges.map(item => item.node));
    }
  });

  const columns = [
    {
      field: 'createdDate', width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Created On</Typography>
      ),
      renderCell: (params) => {
        return (
          <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
            <Typography sx={{ fontSize: { xs: '12px', md: '16px' } }}>{format(params.row.createdOn, 'dd-MM-yyyy')}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'paymentFor', headerName: '', width: 250,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Payment For</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' gap={1} alignItems='center'>
          <Person2Outlined />
          <Box >
            <Stack direction='row' alignItems='center'>
              <Typography sx={{
                fontSize: '14px',
                fontWeight: 600,
                display: 'inline-flex',
                gap: '3px'
              }}>
                <Link to={`/dashboard/staff-details/${params.row.paymentFor?.id}`}>
                  {params.row.paymentFor?.username && '@ ' + params.row.paymentFor?.username}
                </Link>
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: '14px' }}>{params.row.paymentFor?.email}</Typography>
          </Box>
        </Stack>
      )
    },
    {
      field: 'paymentType', headerName: 'Prce', width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Payment Type</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Typography sx={{ fontSize: '14px', fontWeight: 600, bgcolor: 'lightgray', px: 2, borderRadius: '4px' }}>
            {params.row.paymentType}
          </Typography>
        </Stack>
      )
    },
    {
      field: 'paidAmount',
      headerName: '',
      width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Paid Amount</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Typography sx={{ fontSize: '14px', color: '#fff', fontWeight: 600, bgcolor: 'green', px: 2, borderRadius: '4px' }}>
            <span style={{ fontWeight: 400, }}>kr </span>
            {params.row.paidAmount}
          </Typography>
        </Stack>
      )
    },
    {
      field: 'status', headerName: '',
      width: isMobile ? 200 : undefined,
      flex: isMobile ? undefined : 1,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Status</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Typography sx={{ fontWeight: 600 }}>
            {params.row.status}
          </Typography>
        </Stack>
      )
    },
  ];

  return (
    <Box maxWidth='xl'>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} justifyContent='space-between'>
        <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Payment History</Typography>
      </Stack>
      <Box mt={3}>
        {
          loading ? <Loader /> : error ? <ErrorMsg /> :
            <DataTable
              columns={columns}
              rows={orderPayents}
            />
        }
      </Box>
    </Box>
  )
}

export default PaymentHistory