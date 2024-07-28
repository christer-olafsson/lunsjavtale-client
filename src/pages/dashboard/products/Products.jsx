import { Autocomplete, Avatar, Box, IconButton, Pagination, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MiniCart from './MiniCart';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORY, PRODUCTS } from '../../../graphql/query';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import SmallProductCard from './SmallProductCard';
import { VENDORS } from './graphql/query';
import { Link } from 'react-router-dom';
import { ChevronRight } from '@mui/icons-material';

const Products = () => {
  const [allCategorys, setAllCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1);
  const [productsLength, setProductsLength] = useState([])
  const [vendors, setVendors] = useState([])
  const [selectedVendor, setSelectedVendor] = useState([])


  const { loading: vendorLoading } = useQuery(VENDORS, {
    variables: {
      hasProduct: true
    },
    onCompleted: (res) => {
      const data = res.vendors.edges.filter(item => !item.node.isDeleted).map(item => item.node)
      setVendors(data)
    }
  })


  useQuery(PRODUCTS, {
    variables: {
      vendor: selectedVendor ? selectedVendor.id : null,
      // isVendorProduct: vendorProductShow ? vendorProductShow : null
    },
    onCompleted: (res) => {
      const data = res.products.edges.filter(item => !item.node.vendor?.isDeleted).map(item => item.node)
      setProductsLength(data.length)
    },
  });



  const { error: categoryErr } = useQuery(GET_ALL_CATEGORY, {
    variables: {
      vendor: selectedVendor ? selectedVendor.id : null,
      // isVendorProduct: vendorProductShow ? vendorProductShow : null
    },
    onCompleted: (data) => {
      const res = data?.categories?.edges.filter((item) => item.node.isActive)
      setAllCategorys(res)
    },
  });

  const { loading: loadinProducts, error: errProducts } = useQuery(PRODUCTS, {
    variables: {
      category: categoryId,
      offset: (page - 1) * 10,
      first: 10,
      vendor: selectedVendor ? selectedVendor.id : null,
    },
    onCompleted: (res) => {
      const data = res.products.edges.filter(item => !item.node.vendor?.isDeleted).map(item => item.node)
      setProducts(data)
    },
  });

  useEffect(() => {
    setPage(1)
  }, [categoryId,selectedVendor])

  return (
    <Stack maxWidth='xl' mb={5} direction={{ xs: 'column-reverse', lg: 'row' }} gap={3}>
      <Paper sx={{
        width: { xs: '100%', lg: '70%' },
        position: 'relative',
        boxShadow: {
          xs: 'none',
          lg: 2,
        }
      }}>
        <Box sx={{
          bgcolor: 'light.main',
        }}>
          <Stack direction='row' justifyContent='space-between'>
            <Box />
            {/* all vendors */}
            <Autocomplete
              sx={{ minWidth: '250px', maxWidth: '300px', mt: 2, mr: 2 }}
              size='small'
              loading={vendorLoading}
              options={vendors}
              onChange={(_, value) => setSelectedVendor(value)}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Stack direction='row' alignItems='center' gap={1}>
                    <Avatar src={option.logoUrl ?? ''} />
                    <Box>
                      <Typography>{option.name}</Typography>
                      <Typography sx={{ fontSize: '12px' }}>{option.email}</Typography>
                    </Box>
                  </Stack>
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Select Supplier" />
              )}
            />
          </Stack>
          <Stack direction='row' sx={{
            mb: 3,
            justifyContent: 'center',
          }}>
            <Stack sx={{
              width: '100%',
              p: 3
            }} direction='row' gap={{ xs: 1, md: 2 }} flexWrap='wrap'>
              <Box sx={{
                border: '1px solid lightgray',
                borderRadius: '8px',
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
                }}>All {<i style={{ fontSize: '14px',fontWeight: 600, marginLeft: '5px' }}>({productsLength})</i>}</Typography>
              </Box>
              {
                  allCategorys?.map((item) => (
                    <Box sx={{
                      border: '1px solid lightgray',
                      borderRadius: '8px',
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
                        <i style={{ fontSize: '14px', fontWeight: 600, marginLeft: '5px' }}>({item?.node?.products?.edges.length})</i>
                      </Typography>
                    </Box>
                  ))
              }
            </Stack>
          </Stack>
        </Box>

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
        <Stack width='100%' direction='row' justifyContent='space-between' my={2}>
          <Box />
          <Pagination count={Math.ceil(categoryId !== null ? products.length / 12 : productsLength / 12)} page={page} onChange={(e, value) => setPage(value)} />
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