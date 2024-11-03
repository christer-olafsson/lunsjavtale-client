import { Box, Container, List, ListItem, ListItemIcon, ListItemText, Stack, Typography, useMediaQuery } from '@mui/material'
import CButton from '../../common/CButton/CButton';
import { Link } from 'react-router-dom';
import { FadeAnimation, SlideAnimation } from '../animation/Animation';
import { ArrowOutward } from '@mui/icons-material';


const SoEasy = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))

  return (
    <Container sx={{ mt: { xs: 10, md: 15 } }} maxWidth='lg'>
      <Stack direction='row'>

        <Stack justifyContent='center' sx={{
          bgcolor: 'primary.main',
          color: '#fff',
          p: { xs: 5, md: 10 },
          // borderRadius: !isMobile ? '16px 0 0 16px' : '',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: isMobile ? '16px' : 0,
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: isMobile ? '16px' : 0,
        }} flex={1} >
          <Typography sx={{
            fontWeight: 400,
            fontFamily: 'Forum',
            mb: 3,
            fontSize: { xs: '32px', md: '60px' }
          }}>
            <FadeAnimation damping={.1} cascade={'cascade'}>
              Enkelt og effektivt !
            </FadeAnimation>
          </Typography>
          <List>
            {[
              "Med våre tjenester kan du enkelt administrere dine lunsjbestillinger.",
              "Få tilgang til et bredt utvalg av lunsjmåltider for dine ansatte.",
              "Bestill lunsj på nettet på et øyeblikk.",
              "Vi tilbyr også et enkelt grensesnitt for administrering av deres matbestillinger.",
              "All mat laget fra bunn av med de beste råvarer tilgjengelig.",
            ].map((text, index) => (
              <SlideAnimation key={index} direction='up' cascade>
                <ListItem sx={{ mb: { xs: 1, md: 1 } }} disablePadding>
                  <ListItemIcon><img src="/ok.png" alt="" /></ListItemIcon>
                  <ListItemText sx={{ ml: -3 }}>
                    <Typography sx={{ fontSize: { xs: '14px', md: '18px' } }}>{text}</Typography>
                  </ListItemText>
                </ListItem>
              </SlideAnimation>
            ))}
          </List>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 3 }}>
            <SlideAnimation direction='up' delay={200}>
              <Link to='/search'>
                <CButton endIcon={<ArrowOutward />} variant='outlined' color='white' style={{ width: { xs: '100%' }, px: 2, mt: 2, textWrap: 'noWrap' }}>Bli kunde</CButton>
              </Link>
            </SlideAnimation>
          </Stack>
        </Stack>
        <Box flex={1} sx={{
          display: { xs: 'none', md: 'block' },
          height: '700px'
        }}>
          <img style={{ borderRadius: '0 16px 16px 0', width: '100%', height: '100%', objectFit: 'cover', }} src="/soeasy2.jpeg" alt="" />
        </Box>
      </Stack >
    </Container >
  )
}

export default SoEasy