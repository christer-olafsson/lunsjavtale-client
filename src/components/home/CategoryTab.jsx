import { Box, Container, IconButton, Stack, Tab, Tabs, Typography, styled, tabClasses, tabsClasses } from '@mui/material'
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
  const [categoryId, setCategoryId] = useState('')
  const [products, setProducts] = useState({})

  const { loading, error } = useQuery(GET_ALL_CATEGORY, {
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
    <Box id='products'>
      <Container maxWidth='lg' sx={{ my: { xs: 10, md: 15 }, p: 0 }}>
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
              width: "fit-content",
              [`& .${tabsClasses.indicator}`]: {
                display: "none",
              },
            }}
          >
            {
              loading ? <Loader /> : error ? <h4>Something went wrong!</h4> :
                allCategorys.map((item) => (
                  <TabItem key={item.node.id} disableRipple label={item.node.name} />
                ))
            }
          </Tabs>
        </Stack>
        {
          loading ? <Loader /> : error ? <ErrorMsg /> :
            allCategorys.map((item, id) => (
              <CustomTabPanel key={id} value={tabIndex} index={id}>
                <Stack>
                  <SlideAnimation direction='up'>
                    <Typography sx={{ fontSize: '32px', mb: 2, fontWeight: 600, textAlign: 'center' }}>{item.node.name}</Typography>
                  </SlideAnimation>
                  <Typography sx={{ mb: 6, px: '16px', maxWidth: '727px', alignSelf: 'center', textAlign: 'center', fontSize: { xs: '14px', md: '16px' } }}>
                    <FadeAnimation>
                      {item.node.description}
                    </FadeAnimation>
                  </Typography>
                </Stack>
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
                      item?.node?.products?.edges.length === 0 ? <Typography my={5} textAlign='center' variant='h5'>No Products Found!</Typography> :
                        item?.node?.products?.edges?.filter(item => !item.node.vendor?.isDeleted).map((data, id) => (
                          <SlideAnimation key={id} direction='up' delay={100 * id} >

                            <Box px={1}>
                              <ProductCard data={data} />
                            </Box>
                          </SlideAnimation>
                        ))
                    }
                  </Carousel>
                </Box>
              </CustomTabPanel>
            ))
        }
      </Container>
    </Box>
  )
}

export default CategoryTab