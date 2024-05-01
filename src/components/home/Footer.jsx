import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import CButton from '../../common/CButton/CButton'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Container sx={{
      // backgroundImage: 'url(/footer.png)',
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      p: 0, position: 'relative',
      height: { xs: '631px', md: '720px' },

    }} maxWidth='xxl'>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/footer.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          // backgroundAttachment:'fixed',
          backgroundPosition: 'center',
          zIndex: -1,
          ":before": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: { xs: '100%', md: '0' },
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }
        }}
      />
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: { xs: 'end', md: 'center' },
        height: '100%',
      }} maxWidth='lg'>
        <Typography sx={{
          mt: { xs: 0, md: 10 },
          fontSize: { xs: '32px', md: '48px' },
          fontWeight: { xs: 600, md: 800 },
          color: '#fff', textAlign: 'center', mb: 2
        }}>Healthy, tasty and simple lunch at <br /> the office?</Typography>
        <Link to='/search'>
          <CButton variant='contained' style={{ height: { xs: '45px', md: '56px' }, mt: 3, width: '128px' }}>
            Get Started
          </CButton>
        </Link>
        <Box sx={{
          alignSelf: { xs: 'center', md: 'flex-start' },
          color: '#fff',
          mt: { xs: 8, md: 8 },
          textAlign: { xs: 'center', md: 'none' },
          pb: { xs: 10, md: 0 }
        }}>
          <Typography>Facebook</Typography>
          <Typography>Instagram</Typography>
          <Typography>LinkedIn</Typography>
          <Typography mt={3}>hei@lunsjavtale.no</Typography>
          <Typography>+ 47 729 09 005</Typography>
        </Box>
      </Container>
    </Container>
  )
}

export default Footer