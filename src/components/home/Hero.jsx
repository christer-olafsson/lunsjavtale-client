import { Chat, Close, LocalDiningOutlined, Menu, RestaurantOutlined } from '@mui/icons-material'
import { Box, Button, ClickAwayListener, Container, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import CButton from '../../common/CButton/CButton'
import { Link } from 'react-router-dom'
import { FadeAnimation, SlideAnimation } from '../animation/Animation'
import { CLIENT_DETAILS } from '../../graphql/query'
import { useQuery } from '@apollo/client'


const Hero = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [clientDetails, setClientDetails] = useState({})
  const [token, setToken] = useState(localStorage.getItem('lunsjavtale'));

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))

  useQuery(CLIENT_DETAILS, {
    onCompleted: (res) => {
      setClientDetails(res.clientDetails)
    },
  });

  useEffect(() => {
    setToken(localStorage.getItem('lunsjavtale'))
  }, [])

  return (
    <Box id='hero'>
      <Container maxWidth='xxl'
        sx={{
          position: 'relative',
          p: 0,
          height: { xs: '1044px', md: '900px' },
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${clientDetails?.coverPhotoUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            // filter: 'brightness(0.6)',
            zIndex: -1
          }
        }}>
        <Container maxWidth='lg'>
          <ClickAwayListener onClickAway={() => setSideBarOpen(false)}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' py={2}>
              {/* <Box sx={{ display: { xs: 'none', lg: 'block' } }}></Box> */}
              <Box sx={{
                width: { xs: '150px', md: '300px' }
              }}>
                <img style={{ width: '100%' }} src={clientDetails?.logoUrl ?? ''} alt="" />
              </Box>
              <>
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
                  backgroundColor: isMobile ? 'rgba(255, 255, 255, 1)' : 'none',
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
                  transition: '.5s ease',
                  boxShadow: { xs: 3, md: 'none' }
                }}>
                  <Button onClick={() => setSideBarOpen(false)} href='#hero'>Hjem</Button>
                  <Button onClick={() => setSideBarOpen(false)} href='#products'>Produkter</Button>
                  <Button onClick={() => setSideBarOpen(false)} href='#faq'>FAQ</Button>
                  <Button onClick={() => setSideBarOpen(false)} href='#contact'>Kontakt</Button>
                  {
                    token ?
                      <Link style={{ width: '100%' }} to='/dashboard/mySide'>
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
                    display: isMobile ? 'block' : 'none'
                  }}>
                    <Close />
                  </IconButton>
                </Box>
              </>
            </Stack>
          </ClickAwayListener>

          <Stack sx={{ height: '700px' }} direction={{ xs: 'column', md: 'row' }} alignItems='center' justifyContent='space-between' gap={5}>
            <Stack sx={{
              // flex: 1,
              color: '#fff',
              width: { xs: '100%', md: '50%' },
              justifyContent: 'center'
            }}>
              {/* for stage */}
              {
                import.meta.env.VITE_ENVIRONMENT === 'stage' &&
                <Typography variant='h5' sx={{ fontWeight: 600, mb: 2, color: 'red' }}>(Test Mode)</Typography>
              }
              <Typography variant='h5' sx={{ mt: { xs: 5, md: 0 }, mb: 3 }}>{clientDetails?.slogan}</Typography>
              <Typography sx={{
                fontSize: { xs: '32px', md: '68px' },
                fontWeight: 800,
                lineHeight: { xs: '40px', md: '80px' },
              }}>
                <FadeAnimation damping={.1} delay={100} cascade={'cascade'}>
                  Nytt lunsjkonsept
                </FadeAnimation>
              </Typography>
              <Typography sx={{
                fontSize: { xs: '32px', md: '68px' },
                fontWeight: 800,
                lineHeight: { xs: '40px', md: '80px' },
              }}>
                <FadeAnimation damping={.1} delay={100} cascade={'cascade'}>
                  levert gratis til
                </FadeAnimation>
              </Typography>
              <Typography sx={{
                fontSize: { xs: '32px', md: '68px' },
                fontWeight: 800,
                lineHeight: { xs: '40px', md: '80px' },
                mb: 3
              }}>
                <FadeAnimation damping={.1} delay={1000} cascade={'cascade'}>
                  arbeidsplassen ..
                </FadeAnimation>
              </Typography>
              <SlideAnimation direction='left' delay={500}>

                <Typography sx={{ fontSize: { xs: '14px', md: '18px' }, fontWeight: 200, mb: 3 }}>
                  La ansatte styre sin egen lunsj med bare noen få tastetrykk. Kutt administrasjon, kostnader og matsvinn, samtidig som ansatte får levert akkurat den lunsjen de ønsker.
                </Typography>
              </SlideAnimation>

              <Stack mb={3} direction='row' alignItems='center' gap={3} justifyContent={{ xs: 'center', sm: 'space-around', lg: 'space-between' }}>
                <SlideAnimation delay={100}>
                  <Stack sx={{
                    width: { xs: '111px', md: '174px' }
                  }} direction='row' alignItems='center' gap={1}>
                    {/* <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '42px' } }}>12</Typography> */}
                    <Typography sx={{ fontWeight: 400, fontSize: { xs: '12px', md: '16px' }, lineHeight: { xs: '18px', md: '24px' } }}>Mange retter å velge mellom hver dag</Typography>
                  </Stack>
                </SlideAnimation>
                {/* <SlideAnimation delay={300}>
                  <LocalDiningOutlined fontSize='large'/>
                </SlideAnimation> */}
                <SlideAnimation delay={500}>
                  <Stack sx={{
                    width: { xs: '64px', md: '93px' }
                  }} direction='row' alignItems='center' gap={1}>
                    <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '42px' } }}>25</Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: { xs: '12px', md: '16px' }, lineHeight: { xs: '18px', md: '24px' } }}>Fra <br /> NOK</Typography>
                  </Stack>
                </SlideAnimation>
                {/* <SlideAnimation delay={700}>
                  <RestaurantOutlined fontSize='large'/>
                </SlideAnimation> */}
                <SlideAnimation delay={900}>
                  <Typography sx={{
                    width: { xs: '111px', md: '165px  ' },
                    fontWeight: 400, fontSize: { xs: '12px', md: '16px' }, lineHeight: { xs: '18px', md: '24px' }
                  }}>Enkel administrasjon for bedriften</Typography>
                </SlideAnimation>
              </Stack>

              <SlideAnimation direction='left' delay={500}>
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
              </SlideAnimation>

            </Stack>

            <SlideAnimation direction='right'>
              <Box sx={{
                display: { xs: 'none', lg: 'block' },
                width: { xs: '343px', lg: '400px' },
                height: { xs: '445px', lg: '500px' }
              }}>
                <img style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px'
                }} src="/herosmall.jpeg" alt="" />
              </Box>
            </SlideAnimation>
            <Box sx={{
              display: { xs: 'block', md: 'none' },
              width: { xs: '343px', md: '446px' },
              height: { xs: '445px', md: '569px' }
            }}>
              <SlideAnimation direction='up'>
                <img style={{
                  borderRadius: '10px',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} src="/herosmall.jpeg" alt="" />
              </SlideAnimation>
            </Box>

          </Stack>
        </Container>

      </Container >
    </Box>
  )
}

export default Hero