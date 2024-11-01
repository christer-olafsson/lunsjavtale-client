import { Box, Container, Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import Marquee from 'react-fast-marquee'
import { SlideAnimation } from '../animation/Animation'

const logo = [
  { img: '/gastronomen.svg' },
  // { img: '/Container (1).png' },
  // { img: '/Container (2).png' },
  // { img: '/Container (3).png' },
]

const LogoSlide = () => {
  const match = useMediaQuery('(min-width:600px)')
  return (
    <Container maxWidth='xxl' sx={{ p: 0, mt: { xs: 10, md: 20 } }}>
      <Marquee autoFill gradient={match}>
        {
          logo.map((d, i) => (
            <SlideAnimation key={i} direction='up' delay={200 * i}>
              <Stack sx={{
                border: '1px solid gray',
                mr: 5,
                py: { xs: '8px', md: '12px' },
                px: '24px',
                borderRadius: '50px',
                width: { xs: '154px', md: '228px' }
              }}>
                <img style={{ width: '100%', marginRight: '30px' }} src={d.img} alt="" />
              </Stack>
            </SlideAnimation>
          ))
        }
      </Marquee>
    </Container>
  )
}

export default LogoSlide