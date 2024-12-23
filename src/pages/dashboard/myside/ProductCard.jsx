/* eslint-disable react/prop-types */
import { Add, ArrowRight, ArrowRightAltOutlined, Info, KeyboardArrowRight } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import CDialog from '../../../common/dialog/CDialog';
import AddItem from '../products/AddItem';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useQuery } from '@apollo/client';
import { ME } from '../../../graphql/query';
import SlideDrawer from '../products/SlideDrawer';
import FoodDetails from '../products/FoodDetails';

const ProductCard = ({ data }) => {
  const [openProductAddDialog, setOpenProductAddDialog] = useState(false);
  const [openSlideDrawer, setOpenSlideDrawer] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenSlideDrawer(!openSlideDrawer);
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { data: user } = useQuery(ME)

  const theme = useTheme()
  return (

    <Stack gap={{ xs: 0, lg: 1 }} sx={{
      position: 'relative',
      width: '100%',
      maxWidth: '1000px',
      minHeight: '310px',
      height: { xs: '100%' },
      overflow: 'hidden',
      boxShadow: 2,
      // p: { xs: 2, lg: 2 },
      borderRadius: '8px',
      border: `1px solid ${theme.palette.primary.main}`
    }}>
      {
        data?.vendor &&
        <Typography sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          px: 2,
          color: '#fff',
          bgcolor: 'primary.main',
          py: 1,
          height: 'fit-content',
          borderRadius: '4px',
          width: 'fit-content',
          fontSize: '14px'
        }}>
          Supplier: <b>{data?.vendor?.name}</b>
        </Typography>
      }
      <Box sx={{
        width: '100%',
        height: '230px',
        transition: '.5s ',
        overflow: 'hidden',
        ":hover": {
          transform: 'scale(1.4)'
        }
      }}>
        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src={data?.attachments.edges.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'} alt="" />
      </Box>
      {/* info section */}
      <Stack sx={{
        flex: 1, px: 2, py: 1,
        mt: -2,
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
        bgcolor: 'primary.main',
        color: '#fff',
        zIndex: 2
      }} justifyContent='space-between'>
        <Stack gap={{ xs: 0, lg: .5 }} mt={{ xs: 1, lg: 0 }}>
          <Typography sx={{ fontSize: { xs: '16px', lg: '16px' }, fontWeight: '600', lineHeight: '20px' }}>
            {data?.name.substring(0, 45)}
            {data.name.length > 45 ? '...' : ''}
          </Typography>
          {/* {
            data?.weeklyVariants?.edges.length > 0 &&
            <Stack direction='row' flexWrap='wrap' gap={1}>
              {
                data?.weeklyVariants?.edges.map((item, id) => (
                  <Typography
                    key={id}
                    sx={{
                      width: 'fit-content',
                      fontSize: '12px',
                      bgcolor: 'blue',
                      color: '#fff',
                      px: 1, borderRadius: '4px',
                    }}>
                    {item.node.name}
                  </Typography>
                ))
              }
            </Stack>
          } */}
          <Typography variant='body2' sx={{ lineHeight: '18px', color: 'rgba(255,255,255,0.8)' }}>
            {data.description.substring(0, 60)}
            {data.description.length > 60 ? '...' : ''}
          </Typography>
        </Stack>

        <Stack direction='row' alignItems='center' mt={1} gap={2} justifyContent='space-between'>
          <IconButton sx={{
            border: '1px solid #fff',
            width: '30px',
            height: '30px',
            color: '#000',
            ":hover": {
              border: '1px solid lightgray',
            }
          }} color='white' size='small' onClick={toggleDrawer} >
            <KeyboardArrowRight sx={{ color: '#fff' }} />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: "center" }}>
            <Typography sx={{ fontSize: '12px', border: '1px solid lightgray', mr: 1, p: '8px 12px', borderRadius: '50px', whiteSpace: 'nowrap', lineHeight: '10px' }}>kr: <b>{data.priceWithTax}</b> </Typography>

            <IconButton size='small' color='white' disabled={user?.me.company.isBlocked} onClick={() => setOpenProductAddDialog(true)} sx={{
              border: '1px solid #fff',
              width: '40px',
              height: '40px',
              bgcolor: '#fff',
              color: '#000',
              ":hover": {
                bgcolor: 'lightgray',
                border: '1px solid lightgray',
              }
            }}>
              <Add sx={{ fontSize: '30px', color: 'primary.main' }} />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
      {/* food details page */}
      <SlideDrawer openSlideDrawer={openSlideDrawer} toggleDrawer={toggleDrawer}>
        <FoodDetails data={data} toggleDrawer={toggleDrawer} />
      </SlideDrawer>
      {/* product add dialog */}
      <CDialog fullScreen={isMobile} maxWidth='md' openDialog={openProductAddDialog}>
        <AddItem closeDialog={() => setOpenProductAddDialog(false)} maxWidth={'xl'} data={data} />
      </CDialog>
    </Stack>
  )
}

export default ProductCard