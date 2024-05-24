/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import CButton from '../../common/CButton/CButton'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'

const ProductCard = ({ data }) => {
  console.log('product card:', data)
  const theme = useTheme()
  return (
    <Stack sx={{
      alignSelf: 'center',
      width: { xs: '100%', md: '396px' },
      p: { xs: '12px', md: '20px' },
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '8px',
      cursor: 'grab'
    }}>
      {
        data.node.title &&
        <Typography sx={{
          fontSize: { xs: '14px', md: '18px' },
          fontWeight: 700,
          color: 'primary.main'
        }}>{data.node.title}</Typography>
      }
      <Typography sx={{
        fontSize: { xs: '20px', md: '26px' },
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
        <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
          // src={data?.node.attachments.edges[0] ? data?.node.attachments.edges[0].node.fileUrl : '/noImage.'} 
          src={data?.node.attachments.edges.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'}
          alt="" />
      </Box>
      {/* <Typography sx={{
        fontSize: { xs: '12px', md: '14px' }
      }} mb={2} >Topped with leaf salad, pickled carrot & pumpkin seeds. Spicy tahini dressing on the side.</Typography> */}
      {
        data.node.contains &&
        <Box sx={{ display: 'inline-flex', mb: 2 }}>
          {/* <Typography>Contains:</Typography> */}
          <Typography sx={{ fontSize: '14px', ml: 1 }}> <b>Contains: </b> <i> {JSON.parse(data.node.contains)}</i> </Typography>
        </Box>
      }
      <Stack direction='row' gap={1}>
        <Typography sx={{ flex: 1, 
          bgcolor: 'light.main',
          paddingY:'8px',
          borderRadius: '4px',
          textAlign:'center',
          color:'black'
          }}>NOK {data.node.priceWithTax}</Typography>
        <Link to='/search'>
          <CButton style={{ }} variant='contained' color='secondary'>
            Get Stared
          </CButton>
        </Link>
      </Stack>
    </Stack>
  )
}

export default ProductCard