import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { SlideAnimation } from '../animation/Animation'
import { InstagramEmbed } from 'react-social-media-embed'

const imgContainer = {
  // width: { xs: '100%', md: '320px' },
  flex: { xs: 'none', md: 1 },
  height: { xs: '180px', sm: '220px', md: '420px' },
  position: 'relative'
}

const imgContainerTitle = {
  position: 'absolute',
  top: { xs: '20%', md: 30 }, left: { xs: '50%', md: 30 },
  transform: { xs: 'translateX(-50%)', md: 'none' },
  color: '#fff', letterSpacing: '5px'
}
const imgContainerImg = {
  width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'
}
const imgContainerBtn = {
  position: 'absolute',
  left: { xs: '50%', md: 20 },
  transform: { xs: 'translateX(-50%)', md: 'none' },
  bottom: { xs: '30%', md: 20 },
  // width: '142px',
  bgcolor: '#fff',
  py: { xs: '12px', md: '16px' }, px: { xs: '24px', md: '32px' },
  borderRadius: '8px'
}

const instagramData = [
  'https://www.instagram.com/p/C9FG0npNotp',
  'https://www.instagram.com/p/C9EqAWjoyHY/?img_index=1',
  'https://www.instagram.com/p/C8mCSsDIbJ9/'
]

const InstagramSec = () => {
  return (
    <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'column', my: 10 }}>
      <Box sx={{
        alignSelf: 'center',
        maxWidth: '288px',
        bgcolor: 'light.main',
        py: '12px', px: '24px',
        borderRadius: '8px', mb: 2
      }} >
        <SlideAnimation direction='up'>
          Følg oss på Instagram
        </SlideAnimation>
      </Box>
      <Typography sx={{ fontSize: { xs: '24px', md: '32px' }, fontWeight: 600, alignSelf: 'center', mb: 2 }}>
        <SlideAnimation direction='up' delay={100}>
          Se hva som skjer på noen
        </SlideAnimation>
      </Typography>
      <Typography alignSelf='center' mb={6}>
        <SlideAnimation direction='up' delay={200}>
          lunsjavtale er en digital kantine som gjør lunsjen enklere (og smartere)!
        </SlideAnimation>
      </Typography>
      {/* <Stack direction={{ xs: 'column', md: 'row' }} gap={3} justifyContent='center'>
        <Box sx={imgContainer}>
          <img style={imgContainerImg} src="/insImg1.png" alt="" />
          <Typography sx={imgContainerTitle}>lunsjavtale</Typography>
          <Box sx={imgContainerBtn} >
            Instagram
          </Box>
        </Box>
        <Box sx={imgContainer}>
          <img style={imgContainerImg} src="/insImg2.png" alt="" />
          <Typography sx={imgContainerTitle}>lunsjavtale</Typography>
          <Box sx={imgContainerBtn} >
            Instagram
          </Box>
        </Box>
        <Box sx={{
          // width: { xs: '100%', md: '320px' },
          flex: { xs: 'none', md: 2 },
          height: { xs: '180px', sm: '220px', md: '420px' },
          position: 'relative'
        }}>
          <img style={imgContainerImg} src="/insImg3.png" alt="" />
          <Typography sx={imgContainerTitle}>lunsjavtale</Typography>
          <Box sx={imgContainerBtn} >
            Instagram
          </Box>
        </Box>
      </Stack> */}

      {/* <Stack direction={{ xs: 'column', md: 'row' }} mt={3} gap={3} justifyContent='center'>
        <Box sx={{
          // width: { xs: '100%', md: '320px' },
          flex: { xs: 'none', md: 2 },
          height: { xs: '180px', sm: '220px', md: '420px' },
          position: 'relative'
        }}>
          <img style={imgContainerImg} src="/insImg4.png" alt="" />
          <Typography sx={imgContainerTitle}>lunsjavtale</Typography>
          <Box sx={imgContainerBtn} >
            Instagram
          </Box>
        </Box>
        <Box sx={imgContainer}>
          <img style={imgContainerImg} src="/insImg5.png" alt="" />
          <Typography sx={imgContainerTitle}>lunsjavtale</Typography>
          <Box sx={imgContainerBtn} >
            Instagram
          </Box>
        </Box>
        <Box sx={imgContainer}>
          <img style={imgContainerImg} src="/insImg6.png" alt="" />
          <Typography sx={imgContainerTitle}>lunsjavtale</Typography>
          <Box sx={imgContainerBtn} >
            Instagram
          </Box>
        </Box>
      </Stack> */}
      <Stack direction='row' gap={6} flexWrap='wrap' justifyContent='center'>
        {
          instagramData.map((url, id) => (
            <InstagramEmbed key={id} url={url} width={400} />
          ))
        }
      </Stack>

    </Container>
  )
}

export default InstagramSec