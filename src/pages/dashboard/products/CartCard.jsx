/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { useTheme } from '@emotion/react';
import { Add, ArrowBack, CalendarMonthOutlined, Close, Remove, RemoveCircle } from '@mui/icons-material';
import { Box, Button, DialogActions, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { REMOVE_CART } from './graphql/mutation';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import { ADDED_CARTS, ADDED_CARTS_LIST } from './graphql/query';
import CDialog from '../../../common/dialog/CDialog';
import { ORDER_SUMMARY } from '../checkPage/graphql/query';

const CartCard = ({ data }) => {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [removeCart, { loading: removeLoading }] = useMutation(REMOVE_CART, {
    onCompleted: (res) => {
      toast.success(res.removeCart.message)
    },
    refetchQueries: [ADDED_CARTS_LIST, ADDED_CARTS, ORDER_SUMMARY],
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const handleProductRemove = () => {
    removeCart({
      variables: {
        id: data.id
      }
    })
  }

  return (
    <Box sx={{
      bgcolor: 'light.main',
      border: '1px solid lightgray',
      borderRadius: '8px'
    }}>
      <Stack sx={{ p: { xs: 1, lg: 2 } }} direction={{ xs: 'column', md: 'row' }} justifyContent='space-between'>
        <Stack direction='row' gap={2} alignItems='center'>
          <Box sx={{
            width: { xs: '64px', lg: '100px' },
            height: { xs: '64px', lg: '100px' },
            bgcolor: '#fff',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 1
          }}>
            <img style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '4px',
            }} src={data.item.attachments.edges.find(item => item.node.isCover)?.node.fileUrl ?? '/noImage.png'} alt="" />
          </Box>
          <Box>
            <Typography sx={{ fontSize: { xs: '14px', lg: '16px' }, fontWeight: 600 }}>{data?.item?.name}</Typography>
            <Typography sx={{ fontSize: '14px' }} mb={1}>Kategori: {data?.item?.category.name}</Typography>
            <Typography sx={{
              fontSize: '14px',
              fontWeight: 600,
              border: '1px solid gray',
              width: 'fit-content',
              minWidth: '120px',
              p: .5, textAlign: 'center',
              borderRadius: '50px'
            }}>Mengde: x{data?.quantity}</Typography>
          </Box>
        </Stack>
        <Stack direction={{ xs: 'row', md: 'column' }} my={{ xs: 1, md: 0 }}>
          <Typography sx={{ fontSize: { xs: '14px', lg: '16px' } }}>Pris: </Typography>
          <Typography sx={{ fontSize: { xs: '14px', lg: '16px' } }}><b>{data?.item?.priceWithTax} kr</b> </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack sx={{
        // bgcolor: '#fff',
        px: 3,
        py: .5
      }} direction='row' justifyContent='space-between' alignItems='center'>
        <IconButton onClick={() => setRemoveDialogOpen(true)} size='small' >
          <RemoveCircle />
        </IconButton>
        <Typography sx={{ fontSize: { xs: '14px', lg: '16px' } }}>Total: <b> {data?.totalPriceWithTax} kr</b></Typography>
      </Stack>
      {/* remove dialog */}
      <CDialog openDialog={removeDialogOpen} closeDialog={() => setRemoveDialogOpen(false)} >
        <Typography variant='h5'>Bekreft fjerning??</Typography>
        <DialogActions>
          <Button variant='outlined' onClick={() => setRemoveDialogOpen(false)}>Kansellere</Button>
          <CButton isLoading={removeLoading} onClick={handleProductRemove} variant='contained'>Bekrefte</CButton>
        </DialogActions>
      </CDialog>
    </Box>
  )
}

export default CartCard