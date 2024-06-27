import { Box, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import MiniCart from './MiniCart';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORY, PRODUCTS } from '../../../graphql/query';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import SmallProductCard from './SmallProductCard';

const Products = () => {
  const [allCategorys, setAllCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [products, setProducts] = useState([])


  const { error: categoryErr } = useQuery(GET_ALL_CATEGORY, {
    onCompleted: (data) => {
      const res = data?.categories?.edges.filter((item) => item.node.isActive)
      setAllCategorys(res)
    },
  });

  const { loading: loadinProducts, error: errProducts } = useQuery(PRODUCTS, {
    variables: {
      category: categoryId
    },
    onCompleted: (res) => {
      const data = res.products.edges.filter(item => !item.node.vendor?.isDeleted).map(item => item.node)
      setProducts(data)
    },
  });

  return (
    <Stack maxWidth='xxl' mb={5} direction={{ xs: 'column-reverse', lg: 'row' }} gap={3}>
      <Paper sx={{
        width: { xs: '100%', lg: '70%' },
        position: 'relative',
        boxShadow: {
          xs: 'none',
          lg: 2,
        }
      }}>
        <Stack direction='row' sx={{
          mb: 3,
          justifyContent: 'center',
        }}>
          <Stack sx={{
            bgcolor: 'light.main',
            width: '100%',
            p: 3
          }} direction='row' gap={{ xs: 1, md: 2 }} flexWrap='wrap'>
            <Box sx={{
              border: '1px solid lightgray',
              borderRadius: '4px',
              bgcolor: categoryId === null ? 'primary.main' : '#fff',
              color: categoryId === null ? '#fff' : 'inherit',
              cursor: 'pointer',
              userSelect: 'none'
            }} onClick={() => setCategoryId(null)}>
              <Typography sx={{
                fontSize: { xs: '13px', md: '16px' },
                py: { xs: 1, md: 1.5 },
                px: { xs: 1, md: 2 },
                textAlign: 'center'
              }}>All {categoryId === null && <i style={{ fontSize: '14px' }}>({products.length})</i>}</Typography>
            </Box>
            {
              // loadingCategory ? <LoadingBar/> : 
              categoryErr ? <ErrorMsg /> :
                allCategorys?.map((item) => (
                  <Box sx={{
                    border: '1px solid lightgray',
                    borderRadius: '4px',
                    bgcolor: categoryId === item.node.id ? 'primary.main' : '#fff',
                    color: categoryId === item.node.id ? '#fff' : 'inherit',
                    cursor: 'pointer',
                    userSelect: 'none',
                    opacity: !item.node.isActive ? '.4' : '1'
                  }} onClick={() => setCategoryId(item.node.id)} key={item?.node.id}>
                    <Typography sx={{
                      fontSize: { xs: '13px', md: '16px' },
                      py: { xs: 1, md: 1.5 },
                      px: { xs: 1, md: 2 },
                      textAlign: 'center'
                    }}>
                      {item?.node.name}
                      {categoryId === item.node.id &&
                        <i style={{ fontSize: '14px' }}>({products.length})</i>
                      }
                    </Typography>
                  </Box>
                ))
            }
          </Stack>
        </Stack>
        <Stack direction='row' flexWrap='wrap' gap={2} px={{ xs: 0, lg: 3 }}>
          {
            loadinProducts ? <Loader /> : errProducts ? <ErrorMsg /> :
              products.length === 0 ?
                <Typography sx={{ p: 5 }}>No Product Found!</Typography> :
                products?.map(item => (
                  <SmallProductCard data={item} key={item.id} />
                ))
          }
        </Stack>
      </Paper >

      <Box sx={{
        flex: 1
      }}>
        <MiniCart />
      </Box>
    </Stack >
  )
}

export default Products