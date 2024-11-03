import { Button, ClickAwayListener, IconButton, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { CLIENT_DETAILS } from '../../graphql/query';
import { Box, Stack } from '@mui/system';
import { ArrowOutward, Close, Menu } from '@mui/icons-material';
import CButton from '../../common/CButton/CButton';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const Navbar = () => {
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
            <Button sx={{ color: !isMobile ? '#fff' : '' }} onClick={() => setSideBarOpen(false)} href='#Meny'>Meny</Button>
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
  )
}

export default Navbar