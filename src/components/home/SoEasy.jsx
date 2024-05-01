import { Box, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import CButton from '../../common/CButton/CButton';
import { Link } from 'react-router-dom';

const SoEasy = () => {
  return (
    <Container sx={{ my: { xs: 5, md: 10 } }} maxWidth='lg'>
      <Stack sx={{ width: '100%' }} gap={{ xs: 8, md: 4 }} direction={{ xs: 'column', lg: 'row' }} alignItems='center' justifyContent='space-between'>

        <Box >
          <Typography sx={{ fontWeight: 800, fontSize: { xs: '32px', md: '58px' } }}>So easy!</Typography>
          <Divider sx={{ width: '64px', borderBottomWidth: '2px', my: { xs: 1, md: 3 } }} />
          <List>
            {
              [1, 2, 3, 4, 5].map((_, id) => (
                <ListItem sx={{ mb: { xs: 1, md: 2 } }} disablePadding key={id}>
                  <ListItemIcon><img src="/ok.png" alt="" /></ListItemIcon>
                  <ListItemText sx={{ ml: -3 }}>
                    <Typography sx={{ fontSize: { xs: '14px', md: '18px' } }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                  </ListItemText>
                </ListItem>
              ))
            }
          </List>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 3 }}>
            <Link to='/search'>
              <CButton variant='contained' color='secondary' style={{ width: { xs: '100%', md: '119px' }, textWrap: 'noWrap' }}>Get Started</CButton>
            </Link>
            <Link to='/search'>
              <CButton variant='outlined' style={{ width:'100%' }}>Do you need meeting food?</CButton>
            </Link>
          </Stack>
        </Box>
        <Stack direction='row' alignItems='center' gap={2}>
          <Stack gap={2}>
            <Box sx={{
              width: { xs: '165px', md: '310px' },
              height: { xs: '272px', md: '408px' }
            }}>
              <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/Rectangle 1.png" alt="" />
            </Box>
            <Box sx={{
              width: { xs: '165px', md: '310px' },
              height: { xs: '78px', md: '117px' }
            }}>
              <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/Rectangle 3.png" alt="" />
            </Box>
          </Stack>
          <Box sx={{
            width: { xs: '165px', md: '310px' },
            height: { xs: '272px', md: '408px' }
          }}>
            <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/Rectangle 2.png" alt="" />
          </Box>
        </Stack>

      </Stack>
    </Container>
  )
}

export default SoEasy