import { Add, ArrowRightAltOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import CDialog from '../../../common/dialog/CDialog';
import AddItem from '../products/AddItem';
import { Link } from 'react-router-dom';

const OpProductCard = ({ item }) => {
  const [openOptionProductAddDialog, setOpenOptionProductAddDialog] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));


  return (
    <Box sx={{
      width: { xs: '140px', md: '173px' },
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
        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#fff', textAlign: 'center',mb:1 }}>{item.name}</Typography>
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
          <IconButton onClick={() => setOpenOptionProductAddDialog(true)} sx={{
            bgcolor: 'light.main',
            ":hover": {
              bgcolor: 'light.main'
            }
          }}>
            <Add fontSize='small' />
          </IconButton>
        </Box>
        <Link to={`/dashboard/from-myside/products/${item.id}`}>
          <button style={{
            backgroundColor: 'transparent',
            color:'#fff',
            outline:'none',
            border: '1px solid gray',
            borderRadius:'50px',
            paddingLeft:'20px',
            paddingRight:'20px',
            marginTop:'10px',
            cursor:'pointer'
          }}>Details</button>
        </Link>
      </Stack>
      <CDialog fullScreen={isMobile} maxWidth='md' openDialog={openOptionProductAddDialog}>
        <AddItem closeDialog={() => setOpenOptionProductAddDialog(false)} data={item} option={true} />
      </CDialog>
    </Box>
  )
}

export default OpProductCard