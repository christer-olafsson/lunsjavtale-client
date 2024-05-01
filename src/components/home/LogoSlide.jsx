import { Box, Container, Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import Marquee from 'react-fast-marquee'

const logo = [
  { img: '/Container.png' },
  { img: '/Container (1).png' },
  { img: '/Container (2).png' },
  { img: '/Container (3).png' },
]

const LogoSlide = () => {
  const match = useMediaQuery('(min-width:600px)')
  return (
    <Container maxWidth='xxl' sx={{ p:0 }}>
      <Marquee autoFill gradient={match}>
        {
          logo.map((d,i) => (
            <Stack sx={{
              border: '1px solid gray',
              mr: 5,
              py: {xs:'8px',md:'12px'},
              px:'24px',
              borderRadius:'50px',
              width: {xs:'154px',md:'228px'}
            }} key={i}>
              <img style={{width:'100%', marginRight: '30px' }}  src={d.img} alt="" />
            </Stack>
          ))
        }
      </Marquee>
    </Container>
  )
}

export default LogoSlide