/* eslint-disable react/prop-types */
import { Add, ArrowRightAltOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import CDialog from '../../../common/dialog/CDialog';
import AddItem from '../products/AddItem';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useQuery } from '@apollo/client';
import { ME } from '../../../graphql/query';

const ProductCard = ({ data }) => {
  const [openProductAddDialog, setOpenProductAddDialog] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { data: user } = useQuery(ME)

  const theme = useTheme()
  return (

    <Stack direction={{ xs: 'column', lg: 'row' }} gap={{ xs: 0, lg: 2 }} sx={{
      width: '100%',
      maxWidth: '1000px',
      bgcolor: 'light.main',
      p: { xs: 1, lg: 2.5 },
      borderRadius: '8px',
      border: `1px solid ${theme.palette.primary.main}`
    }}>
      <Box sx={{
        width: { xs: '100%', lg: '230px' },
        height: '150px',
      }}>
        <img style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
          src={data?.attachments.edges.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'} alt="" />
      </Box>
      <Stack sx={{ flex: 1 }} justifyContent='space-between'>
        <Stack gap={1} mb={1} mt={{ xs: 1, lg: 0 }}>
          <Typography sx={{ fontSize: { xs: '14px', lg: '18px' }, fontWeight: '600' }}>{data?.name}</Typography>
          <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}>{data.description}</Typography>
          <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}> <b><i>Contains: </i></b> <i>{JSON.parse(data.contains)}</i> </Typography>
        </Stack>
        <Stack direction='row' alignItems='center' gap={2} justifyContent='space-between'>
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
          <Link to={`/dashboard/from-myside/products/${data.id}`}>
            Details
          </Link>
        </Stack>
      </Stack>
      {/* product add dialog */}
      <CDialog fullScreen={isMobile} maxWidth='md' openDialog={openProductAddDialog}>
        <AddItem closeDialog={() => setOpenProductAddDialog(false)} maxWidth={'xl'} data={data} />
      </CDialog>
    </Stack>
  )
}

export default ProductCard