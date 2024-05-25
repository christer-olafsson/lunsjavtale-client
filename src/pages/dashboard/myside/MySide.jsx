import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import Carousel from 'react-multi-carousel';
import { PRODUCTS } from '../../../graphql/query';
import { useQuery } from '@apollo/client';
import LoadingBar from '../../../common/loadingBar/LoadingBar';
import ProductCard from './ProductCard';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import OpProductCard from './OpProductCard';
import MiniCart from '../products/MiniCart';
import { ADDED_PRODUCTS } from '../products/graphql/query';



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
  const [addedProducts, setAddedProducts] = useState([]);

  const { loading, error, refetch } = useQuery(PRODUCTS, {
    variables: {
      category: "2"
    },
    onCompleted: (res) => {
      setProducts(res.products.edges.map(item => item.node))
    },
  });

  useQuery(PRODUCTS, {
    variables: {
      category: "4"
    },
    onCompleted: (res) => {
      setOptionProducts(res.products.edges.map(item => item.node))
    },
  });

  useQuery(ADDED_PRODUCTS, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddedProducts(res.addedProducts.edges.map(item => item.node))
    }
  });

  return (
    <Stack maxWidth='xxl' mb={5} direction={{ xs: 'column', lg: 'row' }} gap={3}>
      <Box sx={{
        width: { xs: '100%', lg: '70%' },
      }}>
        {
          loading ? <LoadingBar /> : error ? <ErrorMsg /> :
            <Paper elevation={3}>
              <Typography sx={{
                bgcolor: '#52525B',
                padding: '12px 24px',
                color: '#fff',
                textAlign: 'center',
                borderRadius: '5px',
              }}>{products[0]?.category?.name}</Typography>
              <Box className='custom-scrollbar' sx={{
                height: '470px',
                overflowY: 'auto',
                p: 2,
              }}>
                <Grid container spacing={2}>
                  {
                    products?.length > 0 &&
                    products?.map((item, id) => (
                      <Grid sx={{ width: '100%' }} item xs={0} md={6} key={id}>
                        <ProductCard data={item} />
                      </Grid>
                    ))
                  }
                </Grid>
              </Box>
            </Paper>
        }
        {
          <Paper sx={{ mt: 2, width: '100%' }} elevation={3}>
            <Typography sx={{
              bgcolor: '#52525B',
              padding: '12px 24px',
              color: '#fff',
              textAlign: 'center',
              borderRadius: '5px',
              mb: 2
            }}>{optionProducts[0]?.category?.name}</Typography>
            <Box sx={{
              width: { xs: '100%', sm: '100%' },
              px: 2,
              overflow: 'hidden'
            }}>
              {
                optionProducts?.length > 0 &&
                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  arrows={false}
                  // rewindWithAnimation={true}
                  customRightArrow={true}
                  // rewind={true}
                  centerMode={true}
                  responsive={responsive}
                  pauseOnHover
                  autoPlay={true}
                  infinite
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
                    optionProducts?.map((item, id) => (
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
        {
          addedProducts.length
            ?
            <Box >
              <MiniCart refetch={refetch} path='/dashboard/myside/cart' />
            </Box>
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