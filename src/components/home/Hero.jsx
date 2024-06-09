import { Chat, Close, Menu } from '@mui/icons-material'
import { Box, Button, Container, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import CButton from '../../common/CButton/CButton'
import { Link } from 'react-router-dom'


const Hero = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'));

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <Box id='hero'>
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
            <IconButton onClick={() => setSideBarOpen(!sideBarOpen)} sx={{
              bgcolor: 'primary.main',
              width: '40px',
              height: '40px',
              display: isMobile ? 'block' : 'none',
              position: 'fixed',
              top: 10,
              right: 10,
              color: '#fff',
              zIndex: 9999999,
              ":hover": {
                bgcolor: 'primary.dark',
              }
            }}>
              <Menu />
            </IconButton>
            <Box sx={{
              position: isMobile ? 'fixed' : 'relative',
              transform: isMobile ? (sideBarOpen ? 'translateX(0%)' : 'translateX(-100%)') : 'none',
              // backdropFilter: isMobile ? 'blur(10px)' : 'none',
              backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : 'none',
              top: 0,
              width: isMobile ? '250px' : 'none',
              height: isMobile ? '100vh' : 'none',
              left: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              p: isMobile ? 3 : 0,
              zIndex: 999,
              transition: '.5s ease'
            }}>
              <Button onClick={() => setSideBarOpen(false)} href='#hero'>Home</Button>
              <Button onClick={() => setSideBarOpen(false)} href='#products'>Products</Button>
              <Button onClick={() => setSideBarOpen(false)} href='#faq'>FAQ</Button>
              <Button onClick={() => setSideBarOpen(false)} href='#contact'>Contact</Button>
              <a href="https://vendor.lunsjavtale.no" target='blank' style={{ width: '100%' }}>
                <Button onClick={() => setSideBarOpen(false)} variant='outlined' sx={{ width: '100%', whiteSpace: 'nowrap' }}>Vendor</Button>
              </a>
              {
                token ?
                  <Link style={{ width: '100%' }} to='/dashboard/myside'>
                    <CButton style={{ width: isMobile ? '100%' : 'fit-content' }} variant='contained'>
                      Dashboard
                    </CButton>
                  </Link> :
                  <Link style={{ width: '100%' }} to='/login'>
                    <CButton style={{ width: isMobile ? '100%' : 'fit-content' }} variant='contained'>
                      Logg inn
                    </CButton>
                  </Link>
              }
              <IconButton onClick={() => setSideBarOpen(false)} sx={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}>
                <Close />
              </IconButton>
            </Box>
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
                fontSize: { xs: '32px', md: '68px' },
                fontWeight: 800,
                lineHeight: { xs: '40px', md: '80px' },
              }}>Nytt lunsjkonsept på arbeidsplassen</Typography>
              <Typography sx={{ fontSize: { xs: '14px', md: '18px' }, fontWeight: 200, mb: 1 }}>La ansatte styre sin egen lunsj med bare noen få tastetrykk. Kutt administrasjon, kostnader og matsvinn, samtidig som ansatte får levert akkurat den lunsjen de ønsker.</Typography>

              <Stack direction='row' alignItems='center' gap={2} justifyContent={{ xs: 'center', sm: 'space-around', lg: 'space-between' }}>
                <Stack sx={{
                  width: { xs: '111px', md: '174px' }
                }} direction='row' alignItems='center' gap={1}>
                  <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '42px' } }}>12</Typography>
                  <Typography sx={{ fontWeight: 400, fontSize: { xs: '12px', md: '16px' }, lineHeight: { xs: '18px', md: '24px' } }}>retter å velge mellom hver dag</Typography>
                </Stack>
                <img src="/Line.png" alt="" />
                <Stack sx={{
                  width: { xs: '64px', md: '93px' }
                }} direction='row' alignItems='center' gap={1}>
                  <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '42px' } }}>59</Typography>
                  <Typography sx={{ fontWeight: 400, fontSize: { xs: '12px', md: '16px' }, lineHeight: { xs: '18px', md: '24px' } }}>Fra <br /> NOK</Typography>
                </Stack>
                <img src="/Line.png" alt="" />
                <Typography sx={{
                  width: { xs: '111px', md: '165px  ' },
                  fontWeight: 400, fontSize: { xs: '12px', md: '16px' }, lineHeight: { xs: '18px', md: '24px' }
                }}>Enkel administrasjon for bedriften</Typography>
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
                  }} startIcon={<Chat size='small' />}>Jeg vil begynne nå</Button>
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

      </Container >
    </Box>
  )
}

export default Hero