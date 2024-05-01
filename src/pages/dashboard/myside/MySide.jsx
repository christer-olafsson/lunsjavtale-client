import { Add, ArrowBack, ArrowForward } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Carousel from 'react-multi-carousel';
import CDialog from '../../../common/dialog/CDialog';
import AddItem from '../../../components/dashboard/AddItem';
import MiniCart from '../../../components/dashboard/MiniCart';
import { useDispatch, useSelector } from 'react-redux';
import SelectDate from './SelectDate';
import DateSelector from '../../../components/dashboard/DateSelector';
import { removeSelectedDate } from '../../../redux/selectedDateSlice';
import DateAndInfoSec from '../../../components/dashboard/DateAndInfoSec';
import { GET_SINGLE_CATEGORY } from '../../../graphql/query';
import { useQuery } from '@apollo/client';
import LoadingBar from '../../../common/loadingBar/LoadingBar';
import ProductCard from './ProductCard';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import OpProductCard from './OpProductCard';



const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1278 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1074, min: 800 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1
  }
};
const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (

    <Stack direction='row' sx={{
      display: { xs: 'none', md: 'block' },

      // position:'absolute',top:0
    }}>
      <IconButton disabled={currentSlide === 0 ? true : false} onClick={() => previous()} variant='outlined' style={{ height: '40px', mr: 2, borderRadius: '50px', width: '90px' }}>
        <ArrowBack />
      </IconButton>
      <IconButton onClick={() => next()} variant='outlined' style={{ height: '40px', borderRadius: '50px', width: '90px' }}>
        <ArrowForward />
      </IconButton>
    </Stack>
  );
};



const MySide = (props) => {
  const [products, setProducts] = useState({});
  const [optionProducts, setOptionProducts] = useState({})

  const { loading, error } = useQuery(GET_SINGLE_CATEGORY, {
    variables: {
      id: parseInt(2)
    },
    onCompleted: (res) => {
      setProducts(res.category)
    },
  });
  const { loading: opLoading, error: opErr } = useQuery(GET_SINGLE_CATEGORY, {
    variables: {
      id: parseInt(4)
    },
    onCompleted: (res) => {
      setOptionProducts(res.category)
    },
  });

  const SelectedItem = true

  return (
    <Stack maxWidth='xxl' mb={5} direction={{ xs: 'column-reverse', lg: 'row' }} gap={3}>
      <Box sx={{
        width: { xs: '100%', lg: '70%' }
      }}>
        {
          loading ? <LoadingBar /> : error ? <ErrorMsg /> :
            <Paper sx={{ mt: { xs: 15, lg: 0 } }} elevation={3}>
              <Typography sx={{
                bgcolor: '#52525B',
                padding: '12px 24px',
                color: '#fff',
                textAlign: 'center',
                borderRadius: '5px'
              }}>{products?.name}</Typography>
              <Box sx={{
                height: '470px',
                overflowY: 'auto',
                p: 2,
              }}>
                <Grid container spacing={2}>
                  {
                    products.products?.edges?.map((item, id) => (
                      <Grid item xs={0} md={6} key={id}>
                        <ProductCard item={item} />
                      </Grid>
                    ))
                  }
                </Grid>
              </Box>
            </Paper>
        }
        {
          opLoading ? <LoadingBar /> : opErr ? <ErrorMsg /> :
            <Paper sx={{ mt: 6, width: '100%' }} elevation={3}>
              <Typography sx={{
                bgcolor: '#52525B',
                padding: '12px 24px',
                color: '#fff',
                textAlign: 'center',
                borderRadius: '5px',
                mb: 2
              }}>{optionProducts?.name}</Typography>
              <Box sx={{
                width: { xs: '100%', sm: '100%' },
                px: 2,
                overflow: 'hidden'
              }}>
                {
                  optionProducts?.products?.edges?.length > 0 &&
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    arrows={false}
                    rewindWithAnimation={true}
                    customRightArrow={true}
                    rewind={true}
                    centerMode={true}
                    responsive={responsive}
                    pauseOnHover
                    autoPlay={true}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup />}
                    autoPlaySpeed={2000}
                    keyBoardControl={true}
                    customTransition="all 1s"
                    transitionDuration={1000}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["mobile"]}
                    deviceType={props.deviceType}
                  >
                    {
                      optionProducts?.products?.edges?.map((item, id) => (
                        <OpProductCard key={id} item={item} />
                      ))
                    }
                  </Carousel>
                }
              </Box>
            </Paper>
        }
      </Box>
      <Box sx={{
        flex: 1
      }}>
        <DateAndInfoSec />
        {
          SelectedItem
            ?
            <MiniCart path='/dashboard/myside/cart' />
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

export default MySide