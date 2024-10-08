import { Box, Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { Close } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { ME } from '../../../graphql/query'
import { ADDED_PRODUCTS } from '../products/graphql/query'
import { REMOVE_PRODUCT_CART, SEND_CART_REQUEST } from '../products/graphql/mutation'
import CButton from '../../../common/CButton/CButton'

const Cart = () => {
  const [addedProducts, setAddedProducts] = useState([]);
  const [removeProductId, setRemoveProductId] = useState('');


  const { data: user } = useQuery(ME)

  useQuery(ADDED_PRODUCTS, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddedProducts(res.addedProducts.edges.map(item => item.node))
    }
  });

  const [removeProductCart, { loading }] = useMutation(REMOVE_PRODUCT_CART, {
    onCompleted: (res) => {
      setRemoveProductId(null)
      toast.success(res.removeProductCart.message)
    },
    refetchQueries: [ADDED_PRODUCTS],
    onError: (err) => {
      toast.error(err.message)
    }
  });

  // for employee request order
  const [sendCartReqest, { loading: sendCartReqLoading }] = useMutation(SEND_CART_REQUEST, {
    onCompleted: (res) => {
      toast.success(res.sendCartRequest.message)
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

  const handleRequestOrder = () => {
    sendCartReqest()
  }


  const theme = useTheme()
  return (
    <>
      <Box>
        {/* pending */}
      </Box>
      <Box className='custom-scrollbar' sx={{
        display: 'flex',
        position: 'sticky',
        maxHeight: '80vh',
        maxWidth: '500px',
        overflowY: 'auto',
        top: 100,
        flexDirection: 'column',
        border: `1px solid ${theme.palette.primary.main}`,
        p: '15px',
        borderRadius: '8px',
        bgcolor: 'light.main',
      }}>
        {
          addedProducts.length ?
            <>
              <Stack direction='row' justifyContent='space-between' alignItems='center' mb={1}>
                <Typography sx={{ fontSize: '17px', fontWeight: '600' }}>Order Cart</Typography>
                {
                  user?.me.role === 'company-employee' ?
                    <CButton isLoading={sendCartReqLoading} disable={user?.me.company.isBlocked} onClick={handleRequestOrder} variant='contained'>Request Order</CButton> :
                    <Link to='/dashboard/products/cart'>
                      <Button disabled={user?.me.company.isBlocked} variant='contained'>
                        Place Order
                      </Button>
                    </Link>
                }
              </Stack>

              <Stack gap={1}>
                {
                  addedProducts.map(data => (
                    <Stack key={data.id} sx={{
                      border: `1px solid ${theme.palette.primary.main}`,
                      p: 1, borderRadius: '8px',
                      position: 'relative',
                      bgcolor: '#fff'
                    }} direction='row' mt={1} alignItems='center'>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img style={{
                          width: '70px',
                          height: '70px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }} src={data.attachments.edges.find(item => item.node?.isCover)?.node?.fileUrl || '/noImage.png'} alt="" />
                        <Box>
                          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{data.name}</Typography>
                          <Typography sx={{ fontSize: '12px' }}> <b> Category: </b> {data.category.name}</Typography>
                          <Typography sx={{ fontSize: '12px' }}> <b> Price: </b> {data.priceWithTax
                          }</Typography>
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
            </> :
            <Box sx={{
              p: 2, borderRadius: '8px',
              bgcolor: 'primary.main',
              color: '#fff',
            }}>
              <Typography sx={{ fontSize: '17px', fontWeight: '600' }}>Shopping Cart</Typography>
              <Typography sx={{ fontSize: '14px' }}>Choose some of the delicious dishes from the list.</Typography>
            </Box>
        }

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
    </>
  )
}

export default Cart