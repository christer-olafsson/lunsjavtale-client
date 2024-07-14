import { Box, Button, Container, Input, Stack, Typography } from '@mui/material'
import React from 'react'
import CButton from '../../common/CButton/CButton'
import { Link } from 'react-router-dom'
import { SlideAnimation } from '../animation/Animation'

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
            <SlideAnimation direction='left'>
              <Typography sx={smTitle}>01. Lag en pofil</Typography>
            </SlideAnimation>
            <SlideAnimation direction='left' delay={100}>
              <Typography mb={3} sx={bigTitle}>Registrer bedriften din på få minutter</Typography>
            </SlideAnimation>
            <SlideAnimation direction='left' delay={200}>
              <Typography mb={3}>Våre standardkategorier er faste gjennom hele året, men selve retten endres daglig. Det betyr at hvis du velger salat, får du en ny salat hver dag!</Typography>
            </SlideAnimation>
            <SlideAnimation direction='left' delay={300}>
              <Link to='/search'>
                <CButton variant='outlined' style={{ height: { xs: '37px', md: '56px' }, width: '150px' }}>
                  Bli kunde
                </CButton>
              </Link>
            </SlideAnimation>
          </Box>
          <Box sx={{
            flex: 1,
            maxWidth: '560px'
          }}>
            <SlideAnimation direction='right'>
              <img style={{ width: '100%', height: '100%', borderRadius: '30px' }} src="/signupart.jpg" alt="" />
            </SlideAnimation>
          </Box>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center' mb={10} gap={{ xs: 5, md: 10 }}>
          <Box sx={{
            flex: 1,
            // width: '560px'
          }}>
            <SlideAnimation direction='left'>
              <img style={{ width: '100%' }} src="/image 6.png" alt="" />
            </SlideAnimation>
          </Box>
          <Box sx={{
            flex: 1
          }}>
            <SlideAnimation direction='right'>
              <Typography sx={smTitle}>02. Inviter ansatte</Typography>
            </SlideAnimation>
            <SlideAnimation direction='right' delay={100}>
              <Typography sx={bigTitle} mb={3}>Det er like raskt å ombord 2 som 200 ansatte</Typography>
            </SlideAnimation>
            <SlideAnimation direction='right' delay={200}>
              <Typography mb={3}>Vi vet hvor viktig det er både for den som administrerer og den som skal få noe nytt «kastet» på seg at det ikke føles som en «belastning». Vi har laget et system som gjør at uansett hvor stor eller liten bedriften din er, er det like enkelt å komme i gang.</Typography>
            </SlideAnimation>
            <SlideAnimation direction='right' delay={300}>
              <Link to='/search'>
                <CButton variant='outlined' style={{ height: { xs: '37px', md: '56px' }, width: '150px' }}>
                  Bli kunde
                </CButton>
              </Link>
            </SlideAnimation>
          </Box>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center' gap={{ xs: 5, md: 10 }}>
          <Box sx={{
            flex: 1
          }}>
            <SlideAnimation direction='left'>
              <Typography sx={smTitle}>03. Levering</Typography>
            </SlideAnimation>
            <SlideAnimation direction='left' delay={100}>
              <Typography sx={bigTitle} mb={3}>Stressfri og solid arbeidslunsj levert på kontoret</Typography>
            </SlideAnimation>
            <SlideAnimation direction='left' delay={200}>
              <Typography mb={2}>Alle ansatte får en stressfri og god lunsj som er god for kroppen, levert på døra innen kl 11:15 hver dag. </Typography>
            </SlideAnimation>
            <SlideAnimation direction='left' delay={300}>
              <Typography mb={3}>Bedriften sparer tid på administrasjon og får en fleksibel lunsjordning, hvor du selvfølgelig ikke betaler for lunsj de dagene som er avlyst. Ha en fin lunsj!</Typography>
            </SlideAnimation>
            <SlideAnimation direction='left' delay={400}>
              <Link to='/search'>
                <CButton variant='outlined' style={{ height: { xs: '37px', md: '56px' }, width: '150px' }}>
                  Bli kunde
                </CButton>
              </Link>
            </SlideAnimation>
          </Box>
          <Box sx={{
            flex: 1,
            // width: '560px'
          }}>
            <SlideAnimation direction='right'>
              <img style={{ width: '100%' }} src="/image 6434.png" alt="" />
            </SlideAnimation>
          </Box>
        </Stack>

      </Container>
    </Container>
  )
}

export default CreateProfile