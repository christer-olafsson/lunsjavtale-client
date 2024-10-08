import { AccessTime, AccessTimeOutlined, ArrowRight, BorderColor, CalendarMonthOutlined, Search, TrendingFlat } from '@mui/icons-material'
import { Box, Button, IconButton, Input, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import DataTable from '../../../components/dashboard/DataTable'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ORDERS } from './graphql/query';
import { format } from 'date-fns';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import { nb } from 'date-fns/locale';
import moment from 'moment-timezone';
import useIsMobile from '../../../hook/useIsMobile';

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [orderId, setOrderId] = useState('')

  const isMobile = useIsMobile()

  const { loading, error: orderErr } = useQuery(ORDERS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      id: orderId
    },
    onCompleted: (res) => {
      setOrders(res.orders.edges.map(item => item.node));
    }
  });


  function timeUntilNorway(futureDate, mode = "") {
    if (mode === "Delivered") {
      return "Delivered";
    }
    if (mode === "Cancelled") {
      return "Cancelled";
    }

    const now = moment().tz("Europe/Oslo").startOf('day');
    const future = moment.tz(futureDate, "UTC").tz("Europe/Oslo").startOf('day');

    const diffInMilliseconds = future.diff(now);
    if (diffInMilliseconds < 0) {
      return 'Date passed';
    }

    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Delivery Today';
    } else {
      return `Delivery in ${diffInDays} days`;
    }
  }

  const columns = [
    {
      field: 'id', headerName: '', width: 100,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>ID</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Link style={{ textDecoration: 'none' }} to={`/dashboard/orders/details/${params.row.id}`}>
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>&#x2022; {params.row.id}</Typography>
          </Link>
        </Stack>
      ),
    },
    {
      field: 'orderDate', width: 170,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Ordered On</Typography>
      ),
      renderCell: (params) => {
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>{format(params.row.orderDate, 'dd-MMM-yy')}</Typography>
            <Typography sx={{ fontSize: { xs: '12px', md: '14px' }, fontWeight: 500, display: 'inline-flex' }}>
              <AccessTime sx={{ mr: .5 }} fontSize='small' />
              {format(params.row.orderDate, 'hh:mm a')}
            </Typography>
          </Stack>
        )
      }
    },
    {
      field: 'deliveryDate', headerName: 'Prce', width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Delivery Date</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} alignItems='center' direction='row'>
          <Typography sx={{ fontSize: { xs: '12px', md: '16px' }, fontWeight: 600, display: 'inline-flex', gap: '5px' }}>
            <CalendarMonthOutlined fontSize='small' />
            {format(params.row.deliveryDate, 'dd-MMM-yy')}
          </Typography>
        </Stack>
      )
    },
    {
      field: 'totalPrice', headerName: '', width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Total Price</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Typography sx={{ fontSize: { xs: '12px', md: '16px' }, fontWeight: 600 }}>
            <span style={{ fontWeight: 400 }}> </span>
            {params.row.totalPrice} kr
          </Typography>
        </Stack>
      )
    },
    {
      field: 'amount', headerName: '', width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Amount</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} justifyContent='center'>
          {
            params.row.paidAmount > 0 &&
            <Typography sx={{ fontSize: { xs: '12px', md: '16px' }, color: params.row.paidAmount > 0 ? 'green' : 'lightgray' }}>
              Paid: <b>{params.row.paidAmount}</b>
              <span style={{ fontWeight: 400, marginLeft: '5px' }}>kr </span>
            </Typography>
          }
          {
            params.row.dueAmount > 0 &&
            <Typography sx={{ fontSize: { xs: '12px', md: '16px' }, color: params.row.dueAmount > 0 ? 'coral' : 'lightgray' }}>
              Due: <b>{params.row.dueAmount}</b>
              <span style={{ fontWeight: 400, marginLeft: '5px' }}>kr </span>
            </Typography>
          }
        </Stack>
      )
    },
    {
      field: 'status', headerName: 'Status', width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Status</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Box sx={{
            display: 'inline-flex',
            padding: '4px 12px',
            bgcolor:
              row.status === 'Cancelled' ? 'red' :
                row.status === 'Placed' ? '#6251DA' :
                  row.status === 'Updated' ? '#6251DA' :
                    row.status === 'Confirmed' ? '#433878' :
                      row.status === 'Delivered' ? 'green' :
                        row.status === 'Processing' ? '#B17457' :
                          row.status === 'Payment-completed' ? '#00695c' :
                            row.status === 'Ready-to-deliver' ? '#283593' :
                              row.status === 'Payment-pending' ? '#c2185b' :
                                '#616161',
            color: '#FFF',
            borderRadius: '4px',
          }}>
            <Typography sx={{ fontWeight: 500 }} variant='body2'>{row.status}</Typography>
          </Box>
        )
      }
    },
    {
      field: 'timeUntil',
      headerName: '',
      width: isMobile ? 200 : undefined,
      flex: isMobile ? undefined : 1,
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Typography variant='body2' sx={{ fontWeight: 500, display: 'inline-flex' }}>
            <AccessTimeOutlined sx={{ mr: .5 }} fontSize='small' />
            {timeUntilNorway(params.row.deliveryDate, params.row.status)}
          </Typography>
        </Stack>
      )
    },
  ];

  const rows = orders.map(item => {
    return {
      id: item.id,
      orderDate: item.createdOn,
      totalPrice: item.finalPrice,
      status: item.status,
      deliveryDate: item.deliveryDate,
      paidAmount: item.paidAmount,
      dueAmount: item.dueAmount,
    }
  })


  return (
    <Box maxWidth='xl'>
      <Stack sx={{ mb: 2 }} direction='row' alignItems='center'>
        <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Order History</Typography>
        <Typography sx={{
          fontSize: '12px',
          fontWeight: 600,
          bgcolor: 'light.main',
          borderRadius: '4px',
          color: 'primary.main',
          px: 1
        }}>({orders?.length})</Typography>
      </Stack>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '300px',
        bgcolor: '#fff',
        width: '100%',
        border: '1px solid lightgray',
        borderRadius: '4px',
        pl: 2
      }}>
        <Input onChange={e => setOrderId(e.target.value)} type='number' fullWidth disableUnderline placeholder='Order Id' />
        <IconButton><Search /></IconButton>
      </Box>
      <Box mt={3}>
        {
          loading ? <Loader /> : orderErr ? <ErrorMsg /> :
            <DataTable
              rowHeight={70}
              columns={columns}
              rows={rows}
            />
        }
      </Box>
    </Box>
  )
}

export default Orders