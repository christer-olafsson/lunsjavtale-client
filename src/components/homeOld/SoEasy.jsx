import { Box, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import CButton from '../../common/CButton/CButton';
import { Link } from 'react-router-dom';
import CDialog from '../../common/dialog/CDialog';
import NewMeetingFromHome from './NewMeetingFromHome';
import { FadeAnimation, SlideAnimation } from '../animation/Animation';


const SoEasy = () => {
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false);

  return (
    <Container sx={{ mt: { xs: 10, md: 10 }, mb: { xs: 0, md: 10 } }} maxWidth='lg'>
      <Stack sx={{ width: '100%' }} gap={{ xs: 8, md: 4 }} direction={{ xs: 'column', lg: 'row' }} alignItems='center' justifyContent='space-between'>

        <Box >
          <Typography sx={{ fontWeight: 800, fontSize: { xs: '32px', md: '58px' } }}>
            <FadeAnimation damping={.1} cascade={'cascade'}>
              Enkelt og effektivt !
            </FadeAnimation>
          </Typography>
          <Divider sx={{ width: '64px', borderBottomWidth: '2px', my: { xs: 1, md: 3 } }} />
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
                <CButton variant='contained' color='secondary' style={{ width: { xs: '100%' }, px: 2, textWrap: 'noWrap' }}>Bli kunde</CButton>
              </Link>
            </SlideAnimation>
            {/* <SlideAnimation direction='up' delay={400}>
              <CButton onClick={() => setMeetingDialogOpen(true)} variant='outlined' style={{ width: '100%' }}>Trenger du møtemat?</CButton>
            </SlideAnimation> */}
          </Stack>
        </Box>
        <Stack direction='row' alignItems='center' gap={2}>
          <Stack gap={2}>
            <SlideAnimation direction='up'>
              <Box sx={{
                width: { xs: '165px', md: '310px' },
                height: { xs: '272px', md: '408px' }
              }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/soeasy1.jpeg" alt="" />
              </Box>
            </SlideAnimation>
            <SlideAnimation direction='down' delay={100}>
              <Box sx={{
                width: { xs: '165px', md: '310px' },
                height: { xs: '78px', md: '117px' }
              }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/soeasy3.jpeg" alt="" />
              </Box>
            </SlideAnimation>
          </Stack>
          <SlideAnimation direction='left' delay={200}>
            <Box sx={{
              width: { xs: '165px', md: '310px' },
              height: { xs: '272px', md: '408px' }
            }}>
              <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/soeasy2.jpeg" alt="" />
            </Box>
          </SlideAnimation>
        </Stack>
        {/* create meeting */}
        <CDialog
          openDialog={meetingDialogOpen}
          maxWidth='sm'
          fullWidth
        >
          <NewMeetingFromHome closeDialog={() => setMeetingDialogOpen(false)} />
        </CDialog>
      </Stack >
    </Container >
  )
}

export default SoEasy