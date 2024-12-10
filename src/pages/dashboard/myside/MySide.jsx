import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Box, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import Carousel from 'react-multi-carousel';
import { PRODUCTS } from '../../../graphql/query';
import { useQuery } from '@apollo/client';
import LoadingBar from '../../../common/loadingBar/LoadingBar';
import ProductCard from './ProductCard';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import OpProductCard from './OpProductCard';
import MiniCart from '../products/MiniCart';
import { ADDED_PRODUCTS, WEEKLY_VARIANTS } from '../products/graphql/query';
import Loader from '../../../common/loader/Index';



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
  const [allWeeklyVariants, setAllWeeklyVariants] = useState([])
  const [selectedWeeklyVariantId, setSelectedWeeklyVariantId] = useState(null)
  const [selectedWeeklyProducts, setSelectedWeeklyProducts] = useState([])

  const { loading, error } = useQuery(PRODUCTS, {
    onCompleted: (res) => {
      setProducts(res.products.edges.filter(item => !item.node.vendor?.isDeleted).map(item => item.node))
    },
  });

  useQuery(WEEKLY_VARIANTS, {
    onCompleted: (res) => {
      const data = res.weeklyVariants.edges.map(item => item.node)
      setAllWeeklyVariants(data)
    },
  });

  const { loading: optionLoading, error: optionError } = useQuery(PRODUCTS, {
    variables: {
      category: import.meta.env.VITE_STATIC_CATEGORY_ID
    },
    onCompleted: (res) => {
      setOptionProducts(res.products.edges.filter(item => !item.node.vendor?.isDeleted).map(item => item.node))
    },
  });

  useQuery(PRODUCTS, {
    variables: {
      weeklyVariants: selectedWeeklyVariantId ?? null
    },
    onCompleted: (res) => {
      setSelectedWeeklyProducts(res.products.edges.filter(item => !item.node.vendor?.isDeleted && item.node.weeklyVariants.edges.length > 0).map(item => item.node))
    },
  });


  return (
    <Stack maxWidth='xl' mb={5} direction={{ xs: 'column-reverse', lg: 'row' }} gap={3}>
      <Box sx={{
        width: { xs: '100%', xl: '70%' },
      }}>
        {
          loading ? <Loader /> : error ? <ErrorMsg /> :
            <Paper sx={{ mb: 4 }} elevation={3}>
              <Typography sx={{
                bgcolor: '#52525B',
                padding: '12px 24px',
                color: '#fff',
                textAlign: 'center',
                borderRadius: '5px',
                fontWeight: 600,
                fontSize: '18px',
                height: '50px',
              }}>Tilgjengelig i ditt område</Typography>
              <Box className='custom-scrollbar' sx={{
                height: '470px',
                overflowY: 'auto',
                p: 2,
              }}>
                <Grid container spacing={2}>
                  {
                    products?.length === 0 &&
                    <Typography sx={{
                      textAlign: 'center',
                      p: 5
                    }}>Ingen utvalgte produkter funnet</Typography>
                  }
                  {
                    products?.length > 0 &&
                    products?.map((item, id) => (
                      <Grid sx={{ width: '100%' }} item xs={0} md={6} lg={4} key={id}>
                        <ProductCard data={item} />
                      </Grid>
                    ))
                  }
                </Grid>
              </Box>
            </Paper>
        }

        {/* weekly selected */}
        {
          // selectedWeeklyProducts?.length > 0 &&
          // <Paper sx={{ mb: 4, }} elevation={3}>
          //   <Stack direction='row' alignItems='center' justifyContent='center' sx={{
          //     bgcolor: '#52525B',
          //     padding: '12px 24px',
          //     color: '#fff',
          //     textAlign: 'center',
          //     borderRadius: '5px',
          //     height: '50px',
          //   }}>
          //     <Typography sx={{
          //       fontWeight: 600,
          //       fontSize: '18px',
          //     }}>Ukens Utvalgte</Typography>

          //   </Stack>
          //   <Box className='custom-scrollbar' sx={{
          //     display: 'flex',
          //     flexDirection: 'column',
          //     alignItems: 'center',
          //     height: selectedWeeklyProducts?.length === 0 ? '150px' : '526px',
          //     overflowY: 'auto',
          //     p: 2,
          //   }}>
          //     <FormControl sx={{ mb: 2, ml: 2 }}>
          //       <RadioGroup
          //         row
          //         value={selectedWeeklyVariantId}
          //         onChange={(e) => setSelectedWeeklyVariantId(e.target.value)}
          //       >
          //         <FormControlLabel checked={!selectedWeeklyVariantId} value='' control={<Radio />} label='Alle uker' />
          //         {
          //           allWeeklyVariants?.map((item, index) => (
          //             <FormControlLabel
          //               key={item.id}
          //               value={item.id}
          //               control={<Radio />}
          //               label={item.name}
          //             />
          //           ))
          //         }
          //       </RadioGroup>
          //     </FormControl>
          //     <Grid container spacing={2}>
          //       {
          //         selectedWeeklyProducts?.length === 0 &&
          //         <Typography sx={{
          //           textAlign: 'center',
          //           p: 2
          //         }}>Ingen ukentlige utvalgte produkter funnet</Typography>
          //       }
          //       {
          //         weeklyLoading ? <Loader /> : weeklyError ? <ErrorMsg /> :
          //           selectedWeeklyProducts?.map((item, id) => (
          //             <Grid sx={{ width: '100%' }} item xs={0} md={6} key={id}>
          //               <ProductCard data={item} />
          //             </Grid>
          //           ))
          //       }
          //     </Grid>
          //   </Box>
          // </Paper>
        }

        {
          optionLoading ? <Loader /> : optionError ? <ErrorMsg /> :

            <Paper sx={{ width: '100%' }} elevation={3}>
              <Typography sx={{
                bgcolor: '#52525B',
                padding: '12px 24px',
                color: '#fff',
                textAlign: 'center',
                borderRadius: '5px',
                mb: 2,
                height: '50px',
                fontWeight: 600,
                fontSize: '18px',
              }}>{optionProducts[0]?.category?.name ?? 'Valgfrie Produkter'}</Typography>
              <Box sx={{
                width: { xs: '100%', sm: '100%' },
                px: 2,
                overflow: 'hidden'
              }}>
                {
                  optionProducts?.length === 0 &&
                  <Typography sx={{
                    textAlign: 'center',
                    p: 5
                  }}>Ingen valgfrie produkter funnet</Typography>
                }
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
        display: { xs: 'none', xl: 'block' },
        flex: 1
      }}>
        <MiniCart />
      </Box>
    </Stack>
  )
}

export default MySide