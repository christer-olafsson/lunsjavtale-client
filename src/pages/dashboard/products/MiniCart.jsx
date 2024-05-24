import { Box, Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import { ADDED_CARTS, ADDED_PRODUCTS } from './graphql/query'
import { useMutation, useQuery } from '@apollo/client'
import { Close } from '@mui/icons-material'
import { REMOVE_PRODUCT_CART } from './graphql/mutation'
import toast from 'react-hot-toast'
import CButton from '../../../common/CButton/CButton'

const MiniCart = ({refetch}) => {
  const [addedProducts, setAddedProducts] = useState([]);
  const [removeProductId, setRemoveProductId] = useState('');

  useQuery(ADDED_PRODUCTS, {
    fetchPolicy:'no-cache',
    notifyOnNetworkStatusChange:true,
    onCompleted: (res) => {
      setAddedProducts(res.addedProducts.edges.map(item => item.node))
    }
  });

  const [removeProductCart, { loading }] = useMutation(REMOVE_PRODUCT_CART, {
    onCompleted: (res) => {
      refetch()
      setRemoveProductId(null)
      toast.success(res.removeProductCart.message)
    },
    refetchQueries: [ADDED_PRODUCTS],
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const handleProductRemoveDialog = (id) => {
    setRemoveProductId(id)
  }

  const handleRemoveProduct = () => {
    removeProductCart({
      variables: {
        id: removeProductId
      }
    })
  }

  const theme = useTheme()
  return (
    <Box sx={{
      display: 'flex',
      position: 'sticky',
      maxHeight: '80vh',
      overflowY: 'auto',
      top: 100,
      flexDirection: 'column',
      border: `1px solid ${theme.palette.primary.main}`,
      p: '15px 15px 55px',
      borderRadius: '8px',
      bgcolor: 'light.main',
    }} mt={5}>

      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={1}>
        <Typography sx={{ fontSize: '17px', fontWeight: '600' }}>Shopping Cart</Typography>
        <Link to='/dashboard/products/cart'>
          <Button variant='contained'>
            Place Order
          </Button>
        </Link>
      </Stack>

      <Stack gap={1}>
        {
          addedProducts.map(data => (
            <Stack key={data.id} sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              p: 1, borderRadius: '8px',
              position: 'relative'
            }} direction='row' mt={1} alignItems='center'>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }} src={data.attachments.edges.find(item => item.node.isCover).node.fileUrl || '/noImage.png'} alt="" />
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{data.name}</Typography>
                  <Typography sx={{ fontSize: '13px' }}> <b> <i>Category:</i>  </b> {data.category.name}</Typography>
                </Box>
                <IconButton onClick={() => handleProductRemoveDialog(data.id)} sx={{
                  position: 'absolute',
                  top: 5, right: 5,
                  p: 1, bgcolor: '#fff',
                  width: '20px',
                  height: '20px',
                  ":hover": {
                    bgcolor: '#fff'
                  }
                }}>
                  <Close fontSize='small' />
                </IconButton>
                {
                  removeProductId === data.id &&
                  <Paper elevation={3} sx={{
                    position: 'absolute',
                    top: 30,
                    right: 20,
                    p: 1,
                    zIndex: 10
                  }}>
                    <Typography variant='body2'>Confirm Remove?</Typography>
                    <Stack direction='row' gap={2} mt={1}>
                      <Button onClick={() => setRemoveProductId(null)} style={{ fontSize: '12px', height: '25px' }} variant='outlined' size='small'>Cencel</Button>
                      <CButton isLoading={loading} onClick={handleRemoveProduct} style={{ fontSize: '12px', height: '25px' }} variant='contained' size='small' color='warning'>Confirm</CButton>
                    </Stack>
                  </Paper>
                }
              </Box>
            </Stack>
          ))
        }
      </Stack>

      {/* <Box sx={{
        alignSelf: 'center',
        border: `1px solid ${theme.palette.primary.main}`,
        p: '12px 24px',
        borderRadius: '50px',
        position: 'absolute',
        bottom: '-25px',
        bgcolor: 'light.main'
      }}>
        <Typography>Total : NOK 456</Typography>
      </Box> */}
    </Box>
  )
}

export default MiniCart