import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RESET_PASSWORD } from './graphql/mutation';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import CButton from '../../common/CButton/CButton';
import toast from 'react-hot-toast';
import { HomeOutlined } from '@mui/icons-material';
// import bg from '../../../public/passresetbg'

const PassReset = () => {
  const [payload, setPayload] = useState({ password1: '', password2: '' });
  const [payloadError, setPayloadError] = useState(false);
  const [passNotMatch, setPassNotMatch] = useState()

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const navigate = useNavigate()

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD, {
    onCompleted: (res) => {
      toast.success(res.resetPassword.message);
      navigate('/login')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  function handleInputChange(e) {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    if (!payload.password1 || !payload.password2) {
      setPayloadError(true)
      return
    }
    if (email && token) {
      resetPassword({
        variables: {
          email,
          token,
          password1: payload.password1,
          password2: payload.password2
        }
      })
    }
  }



  return (
    <Stack sx={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), 
        url(/resetpassbg.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        // filter: 'brightness(0.6)',
        zIndex: -1
      }
    }} alignItems='center' justifyContent='center'>
      <Stack alignItems='center' sx={{
        px: 5,
        py: 3,
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '8px'
      }}>
        <Link to='/' style={{
          position: 'absolute',
          left: 20,
          top: 20
        }}>
          <IconButton>
            <HomeOutlined />
          </IconButton>
        </Link>
        <Box sx={{
          width: '150px',
          mb: 2,
        }}>
          <img width='100%' src="/Logo.svg" alt="" />
        </Box>
        <Typography variant='h5' pb={2}>Tilbakestill passord</Typography>
        <TextField
          error={payloadError}
          onChange={handleInputChange}
          name='password1'
          sx={{ mb: 1, width: '300px' }}
          label='Nytt passord'
          placeholder='Nytt passord'
        />
        <TextField
          error={payloadError}
          onChange={handleInputChange}
          name='password2'
          sx={{ mb: 1, width: '300px' }}
          label='Bekreft nytt passord'
          placeholder='Bekreft nytt passord'
        />
        <CButton style={{ width: '100%' }} isLoading={loading} onClick={handleSubmit} variant='contained' >Send inn</CButton>
      </Stack>
    </Stack>
  )
}

export default PassReset