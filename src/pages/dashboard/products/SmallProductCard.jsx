/* eslint-disable react/prop-types */
import { Add } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CDialog from '../../../common/dialog/CDialog'
import AddItem from '../../../components/dashboard/AddItem'

const SmallProductCard = ({ data }) => {
  const [openProductAddDialog, setOpenProductAddDialog] = useState(false);

  const handleProductDialogClose = () => {
    setOpenProductAddDialog(false);
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth:'1000px',
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 1, md: 2 },
      bgcolor: 'light.main',
      p: { xs: 1, lg: 2.5 },
      borderRadius: '8px'
    }}>
      <img style={{ width: '238px', height: '148px', objectFit: 'cover', borderRadius: '4px' }} src={data?.node?.attachments.edges[0].node.fileUrl} alt="" />
      <Stack gap={1}>
        <Typography sx={{ fontSize: { xs: '14px', lg: '18px' }, fontWeight: '600' }}>{data?.node?.name}</Typography>
        <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}>{data.node.description}</Typography>
        <Box sx={{ display: 'inline-flex', alignSelf: 'flex-end', mt: 1 }}>
          <Box sx={{ padding: '6px 16px', mr: 2, borderRadius: '40px', fontSize: '14px', border: '1px solid gray' }}>
            <Typography sx={{ fontSize: '14px' }}>${data.node.price}</Typography>
          </Box>
          <IconButton
            onClick={() => setOpenProductAddDialog(true)}
            sx={{
              bgcolor: 'light.main'
            }}>
            <Add fontSize='small' />
          </IconButton>
        </Box>
      </Stack>
      {/* product add dialog */}
      <CDialog openDialog={openProductAddDialog}>
        <AddItem closeDialog={handleProductDialogClose} maxWidth={'xl'} data={data} />
      </CDialog>
    </Box>
  )
}

export default SmallProductCard