import { Add, ArrowRightAltOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import CDialog from '../../../common/dialog/CDialog';
import AddItem from '../products/AddItem';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from '../../../graphql/query';
import SlideDrawer from '../products/SlideDrawer';
import FoodDetails from '../products/FoodDetails';

const OpProductCard = ({ item }) => {
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

  const [openOptionProductAddDialog, setOpenOptionProductAddDialog] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { data: user } = useQuery(ME)

  return (
    <Box sx={{
      width: { xs: '140px', md: '173px', lg: '170px' },
      height: '152px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '12px',
      gap: 2,
      p: 2.5,
      mb: { xs: 2, md: 0 }
    }}>
      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(0,0,0,.4)',
        zIndex: -1
      }} />
      <img style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0, zIndex: -2
      }} src={item.attachments.edges.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'} alt="" />
      <Stack alignItems='center' sx={{
        bgcolor: 'rgb(0,0,0,10'
      }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#fff', textAlign: 'center', mb: 1 }}>{item.name}</Typography>
        <Box sx={{ display: 'inline-flex', alignSelf: 'flex-end' }}>
          <Box sx={{
            py: { xs: '8px', md: '6px' },
            px: { xs: '8px', md: '16px' },
            mr: 1,
            borderRadius: '40px',
            bgcolor: '#fff',
            fontSize: '14px',
            border: '1px solid gray'
          }}>
            <Typography sx={{ fontSize: { xs: '12px', md: '14px' }, whiteSpace: 'nowrap' }}>kr {item.priceWithTax}</Typography>
          </Box>
          <IconButton disabled={user?.me.company.isBlocked} onClick={() => setOpenOptionProductAddDialog(true)} sx={{
            bgcolor: 'light.main',
            ":hover": {
              bgcolor: 'light.main'
            }
          }}>
            <Add fontSize='small' />
          </IconButton>
        </Box>
        <button onClick={toggleDrawer} style={{
          backgroundColor: 'transparent',
          color: '#fff',
          outline: 'none',
          border: '1px solid gray',
          borderRadius: '50px',
          paddingLeft: '20px',
          paddingRight: '20px',
          marginTop: '10px',
          cursor: 'pointer'
        }}>Details</button>
      </Stack>
      {/* food details page */}
      <SlideDrawer openSlideDrawer={openSlideDrawer} toggleDrawer={toggleDrawer}>
        <FoodDetails data={item} toggleDrawer={toggleDrawer} />
      </SlideDrawer>
      <CDialog fullScreen={isMobile} maxWidth='md' openDialog={openOptionProductAddDialog}>
        <AddItem closeDialog={() => setOpenOptionProductAddDialog(false)} data={item} option={true} />
      </CDialog>
    </Box>
  )
}

export default OpProductCard