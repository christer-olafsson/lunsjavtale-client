/* eslint-disable react/prop-types */
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CButton from '../../common/CButton/CButton'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import CDialog from '../../common/dialog/CDialog'
import AddItem from '../../pages/dashboard/products/AddItem'
import SlideDrawer from '../../pages/dashboard/products/SlideDrawer'
import FoodDetails from '../../pages/dashboard/products/FoodDetails'
import { Info } from '@mui/icons-material'

const ProductCard = ({ data, isWeekly }) => {
  const [openProductAddDialog, setOpenProductAddDialog] = useState(false);
  const [openSlideDrawer, setOpenSlideDrawer] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('lunsjavtale'));

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

  const theme = useTheme()

  useEffect(() => {
    setToken(localStorage.getItem('lunsjavtale'))
  }, [])

  return (
    <Stack sx={{
      alignSelf: 'center',
      width: { xs: '100%', md: '396px' },
      height: '600px',
      // border: `1px solid lightgray`,
      borderRadius: '16px',
      overflow: 'hidden',
      cursor: 'grab',
    }}>
      <Box sx={{
        width: '100%',
        height: '280px',
        flex: 1,
      }}>
        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          // src={data?.node.attachments.edges[0] ? data?.node.attachments.edges[0].node.fileUrl : '/noImage.'} 
          src={data?.node?.attachments?.edges.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'}
          alt="" />
      </Box>
      <Box sx={{
        bgcolor: 'primary.main',
        p: 2, borderRadius: '16px',
        mt: -2,
        color: '#fff'
      }}>
        {
          (data?.node?.title && !isWeekly) &&
          <Typography sx={{
            fontSize: { xs: '14px', md: '18px' },
            fontWeight: 700,
          }}>
            {data?.node?.title}
          </Typography>
        }
        <Typography sx={{
          fontSize: { xs: '20px', md: '26px' },
          fontWeight: 400,
          lineHeight: '30px',
          fontFamily: 'Forum',
          mb: { xs: 1, md: 1 }
        }}>
          {data?.node?.name?.length > 50 ? data.node.name.substring(0, 50) + '...' : data?.node?.name}
        </Typography>
        <Stack direction='row' gap={1} mb={1} flexWrap='wrap'>
          {
            data?.node?.weeklyVariants?.edges.length > 0 &&
            data?.node?.weeklyVariants?.edges.map((item, id) => (
              <Typography
                key={id}
                sx={{
                  width: 'fit-content',
                  fontSize: '12px',
                  bgcolor: '#fff',
                  color: '#000',
                  px: 1, py: .5, borderRadius: '50px',
                }}>
                {item.node.name}
              </Typography>
            ))
          }
        </Stack>
        <Typography variant='body2' sx={{
          mb: 2,
        }}>
          {data?.node?.description.length > 100 ? data?.node?.description.substring(0, 100) + '...' : data?.node?.description}
        </Typography>

        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <IconButton onClick={toggleDrawer} >
            <Info sx={{ color: '#fff' }} />
          </IconButton>
          <Stack direction='row' gap={1}>
            <Typography sx={{
              flex: 1,
              bgcolor: 'light.main',
              paddingY: '8px',
              borderRadius: '4px',
              textAlign: 'center',
              color: 'black',
              px: 2
            }}>NOK {data?.node?.priceWithTax}</Typography>
            {
              token ?
                <CButton onClick={() => setOpenProductAddDialog(true)} style={{}} variant='contained' color='secondary'>
                  Bestill
                </CButton> :
                <Link to='/login'>
                  <CButton variant='contained' color='secondary'>
                    Bestill
                  </CButton>
                </Link>
            }
          </Stack>
        </Stack>
        {/* food details page */}
        <SlideDrawer openSlideDrawer={openSlideDrawer} toggleDrawer={toggleDrawer}>
          <FoodDetails data={data.node} toggleDrawer={toggleDrawer} />
        </SlideDrawer>
        {/* product add dialog */}
        <CDialog maxWidth='md' openDialog={openProductAddDialog}>
          <AddItem closeDialog={() => setOpenProductAddDialog(false)} maxWidth={'xl'} data={data.node} />
        </CDialog>
      </Box>
    </Stack>
  )
}

export default ProductCard