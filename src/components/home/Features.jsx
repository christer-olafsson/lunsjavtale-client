import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'

const data = [
  {
    icon: '/Vector.png',
    bg: '/Frame1.png',
    title: 'Ferske retter daglig',
    desc: 'Enten du har lyst på vegetarianer, solid brød eller et varmt måltid, har menyen vår noe for enhver smak! Nyt nye retter daglig, laget for å være deilige og nærende.'
  },
  {
    icon: '/Vector (1).png',
    bg: '/Frame2.png',
    title: 'Starting at Just NOK 65!',
    desc: 'Nyt fleksibiliteten ved å betale kun for dagene du spiser. Denne tilnærmingen reduserer kostnader og matsvinn, og viser seg smartere enn matpakker og billigere enn kantiner.'
  },
  {
    icon: '/Vector (2).png',
    bg: '/Frame3.png',
    title: 'Behandling av lunsj',
    desc: 'Ansatte kan enkelt bestille og kansellere måltidene sine selvstendig. Velg kostnadsfordeling mellom ansatte og bedrifter for full oversikt og enkel kostnadskontroll.'
  },
]

const Features = () => {
  return (
    <Container maxWidth='lg' sx={{ mt: { xs: 10, md: 15 } }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='center' gap={4}>
        {
          data.map((d, i) => (
            <Box key={i} sx={{
              width: { xs: '100%' },
              position: 'relative',
              border: '1px solid lightgray',
              p: 2.5,
              borderRadius: '16px'
            }}>
              <img style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                width: '200px',
                objectFit: 'contain'
              }} src={d.bg} alt="" />
              <img src={d.icon} alt="" />
              <Typography my={2} sx={{
                fontSize: '32px',
                fontWeight: 400,
                fontFamily: 'Forum'
              }}>{d.title}</Typography>
              <Typography>{d.desc}</Typography>
            </Box>
          ))
        }
      </Stack>
    </Container>
  )
}

export default Features