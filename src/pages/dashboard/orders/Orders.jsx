import { AccessTime, ArrowRight, BorderColor, CalendarMonthOutlined, Search, TrendingFlat } from '@mui/icons-material'
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
import { enUS } from 'date-fns/locale';

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
      field: 'orderDate', width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Ordered On</Typography>
      ),
      renderCell: (params) => {
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>{format(params.row.orderDate, 'yyyy-MMMM-dd')}</Typography>
            <Typography sx={{ fontSize: { xs: '12px', md: '14px' }, fontWeight: 500, display: 'inline-flex' }}><AccessTime fontSize='small' />{format(params.row.orderDate, 'HH:mm a', { locale: enUS })}</Typography>
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
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Typography sx={{ fontSize: { xs: '12px', md: '16px' }, fontWeight: 600, display: 'inline-flex', gap: '5px' }}>
            <CalendarMonthOutlined fontSize='small' />
            {format(params.row.deliveryDate, 'yyyy-MMMM-dd')}
          </Typography>
        </Stack>
      )
    },

    // {
    //   field: 'orderDetails', width: 250,
    //   renderHeader: () => (
    //     <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Order Details</Typography>
    //   ),
    //   renderCell: (params) => {
    //     const { row } = params;
    //     return (
    //       <Stack direction='row' gap={2}>
    //         <img style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', padding: '5px' }} src={row.fileUrl ?? ''} alt="" />
    //         <Box>
    //           <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: 600 }}>{row.name}</Typography>
    //           <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}>kr {row.priceWithTax} <b>x{row.quantity}</b> </Typography>
    //         </Box>
    //       </Stack>
    //     )
    //   }
    // },
    // { field: 'paymentInfo', headerName: 'Payment Info', width: 150 },
    {
      field: 'totalPrice', headerName: '', width: 200,
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

    // {
    //   field: 'action', headerName: 'Action', width: 150,
    //   renderHeader: () => (
    //     <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Action</Typography>
    //   ),
    //   renderCell: (params) => {
    //     return (
    //       <IconButton sx={{
    //         bgcolor: 'light.main',
    //         borderRadius: '5px',
    //         width: { xs: '30px', md: '40px' },
    //         height: { xs: '30px', md: '40px' },
    //       }} onClick={() => handleEdit(params.row)}>
    //         <BorderColor fontSize='small' />
    //       </IconButton>
    //     )
    //   },
    // },
  ];

  const rows = orders.map(item => {
    const orderCart = item.orderCarts.edges[0]?.node
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