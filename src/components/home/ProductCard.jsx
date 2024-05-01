import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import CButton from '../../common/CButton/CButton'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'

const ProductCard = ({ data }) => {
  // console.log('product card:',data)
  const theme = useTheme()
  return (
    <Stack sx={{
      alignSelf: 'center',
      width: { xs: '100%', md: '396px' },
      p: { xs: '12px', md: '24px' },
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '8px',
      cursor: 'grab'
    }}>
      <Typography sx={{
        fontSize: { xs: '14px', md: '18px' },
        fontWeight: 700,
        color: 'primary.main'
      }}>Todays</Typography>
      <Typography sx={{
        fontSize: { xs: '24px', md: '32px' },
        fontWeight: 600,
        mb: { xs: 1, md: 2 }
      }}>{data?.node?.name}</Typography>
      <Typography sx={{
        mb: 2,
        fontSize: { xs: '14px', md: '16px' }
      }}>{data.node.description}</Typography>
      <Box sx={{
        width: '100%',
        height: '280px',
        mb: 2
      }}>
        <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src={data?.node?.attachments.edges[0].node.fileUrl} alt="" />
      </Box>
      <Typography sx={{
        fontSize: { xs: '12px', md: '14px' }
      }} mb={2} >Topped with leaf salad, pickled carrot & pumpkin seeds. Spicy tahini dressing on the side.</Typography>
      <Box sx={{ display: 'inline-flex', mb: 2 }}>
        <Typography>Contains:</Typography>
        <Typography sx={{ fontSize: '12px', ml: 1 }}>570 Calories, 40g carbohydrate , 31 g fat, 27 grams of protein</Typography>
      </Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
        <CButton variant='contained' color='light' style={{ flex: 1, height: { xs: '45px', md: '56px', fontSize: { xs: '14px', md: '16px' } } }}>
          from 89, per person*
        </CButton>
        <Link to='/search'>
          <CButton style={{ height: { xs: '45px', md: '56px', fontSize: { xs: '14px', md: '16px' } } }} variant='contained' color='secondary'>
            Get Stared
          </CButton>
        </Link>
      </Stack>
    </Stack>
  )
}

export default ProductCard