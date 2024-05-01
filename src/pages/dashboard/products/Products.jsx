import { Box, IconButton, Paper, Stack, Tab, Tabs, Typography, styled, tabClasses, tabsClasses } from '@mui/material'
import React, { useState } from 'react'
import MiniCart from '../../../components/dashboard/MiniCart';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { GET_ALL_CATEGORY } from '../../../graphql/query';
import Loader from '../../../common/loader/Index';
import { Add } from '@mui/icons-material';
import CDialog from '../../../common/dialog/CDialog';
import AddItem from '../../../components/dashboard/AddItem';
import DateAndInfoSec from '../../../components/dashboard/DateAndInfoSec';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import SmallProductCard from './SmallProductCard';

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
  const [tabIndex, setTabIndex] = useState(0);
  const [allCategorys, setAllCategorys] = useState([]);
  const [openProductAddDialog, setOpenProductAddDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { loading, error } = useQuery(GET_ALL_CATEGORY, {
    onCompleted: (data) => {
      const res = data?.categories?.edges
      setAllCategorys(res)
    },
  });

  const handleProductDialogOpen = (id) => {
    setSelectedProductId(id)
    setOpenProductAddDialog(true);
  };
  const handleProductDialogClose = () => {
    setOpenProductAddDialog(false);
  };

  // const { loading, error } = useQuery(GET_ALL_CATEGORY, {
  //   onCompleted: (data) => {
  //     const res = data?.categories?.edges
  //     setAllCategorys(res)
  //   },
  // });
  const SelectedItem = true
  return (
    <Stack maxWidth='xxl' mb={5} direction={{ xs: 'column-reverse', lg: 'row' }} gap={3}>
      <Paper sx={{
        width: { xs: '100%', lg: '70%' },
        boxShadow: {
          xs: 'none', // No elevation for extra small screens
          lg: 2,      // Elevation level 4 for large screens
        }
      }}>
        <Typography sx={{ fontSize: '18px', fontWeight: 600, m: 2 }}>Product Details</Typography>
        <Stack direction='row' sx={{
          mb: 3,
          justifyContent: 'center',
        }}>
          <Tabs
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            value={tabIndex}
            onChange={(e, index) => setTabIndex(index)}
            sx={{
              width: "100%",
              bgcolor: 'light.main',
              py: 2,
              [`& .${tabsClasses.indicator}`]: {
                display: "none",
              },
            }}
          >
            {
              loading ? <Loader /> : error ? <ErrorMsg/> :
              allCategorys.map((item) => (
                <TabItem key={item.node.id} disableRipple label={item.node.name} />
              ))
            }
          </Tabs>
        </Stack>
        {
          loading ? <Loader /> : error ? <ErrorMsg/> :
          allCategorys.map((item, id) => (
            <CustomTabPanel key={id} value={tabIndex} index={id}>
              <Stack sx={{
                px: { xs: 0, lg: 3 },
                maxHeight: { xs: '50vh', lg: '70vh' },
                overflowY: 'auto'
              }} gap={2}>
                {
                  item?.node?.products?.edges?.map((data, id) => (
                    <SmallProductCard data={data} key={id}/>
                  ))
                }
              </Stack>
            </CustomTabPanel>
          ))
        }
      </Paper>

      <Box sx={{
        flex: 1
      }}>
        <DateAndInfoSec/>
        {
          SelectedItem
            ?
            <MiniCart path='/dashboard/products/cart' />
            :
            <Box sx={{
              p: 2, borderRadius: '8px', mb: 2,
              bgcolor: 'primary.main',
              color: '#fff',
              mt: 4,
              cursor: 'pointer'
            }}>
              <Typography sx={{ fontSize: '17px', fontWeight: '600' }}>Shopping Cart</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>Choose some of the delicious dishes from the list below 😋</Typography>
            </Box>
        }
      </Box>
    </Stack>
  )
}

export default Products