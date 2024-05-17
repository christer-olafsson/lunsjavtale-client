import { useQuery } from '@apollo/client'
import { Box, Container, Stack, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'
import { SUPPORTED_BRANDS } from '../../graphql/query'
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg'
import Loader from '../../common/loader/Index'

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
          loading ? <Loader /> : error ? <ErrorMsg /> :
            brands.map((item, i) => (
              <Box key={i} sx={{
                width: { xs: '80px', md: '100px', lg: '160px' },
                mr: { xs: 5, md: 8, lg: 12 },
                cursor: 'pointer',
              }}>
                <a href={item.node.siteUrl} target='blank'>
                  <img style={{ width: '100%' }} src={item.node.logoUrl} alt="" />
                </a>
              </Box>
            ))
        }
      </Marquee>
    </Container>
  )
}

export default LogoList