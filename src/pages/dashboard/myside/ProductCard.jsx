import { Add } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CDialog from '../../../common/dialog/CDialog';
import AddItem from '../../../components/dashboard/AddItem';

const ProductCard = ({ item }) => {
  const [openProductAddDialog, setOpenProductAddDialog] = useState(false);
 
  return (
    <Box sx={{
      // width:'100%',
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 1, md: 2 },
      border: '1px solid #63883B',
      p: { xs: 1, lg: 2.5 },
      borderRadius: '8px'
    }}>
      <img style={{ width: '94px', height: '94px', objectFit: 'cover', borderRadius: '12px' }} src={item.node.attachments.edges[0].node.fileUrl} alt="" />
      <Stack gap={1}>
        <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>{item.node?.name}</Typography>
        <Typography sx={{ fontSize: '14px' }}>{item.node?.description}</Typography>
        <Box sx={{ display: 'inline-flex', alignSelf: 'flex-end' }}>
          <Box sx={{ padding: '6px 16px', mr: 2, borderRadius: '40px', fontSize: '14px', border: '1px solid gray' }}>
            <Typography sx={{ fontSize: '14px' }}>$200.00</Typography>
          </Box>
          <IconButton onClick={() => setOpenProductAddDialog(true)} sx={{
            bgcolor: 'light.main'
          }}>
            <Add fontSize='small' />
          </IconButton>
        </Box>
        <CDialog openDialog={openProductAddDialog}>
          <AddItem closeDialog={()=> setOpenProductAddDialog(false)} maxWidth={'xl'} data={item} />
        </CDialog>
      </Stack>
    </Box>
  )
}

export default ProductCard