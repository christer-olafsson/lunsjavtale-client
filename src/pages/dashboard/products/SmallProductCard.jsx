/* eslint-disable react/prop-types */
import { Add, ArrowRightAltOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import CDialog from '../../../common/dialog/CDialog'
import AddItem from './AddItem'
import { Link } from 'react-router-dom'

const SmallProductCard = ({ data }) => {
  const [openProductAddDialog, setOpenProductAddDialog] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const handleProductDialogClose = () => {
    setOpenProductAddDialog(false);
  };
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{xs:'start',lg:'center'}} gap={{ xs: 0, md: 2 }} sx={{
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
        <img style={{ width: '100%', height: '100%', borderRadius: '4px', objectFit: 'cover' }}
          src={data?.attachments.edges.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'} alt="" />
      </Box>
      <Stack sx={{ flex: 1 }} justifyContent='space-between'>
        <Stack gap={1} mb={1}>
          <Typography sx={{ fontSize: { xs: '14px', lg: '18px' }, fontWeight: '600' }}>{data?.name}</Typography>
          <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}>{data.description}</Typography>
          <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}> <b><i>Contains: </i></b> <i>{JSON.parse(data.contains)}</i> </Typography>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Link to={`/dashboard/from-products/products/${data.id}`}>
            <Button endIcon={<ArrowRightAltOutlined />}>Details</Button>
          </Link>
          <Box sx={{ display: 'inline-flex', alignSelf: 'flex-end', mt: 1 }}>
            <Box sx={{ padding: '6px 16px', mr: 2, borderRadius: '40px', fontSize: '14px', border: '1px solid gray' }}>
              <Typography sx={{ fontSize: '14px' }}>kr: {data.priceWithTax}</Typography>
            </Box>
            <IconButton
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
      {/* product add dialog */}
      <CDialog fullScreen={isMobile} maxWidth='md' openDialog={openProductAddDialog}>
        <AddItem closeDialog={handleProductDialogClose} maxWidth={'xl'} data={data} />
      </CDialog>
    </Stack>
  )
}

export default SmallProductCard