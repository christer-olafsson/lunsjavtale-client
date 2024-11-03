import { Box, Container, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import CButton from '../../common/CButton/CButton';
import { useQuery } from '@apollo/client';
import { PRODUCTS, } from '../../graphql/query';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { WEEKLY_VARIANTS } from '../../pages/dashboard/products/graphql/query';
import Loader from '../../common/loader/Index';
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg';
import useIsMobile from '../../hook/useIsMobile';
import { SlideAnimation } from '../animation/Animation';

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
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


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
    breakpoint: { max: 1074, min: 700 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1
  }
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (

    <Stack direction='row' sx={{
      display: { xs: 'none', md: 'block' },
      mt: 2, ml: 2,
      // position:'absolute',top:0
    }}>
      <CButton disable={currentSlide === 0 ? true : false} onClick={() => previous()} variant='outlined' style={{ height: '40px', mr: 2, borderRadius: '50px', color: '#fff', border: '1px solid #fff', width: '90px' }}>
        <ArrowBack />
      </CButton>
      <CButton onClick={() => next()} variant='outlined' style={{ height: '40px', color: '#fff', border: '1px solid #fff', borderRadius: '50px', width: '90px' }}>
        <ArrowForward />
      </CButton>
    </Stack>
  );
};


const WeeklyTab = (props) => {
  const [products, setProducts] = useState([])
  const [allWeeklyVariants, setAllWeeklyVariants] = useState([])
  const [selectedWeeklyVariantId, setSelectedWeeklyVariantId] = useState('')

  const isMobile = useIsMobile()

  const { loading: loadinProducts, error: errProducts } = useQuery(PRODUCTS, {
    variables: {
      weeklyVariants: selectedWeeklyVariantId ?? null
    },
    onCompleted: (res) => {
      const data = res?.products?.edges?.filter(item => !item.node.vendor?.isDeleted && item.node.weeklyVariants.edges.length > 0)?.map(item => item)
      setProducts(data)
    },
  });

  useQuery(WEEKLY_VARIANTS, {
    onCompleted: (res) => {
      const data = res.weeklyVariants.edges.map(item => item.node)
      setAllWeeklyVariants(data)
    },
  });

  if (products.length === 0) return;

  return (
    <Box sx={{
      bgcolor: '#021611',
      position: 'relative',
      my: { xs: 10, md: 15 },
      minHeight: '800px',
      py: { xs: 5, md: 10 },
      // '::before': {
      //   content: '""',
      //   position: 'absolute',
      //   top: 0,
      //   left: 0,
      //   right: 0,
      //   bottom: 0,
      //   backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(/heroImg2.jpg)`,
      //   backgroundRepeat: 'no-repeat',
      //   backgroundSize: 'cover',
      //   backgroundAttachment: 'fixed',
      //   zIndex: -1
      // }
    }} id='Meny'>
      <Container maxWidth='lg' sx={{ p: 0 }}>
        <Stack sx={{
          mb: 3,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3
        }}>
          <SlideAnimation direction='up'>
            <Typography sx={{
              fontSize: { xs: '44px', md: '64px', lineHeight: '50px' },
              fontFamily: 'Forum',
              color: '#fff',
              textAlign: 'center'
            }}>Vårt ukentlige utvalgte</Typography>
          </SlideAnimation>

          {/* select week */}
          <SlideAnimation direction='up' delay={200}>
            <FormControl sx={{
              mb: 2,
              px: 4,
              mx: 2,
              bgcolor: '#fff',
              borderRadius: '50px'
            }}>
              <RadioGroup

                row
                value={selectedWeeklyVariantId}
                onChange={(e) => setSelectedWeeklyVariantId(e.target.value)}
              >
                {
                  allWeeklyVariants?.map((item, index) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.id}
                      control={<Radio size='small' />}
                      label={item.name}
                    />
                  ))
                }
              </RadioGroup>
            </FormControl>
          </SlideAnimation>

        </Stack>

        {
          loadinProducts ? <Loader /> : errProducts ? <ErrorMsg /> :
            products?.length === 0 ? <Typography my={5} textAlign='center' variant='h5'>Ingen produkter</Typography> :
              <Box px={1}>
                <Carousel
                  swipeable={true}
                  // draggable={true}
                  // showDots={isMobile ? true : false}
                  arrows={false}
                  rewindWithAnimation={true}
                  rewind={true}
                  responsive={responsive}
                  // infinite={true}
                  renderButtonGroupOutside={true}
                  autoPlay={true}
                  customButtonGroup={<ButtonGroup />}
                  // autoPlay={props.deviceType !== "mobile" ? true : false}
                  autoPlaySpeed={2000}
                  keyBoardControl={true}
                  customTransition="all 1s"
                  transitionDuration={1000}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={props.deviceType}
                >
                  {
                    products?.map((data, id) => (
                      // <SlideAnimation key={id} direction='up' delay={100 * id} >
                      <Box key={id} px={1}>
                        <ProductCard isWeekly={true} data={data} />
                      </Box>
                      // </SlideAnimation>
                    ))
                  }
                </Carousel>
              </Box>
        }
      </Container>
    </Box>
  )
}

export default WeeklyTab