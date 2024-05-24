import { Box, Paper, Stack, Tab, Tabs, Typography, styled, tabClasses, tabsClasses } from '@mui/material'
import React, { useState } from 'react'
import MiniCart from './MiniCart';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORY, PRODUCTS } from '../../../graphql/query';
import Loader from '../../../common/loader/Index';
import DateAndInfoSec from '../../../components/dashboard/DateAndInfoSec';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import SmallProductCard from './SmallProductCard';
import { ADDED_PRODUCTS } from './graphql/query';

const TabItem = styled(Tab)(({ theme }) => ({
  position: "relative",
  borderRadius: "4px",
  textAlign: "center",
  textTransform: 'none',
  transition: "all .5s",
  padding: "5px 10px",
  color: "#555555",
  height: "auto",
  marginRight: '10px',
  float: "none",
  fontSize: "14px",
  fontWeight: "500",
  [theme.breakpoints.up("md")]: {
    minWidth: 120,
  },
  [`&.${tabClasses.selected}`]: {
    backgroundColor: '#fff',
    border: '1px solid gray'
    // boxShadow: "0 7px 10px -5px rgba(76, 175, 80, 0.4)",
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

const tabName = [
  'All', 'Brekfast', 'Lunch', 'Dinner', 'Option'
]

const Products = () => {
  const [allCategorys, setAllCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [products, setProducts] = useState([])
  const [addedProducts, setAddedProducts] = useState([]);


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
      setProducts(res.products.edges.map(item => item.node))
    },
  });

  const { data: addedProductsData,refetch } = useQuery(ADDED_PRODUCTS, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddedProducts(res.addedProducts.edges.map(item => item.node))
    }
  });

 
  return (
    <Stack maxWidth='xxl' mb={5} direction={{ xs: 'column-reverse', lg: 'row' }} gap={3}>
      <Paper sx={{
        width: { xs: '100%', lg: '70%' },
        boxShadow: {
          xs: 'none', 
          lg: 2,    
        }
      }}>
        <Typography sx={{ fontSize: '18px', fontWeight: 600, m: 2 }}>Product Details</Typography>
        <Stack direction='row' sx={{
          mb: 3,
          justifyContent: 'center',
        }}>
          <Stack sx={{
            bgcolor: 'light.main',
            width: '100%',
            p: 3
          }} direction='row' gap={2} flexWrap='wrap' my={4}>
            <Box sx={{
              border: '1px solid lightgray',
              py: 1.5, px: 2,
              borderRadius: '4px',
              bgcolor: categoryId === null ? 'primary.main' : '#fff',
              color: categoryId === null ? '#fff' : 'inherit',
              cursor: 'pointer',
              userSelect: 'none'
            }} onClick={() => setCategoryId(null)}>
              <Typography>All {categoryId === null && <i style={{ fontSize: '14px' }}>({products.length})</i>}</Typography>
            </Box>
            {
              // loadingCategory ? <LoadingBar/> : 
              categoryErr ? <ErrorMsg /> :
                allCategorys?.map((item) => (
                  <Box sx={{
                    border: '1px solid lightgray',
                    py: 1.5, px: 2,
                    borderRadius: '4px',
                    bgcolor: categoryId === item.node.id ? 'primary.main' : '#fff',
                    color: categoryId === item.node.id ? '#fff' : 'inherit',
                    cursor: 'pointer',
                    userSelect: 'none',
                    opacity: !item.node.isActive ? '.4' : '1'
                  }} onClick={() => setCategoryId(item.node.id)} key={item?.node.id}>
                    <Typography>{item?.node.name} {categoryId === item.node.id && <i style={{ fontSize: '14px' }}>({products.length})</i>}</Typography>
                  </Box>
                ))
            }
          </Stack>
        </Stack>
        <Stack direction='row' flexWrap='wrap' gap={2} px={{ xs: 0, lg: 3 }}>
          {
            loadinProducts ? <Loader /> : errProducts ? <ErrorMsg /> :
              products.map(item => (
                <SmallProductCard data={item} key={item.id} />
              ))
          }
        </Stack>
      </Paper>

      <Box sx={{
        flex: 1
      }}>
        {/* <DateAndInfoSec /> */}
        {
          addedProducts.length
            ?
            <MiniCart refetch={refetch} />
            :
            <Box sx={{
              position: 'sticky',
              top:80,
              p: 2, borderRadius: '8px',
              mb: 2,
              bgcolor: 'primary.main',
              color: '#fff',
            }}>
              <Typography sx={{ fontSize: '17px', fontWeight: '600' }}>Shopping Cart</Typography>
              <Typography sx={{ fontSize: '14px' }}>Choose some of the delicious dishes from the list.</Typography>
            </Box>
        }
      </Box>
    </Stack>
  )
}

export default Products