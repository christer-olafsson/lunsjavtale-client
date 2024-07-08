import { Box, Container, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
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
    setSocialLinkJson(JSON.parse(clientDetails.socialMediaLinks ?? null))
  }, [clientDetails])


  useEffect(() => {
    setSocialLink({
      facebook: socialLinkJson?.facebook ?? '',
      instagram: socialLinkJson?.instagram ?? '',
      linkedIn: socialLinkJson?.linkedIn ?? ''
    })
  }, [socialLinkJson])


  return (
    <Container sx={{
      // backgroundImage: 'url(/footer.png)',
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      p: 0, position: 'relative',
      height: { xs: '631px', md: '720px' },

    }} maxWidth='xxl'>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/footer.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          // backgroundAttachment:'fixed',
          backgroundPosition: 'center',
          zIndex: -1,
          ":before": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: { xs: '100%', md: '0' },
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }
        }}
      />
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: { xs: 'end', md: 'center' },
        height: '100%',
      }} maxWidth='lg'>
        <SlideAnimation direction='up'>
          <Typography sx={{
            mt: { xs: 0, md: 10 },
            fontSize: { xs: '32px', md: '48px' },
            fontWeight: { xs: 600, md: 800 },
            color: '#fff', textAlign: 'center', mb: 2
          }}>
            Sunn, smakfull og enkel lunsj <br /> kl
            kontoret?
          </Typography>
        </SlideAnimation>
        <Link to='/search'>
          <SlideAnimation direction='up' delay={100}>
            <CButton variant='contained' style={{ height: { xs: '45px', md: '56px' }, mt: 3, width: '128px' }}>
              Kom i gang
            </CButton>
          </SlideAnimation>
        </Link>
        <Box sx={{
          alignSelf: { xs: 'center', md: 'flex-start' },
          color: '#fff',
          mt: { xs: 8, md: 8 },
          textAlign: { xs: 'center', md: 'none' },
          pb: { xs: 10, md: 0 }
        }}>
          <a style={{ textDecoration: 'none' }} href={socialLink?.facebook ?? ''} target='blank'>
            <ListItem>
              <ListItemText sx={{ color: '#fff' }}>Facebook</ListItemText>
              <ListItemIcon><CallMade sx={{ color: '#fff' }} /></ListItemIcon>
            </ListItem>
          </a>
          <a style={{ textDecoration: 'none' }} href={socialLink?.instagram ?? ''} target='blank'>
            <ListItem>
              <ListItemText sx={{ color: '#fff' }}>Instagram</ListItemText>
              <ListItemIcon><CallMade sx={{ color: '#fff' }} /></ListItemIcon>
            </ListItem>
          </a>
          <a style={{ textDecoration: 'none' }} href={socialLink?.linkedIn ?? ''} target='blank'>
            <ListItem>
              <ListItemText sx={{ color: '#fff' }}>LinkedIn</ListItemText>
              <ListItemIcon><CallMade sx={{ color: '#fff' }} /></ListItemIcon>
            </ListItem>
          </a>
          {/* <Typography mt={3}>hei@lunsjavtale.no</Typography> */}
          <Typography mt={3}>{clientDetails?.email}</Typography>
          <Typography>{clientDetails?.contact}</Typography>
          <Typography>{clientDetails?.address}</Typography>
        </Box>
      </Container>
    </Container>
  )
}

export default Footer