import { BorderColor, Search } from '@mui/icons-material';
import { Box, IconButton, Input, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/dashboard/DataTable';
import { useNavigate } from 'react-router-dom';


const row = [
  { id: '324234', employerId: '34234234', img: '/insImg5.png', orderItem: 'The lunch collective"s Caesar salad', category: 'Lunch Box', details: 'Gluten (oats, wheat, rye, spelt, barley), Peanuts, Milks, Fishes, Shellfish, Egg', price: '200.00', deliveryDate: 'Feb 10,2022', paymentInfo: '2332' },
  { id: '324234', employerId: '34234234', img: '/insImg5.png', orderItem: 'The lunch collective"s Caesar salad', category: 'Lunch Box', details: 'Gluten (oats, wheat, rye, spelt, barley), Peanuts, Milks, Fishes, Shellfish, Egg', price: '200.00', deliveryDate: 'Feb 10,2022', paymentInfo: '2332' },
  { id: '324234', employerId: '34234234', img: '/insImg5.png', orderItem: 'The lunch collective"s Caesar salad', category: 'Lunch Box', details: 'Gluten (oats, wheat, rye, spelt, barley), Peanuts, Milks, Fishes, Shellfish, Egg', price: '200.00', deliveryDate: 'Feb 10,2022', paymentInfo: '2332' },
]

const OrderDetails = () => {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const navigate = useNavigate()

  function handleEdit(row) {
    navigate(`/dashboard/orders/details/single/${row.id}`)
  }
  const columns = [
    {
      field: 'id', headerName: 'Order ID', flex: .2, renderCell: (params) => {
        return (
          <Box sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Typography sx={{ fontWeight: 600 }}>#{params.row.id}</Typography>
          </Box>
        )
      }
    },
    {
      field: 'employerId', flex: isMobile ? .6 : .3, 
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px',fontWeight:600, lg: '15px' } }}>EmployeID</Typography>
      ),
      renderCell: (params) => {
        return (
          <Box sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Typography sx={{ fontSize:{xs:'13px',lg:'16px'} }}>#{params.row.employerId}</Typography>
          </Box>
        )
      }
    },
    {
      field: 'orderItem', flex: 1, headerName:'Order Item',
      renderCell: (params) => {
        const { row } = params;
        return (
          <Stack direction='row' gap={1} p={1} alignItems='center'>
            {
              !isMobile && <img style={{width:'70px',height:'70px',borderRadius:'4px',objectFit:'cover'}} src={row.img} alt="" />
            }
            <Stack>
              <Typography sx={{ fontSize: {xs:'12px',lg:'15px'}, fontWeight: 600 }}>{row.orderItem}</Typography>
              <Typography sx={{ fontSize: {xs:'12px',lg:'14px'} }}>{row.category}</Typography>
              <Typography sx={{ fontSize: '12px' }}>x{row.details}</Typography>
            </Stack>
          </Stack>
        )
      }
    },
    {
      field: 'price', headerName: 'Price', flex: .5, renderCell: (params) => {
        return (
          <Box sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Typography sx={{ fontSize:{xs:'13px',lg:'16px'} }}>${params.row.price}</Typography>
          </Box>
        )
      }
    },
    { field: 'deliveryDate', headerName: 'Delivery Date', flex: .3 },
    {
      field: 'paymentInfo', headerName: 'Payment Info', flex: .3, renderCell: (params) => {
        return (
          <Box sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Typography>*******{params.row.paymentInfo}</Typography>
          </Box>
        )
      }
    },
    {
      field: 'action', headerName: 'Action', flex: .3, renderCell: (params) => {
        return (
          <IconButton sx={{
            bgcolor: 'light.main',
            borderRadius: '5px',
            width: '40px',
            height: '40px',
          }} onClick={() => handleEdit(params.row)}>
            <BorderColor fontSize='small' />
          </IconButton>
        )
      },
    },
  ];

  useEffect(() => {
    setColumnVisibilityModel({
      id: isMobile ? false : true,
      deliveryDate: isMobile ? false : true,
      paymentInfo: isMobile ? false : true,
    })
  }, [isMobile])
  return (
    <Box>
      <Stack direction={{xs:'column',md:'row'}} gap={2} justifyContent='space-between'>
        <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Order Details</Typography>
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
        <DataTable columns={columns} rows={row} columnVisibilityModel={columnVisibilityModel} getRowHeight={(params) => 90} />
      </Box>
    </Box>
  )
}

export default OrderDetails