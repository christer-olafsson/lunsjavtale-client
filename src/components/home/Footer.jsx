import { Box, Container, Divider, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CButton from '../../common/CButton/CButton'
import { Link } from 'react-router-dom'
import { SlideAnimation } from '../animation/Animation'
import { CLIENT_DETAILS } from '../../graphql/query'
import { useQuery } from '@apollo/client'
import { CallMade } from '@mui/icons-material'

const Footer = () => {
  const [clientDetails, setClientDetails] = useState({})
  const [socialLinkJson, setSocialLinkJson] = useState({})
  const [socialLink, setSocialLink] = useState({
    facebook: '',
    instagram: '',
    linkedIn: ''
  })


  useQuery(CLIENT_DETAILS, {
    onCompleted: (res) => {
      setClientDetails(res.clientDetails)
    },
  });

  useEffect(() => {
    setSocialLinkJson(JSON.parse(clientDetails?.socialMediaLinks ?? null))
  }, [clientDetails])


  useEffect(() => {
    setSocialLink({
      facebook: socialLinkJson?.facebook ?? '',
      instagram: socialLinkJson?.instagram ?? '',
      linkedIn: socialLinkJson?.linkedIn ?? '',
      youtube: socialLinkJson?.youtube ?? ''
    })
  }, [socialLinkJson])


  return (
    <Container sx={{
      bgcolor: '#021611',
      p: 0, position: 'relative',

    }} maxWidth='xxl'>
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: { xs: 'end', md: 'center' },
        height: '100%',
        pb: 10
      }} maxWidth='lg'>
        <SlideAnimation direction='up'>
          <Box sx={{
            width: { xs: '100px', md: '200px' },
            mt: 5,
            mb: 2
          }}>
            <img style={{ width: '100%' }} src={clientDetails?.logoUrl ?? ''} alt="" />
          </Box>
        </SlideAnimation>
        <SlideAnimation direction='up' delay={200}>
          <Typography sx={{
            mt: { xs: 0, md: 2 },
            fontFamily: 'Forum',
            lineHeight: { xs: '50px', md: '70px' },
            fontSize: { xs: '44px', md: '64px' },
            color: '#fff', textAlign: 'center', mb: 2
          }}>
            Friske råvarer, gode smaker, gratis <br /> levering i Follo.
          </Typography>
        </SlideAnimation>
        <Link to='/search'>
          <SlideAnimation direction='up' delay={100}>
            <CButton variant='contained' style={{ mt: 3 }}>
              Kom i gang
            </CButton>
          </SlideAnimation>
        </Link>
        <Box sx={(theme) => ({ borderBottom: `1px solid ${theme.palette.primary.main}`, my: 6, width: '100%' })} />
        <Stack gap={4} direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' sx={{
          color: '#fff',
          width: '100%',
        }}>

          <Box flex={1} sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontFamily: 'Forum', fontSize: '32px' }}>Kontakt oss</Typography>
            <Typography >{clientDetails?.email}</Typography>
            <Typography>{clientDetails?.contact}</Typography>
          </Box>

          <Box flex={1} sx={{ textAlign: 'center', maxWidth: { xs: '100%', md: '200px' } }}>
            <Typography sx={{ fontFamily: 'Forum', fontSize: '32px' }}>Vår adresse</Typography>
            <Typography >{clientDetails?.address}</Typography>
          </Box>

          <Stack gap={1} flex={1} sx={{ textAlign: 'center' }} >
            <Typography sx={{ fontFamily: 'Forum', fontSize: '32px' }}>Besøk oss på</Typography>
            {
              socialLink?.facebook &&
              <a style={{ textDecoration: 'none', color: '#fff' }} href={socialLink?.facebook ?? ''} target='blank'>
                <Typography>Facebook</Typography>
              </a>
            }
            {
              socialLink?.instagram &&
              <a style={{ textDecoration: 'none', color: '#fff' }} href={socialLink?.instagram ?? ''} target='blank'>
                <Typography>Instagram</Typography>
              </a>
            }
            {
              socialLink?.linkedIn &&
              <a style={{ textDecoration: 'none', color: '#fff' }} href={socialLink?.linkedIn ?? ''} target='blank'>
                <Typography>LinkedIn</Typography>
              </a>
            }
            {
              socialLink?.youtube &&
              <a style={{ textDecoration: 'none', color: '#fff' }} href={socialLink?.youtube ?? ''} target='blank'>
                <Typography>Youtube</Typography>
              </a>
            }
          </Stack>

        </Stack>
      </Container>
    </Container>
  )
}

export default Footer