import { ArrowRightAlt, Chat, Close, KeyboardBackspace } from '@mui/icons-material'
import { Box, Button, Container, Dialog, DialogActions, IconButton, Input, Slide, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CButton from '../../common/CButton/CButton'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { CHECk_POST_CODE } from '../../graphql/query'
import LoadingBar from '../../common/loadingBar/LoadingBar'
import Search from '../../pages/search/Search'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


const Hero = () => {

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <Container maxWidth='xxl' sx={{
      backgroundImage: 'url(/BG.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      p: 0,
      height: { xs: '1044px', md: '900px' }
    }}>
      <Container maxWidth='lg'>
        <Stack direction='row' alignItems='center' justifyContent='space-between' py={2}>
          {/* <Box sx={{ display: { xs: 'none', lg: 'block' } }}></Box> */}
          <Box sx={{
            width: { xs: '150px', md: '300px' }
          }}>
            <img style={{ width: '100%' }} src="/logo.gif" alt="" />
          </Box>
          {
            token ?
              <Link to='/dashboard/myside'>
                <CButton variant='contained' endIcon={<ArrowRightAlt />} style={{ fontSize: { xs: '14px', md: '16px' }, height: { xs: '37px', md: '56px     ' } }}>
                  Dashboard
                </CButton>
              </Link> :
              <Link to='/login'>
                <CButton variant='contained' endIcon={<ArrowRightAlt />} style={{ fontSize: { xs: '14px', md: '16px' }, width: { xs: '104px', md: '136px' }, height: { xs: '37px', md: '56px     ' } }}>
                  Sign In
                </CButton>
              </Link>
          }
        </Stack>

        <Stack sx={{ height: '700px' }} direction={{ xs: 'column', md: 'row' }} alignItems='center' justifyContent='space-between' gap={5}>
          <Stack sx={{
            // flex: 1,
            color: '#fff',
            width: { xs: '100%', md: '50%' },
            gap: { xs: 3, md: 3 },
            justifyContent: 'center'
          }}>
            <Typography sx={{
              mt: { xs: 5, md: 0 },
              fontSize: { xs: '32px', md: '58px' },
              fontWeight: 800,
              lineHeight: {xs:'40px',md:'57.6px'}
            }}>The next generation <br /> of work lunches</Typography>
            <Typography sx={{ fontSize: { xs: '14px', md: '18px' }, fontWeight: 200, mb: 1 }}>Let employees manage their own lunch with just a few keystrokes. Cut administration, costs and food waste, while employees are delivered exactly the lunch they want.</Typography>

            <Stack direction='row' alignItems='center' gap={2} justifyContent={{ xs: 'center', sm: 'space-around', lg: 'space-between' }}>
              <Stack sx={{
                width: { xs: '111px', md: '174px' }
              }} direction='row' alignItems='center' gap={1}>
                <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '42px' } }}>12</Typography>
                <Typography sx={{ fontWeight: 400, fontSize: { xs: '12px', md: '16px' }, lineHeight: { xs: '18px', md: '24px' } }}>dishes to choose from every day</Typography>
              </Stack>
              <img src="/Line.png" alt="" />
              <Stack sx={{
                width: { xs: '64px', md: '93px' }
              }} direction='row' alignItems='center' gap={1}>
                <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '42px' } }}>59</Typography>
                <Typography sx={{ fontWeight: 400, fontSize: { xs: '12px', md: '16px' }, lineHeight: { xs: '18px', md: '24px' } }}>From <br /> NOK</Typography>
              </Stack>
              <img src="/Line.png" alt="" />
              <Typography sx={{
                width: { xs: '111px', md: '165px  ' },
                fontWeight: 400, fontSize: { xs: '12px', md: '16px' }, lineHeight: { xs: '18px', md: '24px' }
              }}>Simple administration for the company</Typography>
            </Stack>

            <Stack direction='row' sx={{
              alignSelf: { xs: 'start', md: 'start' },
              // bgcolor: '#fff',
              // width: '100%',
              height: { xs: '40px', md: '56px' },
              justifyContent: 'space-between',
              borderRadius: '40px',
              // pl: { xs: 1.5, md: 2 },
            }}>
              {/* <Input autoFocus={inputdetect} disableUnderline sx={{
                border: 'none', outline: 'none',
                flex: 1, fontSize: { xs: '11px', sm: '13px', md: '15px' }, borderRadius: '38px'
              }} type="number" placeholder="Your company's postcode" value={postcode} onChange={e => setPostcode(e.target.value)} /> */}
              <Link to='/search'>
                <Button variant='contained' size='small' sx={{
                  textWrap: 'nowrap',
                  fontWeight: 500,
                  fontSize: { xs: '14px', sm: '15px', md: '16px' },
                  borderRadius: '38px',
                  px: { xs: 3, md: 5 },
                  py: { xs: 1, md: 2 }
                }} startIcon={<Chat size='small' />}>I want to start now</Button>
              </Link>
            </Stack>

          </Stack>
          <Box sx={{
            display: { xs: 'none', md: 'block' },
            width: { xs: '343px', lg: '446px' },
            height: { xs: '445px', lg: '569px' }
          }}>
            <img style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} src="/Illustration.png" alt="" />
          </Box>
          <Box sx={{
            display: { xs: 'block', md: 'none' },
            width: { xs: '343px', md: '446px' },
            height: { xs: '445px', md: '569px' }
          }}>
            <img style={{
              borderRadius: '10px',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} src="/Illustration1.png" alt="" />
          </Box>
        </Stack>
      </Container>

    </Container>
  )
}

export default Hero