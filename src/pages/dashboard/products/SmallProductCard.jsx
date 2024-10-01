/* eslint-disable react/prop-types */
import { Add, ArrowRight, ArrowRightAltOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, ListItem, ListItemText, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import CDialog from '../../../common/dialog/CDialog'
import AddItem from './AddItem'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ME } from '../../../graphql/query'
import SlideDrawer from './SlideDrawer'
import FoodDetails from './FoodDetails'

const SmallProductCard = ({ data }) => {
  const [openProductAddDialog, setOpenProductAddDialog] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
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

  const { data: user } = useQuery(ME)

  const handleProductDialogClose = () => {
    setOpenProductAddDialog(false);
  };
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'start', lg: 'center' }} gap={{ xs: 0, md: 2 }} sx={{
      width: '100%',
      maxWidth: '1000px',
      bgcolor: 'light.main',
      p: { xs: 1, lg: 2.5 },
      borderRadius: '8px'
    }}>
      <Box sx={{
        width: { xs: '100%', md: '230px' },
        height: '150px',
      }}>
        <img style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
          src={data?.attachments?.edges?.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'} alt="" />
      </Box>
      <Stack sx={{ width: '100%' }} justifyContent='space-between'>
        <Stack gap={1} mb={1}>
          <Stack direction='row' gap={2} justifyContent='space-between'>
            <Typography sx={{ mt: { xs: 1, md: 0 }, fontSize: { xs: '16px', lg: '18px' }, fontWeight: '600' }}>
              {data?.name.substring(0, 100)}
              {data.name.length > 100 ? '...' : ''}
            </Typography>
            {
              data?.vendor &&
              <Typography sx={{
                fontWeight: '600',
                px: 1,
                color: 'blue',
                // border: '1px solid coral',
                py: .5,
                height: 'fit-content',
                // borderRadius: '4px',
                width: 'fit-content',
                fontSize: '14px'
              }}>
                Supplier: <br />{data?.vendor?.name}
              </Typography>
            }
          </Stack>
          <Typography sx={{ fontSize: '13px', width: 'fit-content', fontWeight: 500, border: '1px solid lightgray', borderRadius: '4px', px: 1 }}><i>{data?.category?.name ? data?.category?.name : 'Uncategorised'}</i> </Typography>

          <Typography variant='body2'>
            {data.description.substring(0, 200)}
            {data.description.length > 200 ? '...' : ''}
          </Typography>
          <Stack direction='row' flexWrap='wrap' gap={1}>
            {
              data?.weeklyVariants.edges.length > 0 &&
              data?.weeklyVariants.edges.map((item, id) => (
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
        </Stack>
        <Stack sx={{ width: '100%' }} direction='row' alignItems='center' justifyContent='space-between' gap={2}>
          <Button onClick={toggleDrawer} endIcon={<ArrowRight />} >Details</Button>
          <Box sx={{ display: 'inline-flex', alignSelf: 'flex-end', mt: 1 }}>
            <Box sx={{ padding: '6px 16px', mr: 2, borderRadius: '40px', fontSize: '14px', border: '1px solid gray' }}>
              <Typography sx={{ fontSize: '14px' }}>kr:  <b>{data.priceWithTax}</b></Typography>
            </Box>
            <IconButton
              disabled={user?.me.company.isBlocked}
              color='primary'
              onClick={() => setOpenProductAddDialog(true)}
              sx={{
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
        <AddItem closeDialog={handleProductDialogClose} maxWidth={'xl'} data={data} />
      </CDialog>
    </Stack>
  )
}

export default SmallProductCard