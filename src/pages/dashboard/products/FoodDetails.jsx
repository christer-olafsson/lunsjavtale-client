import { useQuery } from '@apollo/client'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Avatar, Box, IconButton, Rating, Stack, Tab, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_SINGLE_PRODUCTS } from './graphql/query'
import { useTheme } from '@emotion/react'
import Loader from '../../../common/loader/Index'
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg'
import { West } from '@mui/icons-material'

const FoodDetails = () => {
  const [product, setProduct] = useState({});
  const [selectedImg, setSelectedImg] = useState(0)

  const { id } = useParams();
  const theme = useTheme()

  const navigate = useNavigate()

  const { loading, error } = useQuery(GET_SINGLE_PRODUCTS, {
    variables: {
      id: id
    },
    onCompleted: (res) => {
      setProduct(res.products.edges[0].node)
    }
  })

  return (
    <Box sx={{ minHeight: '1000px' }}>
      {
        loading ? <Loader /> : error ? <ErrorMsg /> :
          <>

            <Stack direction='row' alignItems='center' gap={2} mb={3}>
              <IconButton onClick={() => navigate(-1)}>
                <West />
              </IconButton>
              <Typography variant='h5'>Food Details</Typography>
            </Stack>
            <Stack direction={{ xs: 'column', lg: 'row' }} gap={3}>
              <Stack direction={{xs:'column-reverse',md:'row'}} gap={2}>
                <Stack direction={{xs:'row', md:'column'}} sx={{
                  maxHeight: '600px',
                }} flexWrap='wrap' gap={2}>
                  {
                    product?.attachments?.edges.map((item, id) => (
                      <Box onClick={() => setSelectedImg(id)} key={id} sx={{
                        width: '100px',
                        height: '100px',
                        cursor: 'pointer',
                        border: selectedImg === id ? `2px solid ${theme.palette.primary.main}` : 'none',
                        borderRadius: '8px',
                        p: selectedImg === id ? .3 : 0
                      }}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                          src={item.node.fileUrl ? item.node.fileUrl : ''} alt="" />
                      </Box>
                    ))
                  }
                </Stack>
                {
                  product?.attachments?.edges.map((item, id) => (
                    <Box key={id} sx={{
                      // flex:1,
                      width: { xs: '100%', lg: '457px' },
                      height: {xs:'400px',md:'560px'},
                      display: selectedImg === id ? 'block' : 'none '
                    }}>
                      <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                        src={item.node.fileUrl ? item.node.fileUrl : ''} alt="" />
                    </Box>
                  ))
                }
              </Stack>
              <Stack gap={1.5}>
                <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>{product.name}</Typography>
                {/* <Stack direction='row' gap={1} alignItems='center'>
                  <Rating size='small' sx={{ color: 'primary.main' }} value={5} readOnly />
                  <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>3 Reviews</Typography>
                </Stack> */}
                <Typography sx={{ fontSize: { xs: '18px', lg: '24px', fontWeight: 600 } }}>
                  <i style={{ fontWeight: 400 }}>kr </i>
                  {product.priceWithTax}<i style={{ fontWeight: 400, fontSize: '16px' }}> (Incl. Tax)</i>
                </Typography>

                {/* <Stack direction='row' gap={2} mt={2}>
                  <LocalOffer fontSize='small' />
                  <Typography sx={{ fontSize: '14px' }}>Save 50% right now</Typography>
                </Stack> */}
                <Box>
                  <Typography sx={{ fontSize: { xs: '14px', lg: '16px' }, fontWeight: 600 }}> <i>Description:</i> </Typography>
                  <Typography sx={{ fontSize: { xs: '14px', lg: '16px' } }}>{product?.description}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: { xs: '14px', lg: '16px' }, fontWeight: 600 }}> <i>Contains:</i> </Typography>
                  <Typography sx={{ fontSize: { xs: '14px', lg: '16px' } }}>{product.contains && typeof product.contains === 'string' ? JSON.parse(product.contains) : ''}</Typography>
                </Box>
                {
                  product?.ingredients?.edges.length > 0 &&
                  <Box>
                    <Typography sx={{ fontSize: { xs: '14px', lg: '16px' }, fontWeight: 600 }}> <i>Allergies: </i> </Typography>
                    <ul>
                      {
                        product?.ingredients?.edges.map(item => (
                          <li style={{ fontSize: '14px' }} key={item.node.id}>{item.node.name}</li>
                        ))
                      }
                    </ul>
                  </Box>
                }
              </Stack>
            </Stack>
            {/* <Box sx={{ width: '100%', mt: 10 }}>
              <Typography variant='h5' mb={3}>Reviews</Typography>
              <Stack gap={5}>
                {
                  [1, 2, 3].map((item, id) => (
                    <Stack key={id} direction='row' gap={2}>
                      <Avatar />
                      <Stack gap={2}>
                        <Rating size='small' sx={{ color: 'primary.main' }} value={5} readOnly />
                        <Typography>You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.</Typography>
                        <Box>
                          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Jenny Wilson</Typography>
                          <Typography sx={{ fontSize: '12px', }}>March 14, 2021</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  ))
                }
              </Stack>
            </Box> */}
          </>
      }
    </Box>
  )
}

export default FoodDetails