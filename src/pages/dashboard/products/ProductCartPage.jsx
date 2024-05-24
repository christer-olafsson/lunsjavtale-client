import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CartCard from './CartCard';
import OrderSummary from './OrderSummary';
import { useMutation, useQuery } from '@apollo/client';
import { ADDED_CARTS } from './graphql/query';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import { REMOVE_CART } from './graphql/mutation';
import toast from 'react-hot-toast';

const ProductCartPage = () => {
  const [addedCarts, setAddedCarts] = useState([])

  const navigate = useNavigate()

  const { loading, error } = useQuery(ADDED_CARTS, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddedCarts(res.addedCarts.edges.map(item => item.node))
    }
  });


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
              addedCarts.map(data => (
                <CartCard data={data} key={data.id} />
              ))
          }
        </Stack>
        <OrderSummary />
      </Stack>
    </Box>
  )
}

export default ProductCartPage