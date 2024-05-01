import { Box, Button, Container, Input, Stack, Typography } from '@mui/material'
import React from 'react'
import CButton from '../../common/CButton/CButton'
import { Link } from 'react-router-dom'

const smTitle = {
  fontSize: { xs: '16px', md: '18px' },
  fontWeight: 700,
  color: 'primary.main'
}
const bigTitle = {
  fontSize: { xs: '24px', md: '32px' },
  fontWeight: { xs: 500, md: 600 }
}


const CreateProfile = () => {
  return (
    <Container maxWidth='xxl' sx={{ bgcolor: 'light.main' }}>
      <Container maxWidth='lg' sx={{ py: '40px', px: 0 }}>

        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} mb={10} gap={{ xs: 5, md: 10 }} justifyContent='space-between' alignItems='center'>
          <Box sx={{
            flex: 1,
            maxWidth: '582px'
          }}>
            <Typography sx={smTitle}>01. Create a pofile</Typography>
            <Typography mb={3} sx={bigTitle}>Register your company in minutes</Typography>
            <Typography mb={3}>Our standard categories are fixed throughout the year, but the dish itself changes daily. This means that if you choose salad, you will receive a new salad every day!</Typography>
            <Link to='/search'>
              <CButton variant='outlined' style={{ height: { xs: '37px', md: '56px' }, width: '150px' }}>
                Let&apos;s try
              </CButton>
            </Link>
          </Box>
          <Box sx={{
            flex: 1,
            maxWidth: '560px'
          }}>
            <img style={{width:'100%',height:'100%',borderRadius:'30px'}} src="/signupart.jpg" alt="" />
            {/* <Stack sx={{
              position: 'relative',
              width: { xs: '100%', md: '490px' },
              height: '459px',
              backgroundImage: 'url(/GroupAll.png)',
              backgroundPosition: 'center',
              backgroundSize: 'contain'
            }} justifyContent='center' alignItems='center'>
              <Stack sx={{
                bgcolor: '#B3CAFF',
                width: '279px',
                height: '300px',
                borderRadius: '10px',
                mt: '50px'
              }} justifyContent='center' alignItems='center' gap={1.5}>
                <Typography>Sign up</Typography>
                <Input disableUnderline sx={{ bgcolor: '#fff', width: '188px', px: 1, fontSize: '13px' }} type='text' placeholder='First Name' />
                <Input disableUnderline sx={{ bgcolor: '#fff', width: '188px', px: 1, fontSize: '13px' }} type='text' placeholder='Last Name' />
                <Input disableUnderline sx={{ bgcolor: '#fff', width: '188px', px: 1, fontSize: '13px' }} type='email' placeholder='Email' />
                <Input disableUnderline sx={{ bgcolor: '#fff', width: '188px', px: 1, fontSize: '13px' }} type='password' placeholder='Password' />
                <Stack direction='row' alignItems='center'>
                  <Typography sx={{ fontSize: '12px' }}>Already a member?</Typography>
                  <Link to='/login'>
                    <button style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>Login</button>
                  </Link>
                </Stack>
                <Button variant="contained" sx={{ width: '188px', height: '32px', bgcolor: '#407BFF', borderRadius: '0px', mb: 2 }}>
                  Register
                </Button>
              </Stack>
              <Box sx={{
                position: 'absolute',
                right: { xs: -20, md: 0 },
                top: '20px',
                width: '67px',
                height: '73px'
              }}>
                <img style={{
                  width: '100%',
                  height: '100%'
                }} src="/Group (2).png" alt="" />
              </Box>
              <Box sx={{
                position: 'absolute',
                left: { xs: 0, md: '30px' },
                bottom: '20px',
                width: '81px',
                height: '141px'
              }}>
                <img style={{
                  width: '100%',
                  height: '100%'
                }} src="/Group (3).png" alt="" />
              </Box>
              <Box sx={{
                position: 'absolute',
                right: { xs: -20, md: 0 },
                bottom: { xs: 60, md: 0 },
                width: { xs: '140px', md: '172px' },
                height: { xs: '300px', md: '366px' }
              }}>
                <img style={{
                  width: '100%',
                  height: '100%'
                }} src="/Group.png" alt="" />
              </Box>
            </Stack> */}
          </Box>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center' mb={10} gap={{ xs: 5, md: 10 }}>
          <Box sx={{
            flex: 1,
            // width: '560px'
          }}>
            <img style={{ width: '100%' }} src="/image 6.png" alt="" />
          </Box>
          <Box sx={{
            flex: 1
          }}>
            <Typography sx={smTitle}>02. Invite employees</Typography>
            <Typography sx={bigTitle} mb={3}>It is just as quick to onboard 2 as 200 employees</Typography>
            <Typography mb={3}>We know how important it is both for the person who administers and the person who will have something new &quot;thrown&quot; at them that it does not feel like a &quot;burden&quot;. We have created a system that means that, no matter how big or small your company is, it is just as easy to get started.</Typography>
            <Link to='/search'>
              <CButton variant='outlined' style={{ height: { xs: '37px', md: '56px' }, width: '150px' }}>
                Get Started
              </CButton>
            </Link>
          </Box>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center' gap={{ xs: 5, md: 10 }}>
          <Box sx={{
            flex: 1
          }}>
            <Typography sx={smTitle}>03. Delivery</Typography>
            <Typography sx={bigTitle} mb={3}>Stress-free and hearty work lunch delivered to the office</Typography>
            <Typography mb={2}>All employees receive a stress-free and good lunch that is good for the body, delivered to the door by 11:15 every day. </Typography>
            <Typography mb={3}>The company saves time on administration and gets a flexible lunch arrangement, where you of course do not pay for lunch on the days that are cancelled. Have a good lunch!</Typography>
            <Link to='/search'>
              <CButton variant='outlined' style={{ height: { xs: '37px', md: '56px' }, width: '150px' }}>
                Order Now
              </CButton>
            </Link>
          </Box>
          <Box sx={{
            flex: 1,
            // width: '560px'
          }}>
            <img style={{ width: '100%' }} src="/image 6434.png" alt="" />
          </Box>
        </Stack>

      </Container>
    </Container>
  )
}

export default CreateProfile