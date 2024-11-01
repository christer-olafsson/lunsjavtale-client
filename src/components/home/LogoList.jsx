import { useQuery } from '@apollo/client'
import { Box, Container, Stack, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'
import { SUPPORTED_BRANDS } from '../../graphql/query'
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg'
import Loader from '../../common/loader/Index'
import { SlideAnimation } from '../animation/Animation'

const LogoList = () => {
  const match = useMediaQuery('(min-width:600px)')
  const [brands, setBrands] = useState([])


  const { loading, error } = useQuery(SUPPORTED_BRANDS, {
    onCompleted: (res) => {
      setBrands(res.supportedBrands.edges)
    }
  });

  return (
    <Container maxWidth='xl' sx={{ p: 0, my: { xs: 5, md: 15 } }}>
      <Marquee autoFill direction='right' gradient={match} speed={20} >
        {
          brands?.map((item, i) => (
            <SlideAnimation key={i} direction='up' delay={200 * i}>
              <Box sx={{
                width: { xs: '80px', md: '150px', lg: '200px' },
                mr: { xs: 5, md: 8, lg: 12 },
                cursor: 'pointer',
              }}>
                <a href={item.node.siteUrl} target='blank'>
                  <img style={{ width: '100%', objectFit: 'contain' }} src={item.node.logoUrl} alt="" />
                </a>
              </Box>
            </SlideAnimation>
          ))
        }
      </Marquee>
    </Container>
  )
}

export default LogoList