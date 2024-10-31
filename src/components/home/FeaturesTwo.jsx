import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'

const data = [
  {
    icon: '/featuresTwo1.png',
    title: 'Integrated Climate Reporting',
  },
  {
    icon: '/featuresTwo2.png',
    title: 'Zero food waste',
  },
  {
    icon: '/featuresTwo3.png',
    title: 'UN Climate Compliant',
  },
]

const FeaturesTwo = () => {
  return (
    <Container maxWidth='lg' sx={{ mt: { xs: 10, md: 15 } }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='center' gap={4}>
        {
          data.map((d, i) => (
            <Stack key={i} sx={{
              width: { xs: '100%' },
              // height: '300px',
              position: 'relative',
              bgcolor: '#63883B14',
              p: 3,
              borderRadius: '16px'
            }}>
              <img style={{ width: '100%', height: '200px', objectFit: 'contain' }} src={d.icon} alt="" />
              <Typography mt={2} sx={{
                textAlign: 'center',
                fontSize: '25px',
                fontWeight: 400,
                fontFamily: 'Forum'
              }}>{d.title}</Typography>
            </Stack>
          ))
        }
      </Stack>
    </Container>
  )
}

export default FeaturesTwo