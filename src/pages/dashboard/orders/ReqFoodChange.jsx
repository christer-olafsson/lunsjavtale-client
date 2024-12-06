/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client'
import { Close } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { USER_CART_UPDATE } from './graphql/mutation'
import toast from 'react-hot-toast'
import { ORDER } from './graphql/query'
import { PRODUCTS } from '../../../graphql/query'
import CButton from '../../../common/CButton/CButton'

const ReqFoodChange = ({ orderCarts, closeDialog }) => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState({})


  const { loading: loadinProducts, error: errProducts } = useQuery(PRODUCTS, {
    onCompleted: (res) => {
      const data = res.products.edges.filter(item =>
        !item.node.vendor?.isDeleted &&
        item.node.category.id === orderCarts.item.category.id &&
        item.node.id !== orderCarts.item.id
      ).map(item => item.node)
      setProducts(data)
    },
  });

  const [userCartUpdate, { loading: userCartUpdateLoading }] = useMutation(USER_CART_UPDATE, {
    onCompleted: (res) => {
      toast.success(res.userCartUpdate.message);
      closeDialog();
    },
    refetchQueries: [ORDER],
    onError: (err) => {
      toast.error(err.message);
    }
  });

  function handleReqSend() {
    if (!selectedProduct.id) {
      toast.error('Ingen produkt valgt')
      return
    }
    userCartUpdate({
      variables: {
        id: orderCarts.id, //cart id
        item: selectedProduct.id //product id
      }
    })
  }

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' mb={1}>
        <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
          Forespørsel om endring
        </Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>

      <Stack mb={4} direction={{ xs: 'row', md: 'row' }} gap={2} alignItems='center'>
        <img style={{
          width: '100px',
          height: '100px',
          objectFit: 'cover',
          borderRadius: '4px',
        }} src={orderCarts?.item.attachments?.edges.find(item => item.node.isCover)?.node.fileUrl ?? "/noImage.png"} alt="" />
        <Box>
          <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{orderCarts?.item.name}</Typography>
          <Typography variant='body2'>Kategori: <b>{orderCarts?.item.category.name}</b></Typography>
          <Typography>Pris: <b>{orderCarts?.item.priceWithTax}</b> kr</Typography>
        </Box>
      </Stack>

      <Stack sx={{
        border: '1px solid lightgray',
        p: 2, borderRadius: '8px'
      }}>

        {/* all products */}
        <Autocomplete
          sx={{ minWidth: '250px', maxWidth: '100%', mb: 4 }}
          size='small'
          loading={loadinProducts}
          options={products}
          onChange={(_, value) => setSelectedProduct(value)}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Stack mb={1} direction='row' alignItems='center' gap={1}>
                <Avatar sx={{ borderRadius: '8px', width: '70px', height: '70px' }} src={option?.attachments?.edges?.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'} />
                <Box>
                  <Typography>{option.name}</Typography>
                  <Typography sx={{ fontSize: '12px' }}>{option?.category.name}</Typography>
                  <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>{option?.priceWithTax} kr</Typography>
                </Box>
              </Stack>
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Velg produkt" />
          )}
        />
        <Divider sx={{ mb: 2 }} />
        <Stack direction='row' alignItems='center' gap={1}>
          <Avatar sx={{ borderRadius: '8px', width: '70px', height: '70px' }} src={selectedProduct?.attachments?.edges?.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'} />
          <Box>
            <Typography>{selectedProduct?.name ?? 'Ingen produkt valgt'}</Typography>
            <Typography sx={{ fontSize: '12px' }}>{selectedProduct?.category?.name}</Typography>
          </Box>
        </Stack>
      </Stack>

      <CButton isLoading={userCartUpdateLoading} onClick={handleReqSend} style={{ width: '100%', mt: 2 }} variant='contained'>Be om endring</CButton>

    </Box>
  )
}

export default ReqFoodChange