import { Add, Close } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CDialog from '../../../common/dialog/CDialog';
import AddItem from '../../../components/dashboard/AddItem';

const AddCustomItems = ({ closeDialog }) => {
  const [openProductAddDialog, setOpenProductAddDialog] = useState(false);
  const [openOptionProductAddDialog, setOpenOptionProductAddDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedOptionProductId, setSelectedOptionProductId] = useState(null);

  const handleProductDialogOpen = (id) => {
    setSelectedProductId(id)
    setOpenProductAddDialog(true);
  };
  const handleOptionProductDialogOpen = (id) => {
    setSelectedOptionProductId(id)
    setOpenOptionProductAddDialog(true);
  };
  const handleOptionProductDialogClose = () => {
    setOpenOptionProductAddDialog(false);
  };

  return (
    <Box p={{ xs: 0, md: 2 }}>
      <Stack direction='row' justifyContent='space-between' mb={4}>
        <Typography variant='h5' fontWeight='600'>Add Custom Items</Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>
      <Typography sx={{
        bgcolor: '#52525B',
        padding: '12px 24px',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '5px',
        mb: 2
      }}>Lunch</Typography>
      <Stack sx={{
        height: '370px',
        overflowY: 'auto',
        mb:2
      }} direction='row' flexWrap='wrap' gap={2}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => (
            <>
              <Box key={id} sx={{
                width: { xs: '100%', xl: '48%' },
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, md: 2 },
                border: '1px solid #63883B',
                p: 1,
                borderRadius: '8px'
              }}>
                <img style={{ width: '94px', height: '94px', objectFit: 'cover', borderRadius: '12px' }} src="/insImg5.png" alt="" />
                <Stack gap={1}>
                  <Typography sx={{ fontSize: { xs: '14px', md: '18px' }, fontWeight: '600' }}>The lunch collective's Caesar salad</Typography>
                  <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}>The lunch collective's Caesar salad with crispy bacon, a classic with our own twist.</Typography>
                  <Box sx={{ display: 'inline-flex', alignSelf: 'flex-end' }}>
                    <Box sx={{ padding: '6px 16px', mr: 2, borderRadius: '40px', fontSize: '14px', border: '1px solid gray' }}>
                      <Typography sx={{ fontSize: '14px' }}>$200.00</Typography>
                    </Box>
                    <IconButton onClick={() => handleProductDialogOpen(id)} sx={{
                      bgcolor: 'light.main'
                    }}>
                      <Add fontSize='small' />
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
              {/* product add dialog */}
              {
                selectedProductId === id && (
                  <CDialog openDialog={openProductAddDialog}>
                    <AddItem closeDialog={() => setOpenProductAddDialog(false)} />
                  </CDialog>
                )
              }
            </>
          ))
        }
      </Stack>

      <Typography sx={{
        bgcolor: '#52525B',
        padding: '12px 24px',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '5px',
        mb: 2
      }}>Options</Typography>
      <Stack sx={{
        height: '370px',
        overflowY: 'auto',
      }} direction='row' gap={2} flexWrap='wrap'>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => (
            <>
              <Box key={id} sx={{
                width: { xs: '140px', md: '173px' },
                height: '152px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                gap: 2,
                p: 2.5,
                mb: { xs: 2, md: 0 }
              }}>
                <img style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  position: 'absolute',
                  top: 0, 
                  // zIndex: -1
                }} src="/insImg5.png" alt="" />
                <Stack sx={{
                  bgcolor: 'rgb(0,0,0,10'
                }} gap={1}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#fff', textAlign: 'center' }}>The lunch collective's Caesar salad</Typography>
                  <Box sx={{ display: 'inline-flex', alignSelf: 'flex-end' }}>
                    <Box sx={{
                      py: { xs: '8px', md: '6px' },
                      px: { xs: '8px', md: '16px' },
                      mr: 1,
                      borderRadius: '40px',
                      bgcolor: '#fff',
                      fontSize: '14px',
                      border: '1px solid gray',
                      zIndex:2
                    }}>
                      <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}>$200.00</Typography>
                    </Box>
                    <IconButton onClick={() => handleOptionProductDialogOpen(id)} sx={{
                      bgcolor: 'light.main',
                      ":hover": {
                        bgcolor: 'light.main'
                      }
                    }}>
                      <Add fontSize='small' />
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
              {
                selectedOptionProductId === id && (
                  <CDialog closeDialog={handleOptionProductDialogClose} openDialog={openOptionProductAddDialog}>
                    <AddItem closeDialog={handleOptionProductDialogClose} option={true} />
                  </CDialog>
                )
              }
            </>
          ))
        }
      </Stack>

    </Box>
  )
}

export default AddCustomItems