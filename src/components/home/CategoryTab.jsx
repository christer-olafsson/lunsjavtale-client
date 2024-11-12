import { Box, Container, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Stack, Tab, Tabs, Typography, styled, tabClasses, tabsClasses } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Slider from 'react-slick';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import CButton from '../../common/CButton/CButton';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORY, PRODUCTS, } from '../../graphql/query';
import Loader from '../../common/loader/Index';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg';
import { FadeAnimation, SlideAnimation } from '../animation/Animation';
import { WEEKLY_VARIANTS } from '../../pages/dashboard/products/graphql/query';

const TabItem = styled(Tab)(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.primary.main}`,
  textAlign: "center",
  textTransform: 'none',
  transition: "all .5s",
  padding: "10px 15px",
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
    color: "#FFFFFF",
    backgroundColor: theme.palette.primary.main,
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
      <CButton disable={currentSlide === 0 ? true : false} onClick={() => previous()} variant='outlined' style={{ height: '40px', mr: 2, borderRadius: '50px', width: '90px' }}>
        <ArrowBack />
      </CButton>
      <CButton onClick={() => next()} variant='outlined' style={{ height: '40px', borderRadius: '50px', width: '90px' }}>
        <ArrowForward />
      </CButton>
    </Stack>
  );
};


const CategoryTab = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [allCategorys, setAllCategorys] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const [products, setProducts] = useState([])
  const [allWeeklyVariants, setAllWeeklyVariants] = useState([])
  const [selectedWeeklyVariantId, setSelectedWeeklyVariantId] = useState('')
  const [productsLength, setProductsLength] = useState([])

  const { loading, error } = useQuery(GET_ALL_CATEGORY, {
    onCompleted: (data) => {
      const res = data?.categories?.edges.filter((item) => item.node.isActive)
      setAllCategorys(res)
    },
  });

  useQuery(PRODUCTS, {
    onCompleted: (res) => {
      const data = res.products.edges.filter(item => !item.node.vendor?.isDeleted).map(item => item.node)
      setProductsLength(data.length)
    },
  });

  const { loading: loadinProducts, error: errProducts } = useQuery(PRODUCTS, {
    variables: {
      category: categoryId,
      weeklyVariants: selectedWeeklyVariantId ?? null
    },
    onCompleted: (res) => {
      const data = res?.products?.edges?.filter(item => !item.node.vendor?.isDeleted)?.map(item => item)
      setProducts(data)
    },
  });

  useQuery(WEEKLY_VARIANTS, {
    onCompleted: (res) => {
      const data = res.weeklyVariants.edges.map(item => item.node)
      setAllWeeklyVariants(data)
    },
  });

  return (
    <Box id='Produkter'>
      <Container maxWidth='lg' sx={{ my: { xs: 10, md: 15 }, p: 0 }}>
        <Stack sx={{
          mb: 3,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3
        }}>

          <Stack sx={{
            width: '100%',
            p: 3
          }} direction='row' justifyContent='center' gap={{ xs: 1, md: 2 }} flexWrap='wrap'>
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
              }}>Alle produkter
                {/* {<i style={{ fontSize: '14px', fontWeight: 600, marginLeft: '5px' }}>({productsLength})</i>} */}
              </Typography>
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
                    {/* <span style={{ fontSize: '14px', fontWeight: 600, marginLeft: '5px' }}>({item?.node?.products?.edges.length})</span> */}
                  </Typography>
                </Box>
              ))
            }
          </Stack>

          {/* select week */}
          {/* <FormControl sx={{ mb: 2, px: 4 }}>
            <RadioGroup
              row
              value={selectedWeeklyVariantId}
              onChange={(e) => setSelectedWeeklyVariantId(e.target.value)}
            >
              <FormControlLabel checked={!selectedWeeklyVariantId} value='' control={<Radio size='small' />} label='Ingen' />
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
          </FormControl> */}

        </Stack>
        {
          loading ? <Loader /> : error ? <ErrorMsg /> :
            categoryId === null ?
              <Typography sx={{ fontSize: '32px', mb: 4, fontWeight: 600, textAlign: 'center' }}>Alle Produkter</Typography>
              : (
                allCategorys.find(item => item.node.id === categoryId) && (
                  <Stack>
                    <SlideAnimation direction='up'>
                      <Typography sx={{ fontSize: '32px', mb: 2, fontWeight: 600, textAlign: 'center' }}>
                        {allCategorys.find(item => item.node.id === categoryId).node.name}
                      </Typography>
                    </SlideAnimation>
                    <Typography sx={{ mb: 6, px: '16px', maxWidth: '727px', alignSelf: 'center', textAlign: 'center', fontSize: { xs: '14px', md: '16px' } }}>
                      <FadeAnimation>
                        {allCategorys.find(item => item.node.id === categoryId).node.description}
                      </FadeAnimation>
                    </Typography>
                  </Stack>
                )
              )
        }

        {
          products?.length === 0 ? <Typography my={5} textAlign='center' variant='h5'>Ingen produkter</Typography> :

            <Box px={1}>
              <Carousel
                swipeable={true}
                // draggable={true}
                showDots={false}
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
                      <ProductCard data={data} />
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

export default CategoryTab