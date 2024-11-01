import { ArrowOutward, Chat, Close, LocalDiningOutlined, Menu, RestaurantOutlined } from '@mui/icons-material'
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
    <Box id='Hjem' pb={{ xs: 10, md: 25 }}>
      <Box maxWidth='xxl'
        sx={{
          position: 'relative',
          p: 0,
          // height: { xs: '1044px', md: '900px' },
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
                  <Button sx={{ color: !isMobile ? '#fff' : '' }} onClick={() => setSideBarOpen(false)} href='#Hjem'>Hjem</Button>
                  <Button sx={{ color: !isMobile ? '#fff' : '' }} onClick={() => setSideBarOpen(false)} href='#Ukentlig'>Ukentlig</Button>
                  <Button sx={{ color: !isMobile ? '#fff' : '' }} onClick={() => setSideBarOpen(false)} href='#Produkter'>Produkter</Button>
                  {/* <Button onClick={() => setSideBarOpen(false)} href='#faq'>FAQ</Button> */}
                  <Button sx={{ color: !isMobile ? '#fff' : '' }} onClick={() => setSideBarOpen(false)} href='#Kontakt'>Kontakt</Button>
                  {
                    token ?
                      <Link style={{ width: '100%' }} to='/dashboard/mySide'>
                        <CButton endIcon={<ArrowOutward />} style={{ width: isMobile ? '100%' : 'fit-content' }} variant='contained'>
                          Dashboard
                        </CButton>
                      </Link> :
                      <Link style={{ width: '100%' }} to='/login'>
                        <CButton endIcon={<ArrowOutward />} style={{ width: isMobile ? '100%' : 'fit-content' }} variant='contained'>
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

          <Stack alignItems='center' justifyContent='space-between' gap={5}>
            <Stack sx={{
              // flex: 1,
              color: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {
                import.meta.env.VITE_ENVIRONMENT === 'stage' &&
                <Typography variant='h5' sx={{ fontWeight: 600, mb: 2, color: 'red', textAlign: 'center' }}>(Test Mode)</Typography>
              }
              <SlideAnimation direction='up'>
                <Typography variant='h5' sx={{ mb: 3, textAlign: 'center' }}>{clientDetails?.slogan}</Typography>
              </SlideAnimation>
              <SlideAnimation direction='up' delay={200}>
                <Typography sx={{
                  fontSize: { xs: '50px', md: '100px' },
                  fontWeight: 600,
                  fontFamily: "Forum",
                  lineHeight: { xs: '50px', md: '100px' },
                }}>
                  Nytt lunsjkonsept levert <br style={{ display: isMobile ? 'none' : 'block' }} /> gratis til arbeidsplassen ..
                </Typography>
              </SlideAnimation>
              <SlideAnimation direction='up' delay={400}>
                <Typography sx={{ fontSize: { xs: '14px', md: '18px' }, maxWidth: '800px', fontWeight: 200, my: 5, textAlign: 'center' }}>
                  La ansatte styre sin egen lunsj med bare noen få tastetrykk. Kutt administrasjon, kostnader og matsvinn, samtidig som ansatte får levert akkurat den lunsjen de ønsker.
                </Typography>
              </SlideAnimation>

              <SlideAnimation direction='up' delay={600}>
                <Stack direction='row' sx={{
                  alignSelf: { xs: 'start', md: 'start' },
                  // bgcolor: '#fff',
                  // width: '100%',
                  height: { xs: '40px', md: '56px' },
                  justifyContent: 'space-between',
                  borderRadius: '40px',
                  // pl: { xs: 1.5, md: 2 },
                }}>
                  <Link to='/search'>
                    <Button variant='contained' size='large' sx={{
                      textWrap: 'nowrap',
                      bgcolor: '#fff',
                      color: 'primary.main',
                      fontWeight: 500,
                      // px: { xs: 3, md: 5 },
                      // py: { xs: 1, md: 2 }
                    }} endIcon={<ArrowOutward />}>Jeg vil begynne nå</Button>
                  </Link>
                </Stack>
              </SlideAnimation>

            </Stack>
            <SlideAnimation direction='up' delay={800}>

              <Box
                sx={{
                  position: 'relative',
                  mb: { xs: -13, sm: -20, md: -27 },
                  borderRadius: '15px',
                  overflow: 'hidden',
                  width: { xs: '100%', md: '750px' },
                  minWidth: '300px',
                  height: 'auto',
                  aspectRatio: '16/9',
                }}
              >
                <iframe
                  style={{
                    borderRadius: '15px',
                    width: '100%',
                    height: '100%',
                  }}
                  src={`https://www.youtube.com/embed/${'https://www.youtube.com/watch?v=M93NSz5bcIk'.split('v=')[1].split('&')[0]}?autoplay=1&mute=1&loop=1&playlist=M93NSz5bcIk&modestbranding=1&controls=0&rel=0&showinfo=0&disablekb=1`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </Box>
            </SlideAnimation>

          </Stack>
        </Container>

      </Box >
    </Box>
  )
}

export default Hero