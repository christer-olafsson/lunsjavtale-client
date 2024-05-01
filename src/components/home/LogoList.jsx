import { Box, Container, Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import Marquee from 'react-fast-marquee'

const logo = [
  { img: "/Rectangle 4.png" },
  { img: "/Rectangle 5.png" },
  { img: "/Rectangle 6.png" },
  { img: "/Rectangle 7.png" },
  { img: "/Rectangle 8.png" },
  { img: "/Rectangle 9.png" },
  { img: "/Rectangle 10.png" },
]

const LogoList = () => {
  const match = useMediaQuery('(min-width:600px)')

  return (
    <Container maxWidth='xl' sx={{p:0, my: { xs: 5, md: 15 } }}>
      <Marquee autoFill direction='right' gradient={match} speed={20} >
        {
          logo.map((item, i) => (
            <Box key={i} sx={{
              width: { xs: '80px', md: '100px', lg: '160px' },
              mr: { xs: 5, md: 8, lg: 12 }
            }}>
              <img style={{ width: '100%' }} src={item.img} alt="" />
            </Box>
          ))
        }
      </Marquee>
    </Container>
  )
}

export default LogoList