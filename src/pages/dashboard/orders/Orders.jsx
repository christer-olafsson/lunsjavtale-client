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
import { ME } from '../../../graphql/query';
import { enUS, nb } from 'date-fns/locale';
import moment from 'moment-timezone';

const Orders = () => {
  const [orders, setOrders] = useState([])

  const navigate = useNavigate()

  const { data: user } = useQuery(ME)


  const { loading, error: orderErr } = useQuery(ORDERS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    // variables: {
    //   addedFor: '141'
    // },
    onCompleted: (res) => {
      setOrders(res.orders.edges.map(item => item.node));
    }
  });


  function handleEdit(row) {
    navigate(`/dashboard/orders/edit/${row.id}`)
  }


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
      return 'Date passed!';
    }

    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Delivered Today';
    } else {
      return `Delivered in ${diffInDays} days`;
    }
  }





  const columns = [
    // {
    //   field: 'details', headerName: '', width: 70,
    //   renderCell: (params) => (
    //     <Link to={`/dashboard/orders/details/${params.row.id}`}>
    //       <IconButton>
    //         <ArrowRight />
    //       </IconButton>
    //     </Link>
    //   ),
    // },
    {
      field: 'id', headerName: '', width: 70,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>ID</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Link to={`/dashboard/orders/details/${params.row.id}`}>
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>{params.row.id}</Typography>
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
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>{format(params.row.orderDate, 'dd-MMMM-yyyy')}</Typography>
            <Typography sx={{ fontSize: { xs: '12px', md: '14px' }, fontWeight: 500, display: 'inline-flex' }}>
              <AccessTime fontSize='small' />
              {format(params.row.orderDate, 'HH:mm', { locale: nb })}
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
            {format(params.row.deliveryDate, 'dd-MMMM-yyyy')}
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
            <span style={{ fontWeight: 400 }}>kr </span>
            {params.row.totalPrice}
          </Typography>
        </Stack>
      )
    },
    {
      field: 'status', headerName: 'Status', width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Status</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Box sx={{
            display: 'inline-flex',
            padding: '3px 12px',
            bgcolor: row.status === 'Cancelled'
              ? 'red'
              : row.status === 'Confirmed'
                ? 'lightgreen'
                : row.status === 'Delivered'
                  ? 'green'
                  : 'yellow',
            color: row.status === 'Placed'
              ? 'dark' : row.status === 'Payment-pending'
                ? 'dark' : row.status === 'Confirmed' ? 'dark' : '#fff',
            borderRadius: '4px',
          }}>
            <Typography sx={{ fontWeight: 500 }} variant='body2'>{row.status}</Typography>
          </Box>
        )
      }
    },
    {
      field: 'timeUntil', headerName: '', width: 200,
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
      // name: orderCart.item.name,
      // quantity: orderCart.quantity,
      // priceWithTax: orderCart.priceWithTax,
      totalPrice: item.finalPrice,
      status: item.status,
      deliveryDate: item.deliveryDate,
      // fileUrl: orderCart.item.attachments.edges.find(item => item.node.isCover)?.node.fileUrl,
    }
  })

  console.log(rows)
  return (
    <Box maxWidth='xl'>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} justifyContent='space-between'>
        <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Order History</Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '480px',
          bgcolor: '#fff',
          width: '100%',
          border: '1px solid lightgray',
          borderRadius: '4px',
          pl: 2
        }}>
          <Input fullWidth disableUnderline placeholder='Search Order Id' />
          <IconButton><Search /></IconButton>
        </Box>
      </Stack>
      <Box mt={3}>
        {
          loading ? <Loader /> : orderErr ? <ErrorMsg /> :
            <DataTable
              rowHeight={60}
              columns={columns}
              rows={rows}
            />
        }
      </Box>
    </Box>
  )
}

export default Orders