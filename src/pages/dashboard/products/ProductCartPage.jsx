import { ArrowBack, ArrowDropDown, CalendarMonthOutlined } from '@mui/icons-material';
import { Box, Button, Collapse, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CartCard from './CartCard';
import OrderSummary from './OrderSummary';
import { useMutation, useQuery } from '@apollo/client';
import { ADDED_CARTS, ADDED_CARTS_LIST } from './graphql/query';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import { REMOVE_CART } from './graphql/mutation';
import toast from 'react-hot-toast';

const ProductCartPage = () => {
  const [addedCartsList, setAddedCartsList] = useState([]);
  const [cartListId, setCartListId] = useState('')

  const navigate = useNavigate()

  const { loading, error } = useQuery(ADDED_CARTS_LIST, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddedCartsList(res.addedCartsList)
    }
  });

  const handleCartList = (id) => {
    if (cartListId === id) {
      setCartListId('')
    } else {
      setCartListId(id)
    }
  }


  return (
    <Box maxWidth='lg'>
      <Stack direction='row' alignItems='center'>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Product Cart</Typography>
      </Stack>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={{ xs: 2, lg: 3 }} mt={3}>
        <Stack gap={3} sx={{
          width: { xs: '100%', lg: '70%' },
          p: { xs: 0, lg: 3 },
        }}>
          {
            loading ? <Loader /> : error ? <ErrorMsg /> :
              addedCartsList.map((data, idx) => (
                <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }} key={idx}>
                  <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' alignItems='center'>
                    <Stack sx={{ width: {xs:'100%',md:'none'} }} alignSelf={{ xs: 'flex-start', md: 'center' }} direction='row' gap={2}>
                      <CalendarMonthOutlined />
                      <Typography sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{data?.date}</Typography>
                    </Stack>
                    <Stack sx={{ width: {xs:'100%',md:'none'} }} direction='row' justifyContent='space-between' alignItems='center'>
                      <Typography sx={{ fontWeight: 600 }}> <span style={{ fontWeight: 400 }}>Total NOK: </span>{data.totalPrice}</Typography>
                      <Button onClick={() => handleCartList(idx)} endIcon={<ArrowDropDown />}>Details</Button>
                    </Stack>
                  </Stack>
                  <Collapse in={idx === cartListId}>
                    <Stack gap={2} mt={3}>
                      {
                        data?.carts.edges.map(item => (
                          <CartCard key={item.node.id} data={item.node} />
                        ))
                      }
                    </Stack>
                  </Collapse>
                </Paper>
              ))
          }
        </Stack>
        <OrderSummary />
      </Stack>
    </Box>
  )
}

export default ProductCartPage