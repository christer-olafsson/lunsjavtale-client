import { ArrowOutward, Chat, Close, LocalDiningOutlined, Menu, RestaurantOutlined } from '@mui/icons-material'
import { Box, Button, ClickAwayListener, Container, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import CButton from '../../common/CButton/CButton'
import { Link } from 'react-router-dom'
import { FadeAnimation, SlideAnimation } from '../animation/Animation'
import { CLIENT_DETAILS } from '../../graphql/query'
import { useQuery } from '@apollo/client'
import Navbar from './Navbar'


const Hero = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [clientDetails, setClientDetails] = useState({})
  const [token, setToken] = useState(localStorage.getItem('lunsjavtale'));

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  useQuery(CLIENT_DETAILS, {
    onCompleted: (res) => {
      setClientDetails(res.clientDetails)
    },
  });

  useEffect(() => {
    setToken(localStorage.getItem('lunsjavtale'))
  }, [])

  return (
    <Box id='Hjem'
    //  pb={{ xs: 10, md: 25 }}
    >
      <Box
        sx={{
          position: 'relative',
          p: 0,
          // height: '150vh',
          '::before': {
            // height: { xs: '780px', sm: '800px', md: '1100px', lg: '1200px', xl: '1300px' },
            height: '97%',
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .7), rgba(0, 0, 0, .1)), url(${clientDetails?.coverPhotoUrl})`,
            // backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${clientDetails?.coverPhotoUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // backgroundAttachment: 'fixed',
            // filter: 'brightness(0.6)',
            zIndex: -1,
          }
        }}>
        <Container maxWidth='lg'>
          {/* //navbar */}
          <Navbar />

          <Stack alignItems='center' justifyContent='space-between' gap={5}>
            <Stack sx={{
              // flex: 1,
              color: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* {
                import.meta.env.VITE_ENVIRONMENT === 'stage' &&
                <Typography variant='h5' sx={{ fontWeight: 600, mb: 2, color: 'red', textAlign: 'center' }}>(Test Mode)</Typography>
              } */}
              <SlideAnimation direction='up'>
                <Typography variant='h5' sx={{ mb: 3, textAlign: 'center' }}>{clientDetails?.slogan}</Typography>
              </SlideAnimation>
              <SlideAnimation direction='up' delay={200}>
                <Typography sx={{
                  fontSize: { xs: '50px', sm: '80px', md: '120px' },
                  fontWeight: 400,
                  fontFamily: "Forum",
                  lineHeight: { xs: '60px', sm: '80px', md: '120px', lg: '130px' },
                }}>
                  Nytt Lunsjkonsept Levert <br style={{ display: isMobile ? 'none' : 'block' }} /> Gratis til Arbeidsplassen..
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
          </Stack>
        </Container>



        <Box sx={{ mt: 10 }}>
          <Stack direction="row" alignItems="flex-end">
            {/* Left Box */}
            <Box
              flex={2}
              sx={{
                bgcolor: '#fff',
                height: {
                  xs: 'calc((80vw / 16) * 9.2 / 2)',
                  sm: 'calc((60vw / 16) * 9.2 / 2)',
                  md: 'calc((750px / 16) * 9.2 / 2)',
                  lg: 'calc((900px / 16) * 9.2 / 2)',
                },
                borderTopRightRadius: { xs: '20px', md: '26px' },
              }}
            />

            {/* Center Box with iframe */}
            <Box
              flex={5}
              sx={{
                bgcolor: '#000',
                p: { xs: 1.5, md: 2, lg: 2.5 },
                borderRadius: { xs: '20px', md: '26px' },
                overflow: 'hidden',
                minWidth: '300px',
                height: 'auto',
                aspectRatio: '16/9.2',
              }}
            >
              <iframe
                style={{
                  borderRadius: '20px',
                  width: '100%',
                  height: '100%',
                }}
                src={`https://www.youtube.com/embed/${'https://www.youtube.com/watch?v=M93NSz5bcIk'.split('v=')[1].split('&')[0]}?autoplay=1&mute=1&loop=1&playlist=M93NSz5bcIk&modestbranding=1&controls=0&rel=0&showinfo=0&disablekb=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </Box>

            {/* Right Box */}
            <Box
              flex={2}
              sx={{
                bgcolor: '#fff',
                height: {
                  xs: 'calc((80vw / 16) * 9.2 / 2)',
                  sm: 'calc((60vw / 16) * 9.2 / 2)',
                  md: 'calc((750px / 16) * 9.2 / 2)',
                  lg: 'calc((900px / 16) * 9.2 / 2)',
                },
                borderTopLeftRadius: { xs: '20px', md: '26px' },
              }}
            />
          </Stack>
        </Box>



      </Box >

    </Box>
  )
}

export default Hero