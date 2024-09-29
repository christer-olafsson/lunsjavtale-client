/* eslint-disable react/prop-types */
import { Add, ArrowRight, ArrowRightAltOutlined } from '@mui/icons-material'
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
      width: '100%',
      maxWidth: '1000px',
      minHeight: '310px',
      height: { xs: '100%' },
      overflow: 'hidden',
      bgcolor: 'light.main',
      p: { xs: 2, lg: 2.5 },
      borderRadius: '8px',
      border: `1px solid ${theme.palette.primary.main}`
    }}>
      <Box sx={{
        width: '100%',
        height: '150px',
      }}>
        <img style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
          src={data?.attachments.edges.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'} alt="" />
      </Box>
      <Stack sx={{ flex: 1 }} justifyContent='space-between'>
        <Stack gap={{ xs: 0, lg: .5 }} mt={{ xs: 1, lg: 0 }}>
          <Typography sx={{ fontSize: { xs: '16px', lg: '18px' }, fontWeight: '600' }}>
            {data?.name.substring(0, 50)}
            {data.name.length > 50 ? '...' : ''}
          </Typography>
          {
            data?.weeklyVariants?.edges.length > 0 &&
            <Stack direction='row' flexWrap='wrap' gap={1}>
              {
                data?.weeklyVariants?.edges.map((item, id) => (
                  <Typography
                    key={id}
                    sx={{
                      width: 'fit-content',
                      fontSize: '12px',
                      bgcolor: 'Highlight',
                      color: '#fff',
                      px: 1, borderRadius: '4px',
                    }}>
                    {item.node.name}
                  </Typography>
                ))
              }
            </Stack>
          }
          <Typography sx={{ fontSize: '14px' }}>
            {data.description.substring(0, 60)}
            {data.description.length > 60 ? '...' : ''}
          </Typography>
          {/* <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}> <b><i>Contains: </i></b> <i>{JSON.parse(data.contains)}</i> </Typography> */}
        </Stack>
        <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
          <Button onClick={toggleDrawer} endIcon={<ArrowRight />} >
            Details
          </Button>
          <Box sx={{ display: 'inline-flex', alignSelf: 'flex-end', mt: 1 }}>
            <Box sx={{ padding: '6px 16px', mr: 1, borderRadius: '40px', fontSize: '14px', border: '1px solid gray' }}>
              <Typography sx={{ fontSize: '14px', whiteSpace: 'nowrap' }}>kr: <b>{data.priceWithTax}</b> </Typography>
            </Box>
            <IconButton disabled={user?.me.company.isBlocked} onClick={() => setOpenProductAddDialog(true)} sx={{
              bgcolor: 'light.main',
              border: '1px solid gray'
            }}>
              <Add fontSize='small' />
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