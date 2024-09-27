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
  const [products, setProducts] = useState([]);
  const [optionProducts, setOptionProducts] = useState([])
  const [addedProducts, setAddedProducts] = useState([]);

  const { loading, error } = useQuery(PRODUCTS, {
    onCompleted: (res) => {
      setProducts(res.products.edges.filter(item => !item.node.vendor?.isDeleted && item.node.isFeatured).map(item => item.node))
    },
  });

  useQuery(PRODUCTS, {
    variables: {
      category: import.meta.env.VITE_STATIC_CATEGORY_ID
    },
    onCompleted: (res) => {
      setOptionProducts(res.products.edges.filter(item => !item.node.vendor?.isDeleted).map(item => item.node))
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
    <Stack maxWidth='xl' mb={5} direction={{ xs: 'column-reverse', lg: 'row' }} gap={3}>
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
              }}>Featured Products</Typography>
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
        <MiniCart />
      </Box>
    </Stack>
  )
}

export default MySide