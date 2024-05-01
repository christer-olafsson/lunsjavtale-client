import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../common/CButton/CButton'
import { MoreVert } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import CDialog from '../../common/dialog/CDialog'
import AddItem from './AddItem'
import { Link } from 'react-router-dom'

const MiniCart = ({path}) => {
  const [openProductEditDialog, setOpenProductEditDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);


  const handleProductDialogOpen = (id) => {
    setSelectedProductId(id)
    setOpenProductEditDialog(true);
  };
  const handleProductDialogClose = () => {
    setOpenProductEditDialog(false);
  };

  const theme = useTheme()
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      border: `1px solid ${theme.palette.primary.main}`,
      p: '15px 15px 55px',
      borderRadius: '8px',
      bgcolor: 'light.main',
      position: 'relative'
    }} mt={5}>

      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={1}>
        <Typography sx={{ fontSize: '17px', fontWeight: '600' }}>Shopping Cart</Typography>
        <Link to={path}>
          <Button variant='contained'>
            Place Order
          </Button>
        </Link>
      </Stack>

      <Stack sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        p: 1.5, borderRadius: '8px'
      }} direction='row' mt={1} alignItems='center'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img style={{
            width: '70px',
            height: '70px',
            objectFit: 'cover',
            borderRadius: '8px',
          }} src="/insImg3.png" alt="" />
          <Typography sx={{ fontSize: '14px' }} mr={4}>The lunch collective's Caesar salad</Typography>
        </Box>
        <Box>
          <Typography>1 Piece</Typography>
          <Typography sx={{ textWrap: 'nowrap' }}>NOK 150</Typography>
        </Box>
        <IconButton onClick={handleProductDialogOpen}>
          <MoreVert />
        </IconButton>
      </Stack>
      <Stack sx={{
        p: 1.5, borderRadius: '8px',
        bgcolor: '#fff'
      }} direction='row' mt={1} alignItems='center'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img style={{
            width: '70px',
            height: '70px',
            objectFit: 'cover',
            borderRadius: '8px',
          }} src="/insImg3.png" alt="" />
          <Typography sx={{ fontSize: '14px' }} mr={4}>The lunch collective's Caesar salad</Typography>
        </Box>
        <Box>
          <Typography>1 Piece</Typography>
          <Typography sx={{ textWrap: 'nowrap' }}>NOK 150</Typography>
        </Box>
        <IconButton onClick={handleProductDialogOpen}>
          <MoreVert />
        </IconButton>
      </Stack>
      <CDialog openDialog={openProductEditDialog}>
        <AddItem closeDialog={handleProductDialogClose} />
      </CDialog>
      <Box sx={{
        alignSelf: 'center',
        border: `1px solid ${theme.palette.primary.main}`,
        p: '12px 24px',
        borderRadius: '50px',
        position: 'absolute',
        bottom: '-25px',
        bgcolor: 'light.main'
      }}>
        <Typography>Total : NOK 456</Typography>
      </Box>
    </Box>
  )
}

export default MiniCart