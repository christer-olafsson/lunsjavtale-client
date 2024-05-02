import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RESET_PASSWORD } from './graphql/mutation';
import { Box, Stack, TextField } from '@mui/material';
import CButton from '../../common/CButton/CButton';
import toast from 'react-hot-toast';

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
      height: '100vh'
    }} alignItems='center' justifyContent='center'>
      <Stack>
        <TextField error={payloadError} onChange={handleInputChange} name='password1' sx={{ mb: 1 }} size='small' placeholder='new password' />
        <TextField error={payloadError} onChange={handleInputChange} name='password2' sx={{ mb: 1 }} size='small' placeholder='confirm password' />
        <CButton isLoading={loading} onClick={handleSubmit} variant='contained' >Submit</CButton>
      </Stack>
    </Stack>
  )
}

export default PassReset