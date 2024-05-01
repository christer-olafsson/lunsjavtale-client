import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { EMAIL_VERIFY } from './graphql/mutation'
import { Button, Stack, Typography } from '@mui/material'
import { Check } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import CButton from '../../common/CButton/CButton'

const EmailVerification = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token');

  const theme = useTheme()

  const [emailVerify, { loading, data, error }] = useMutation(EMAIL_VERIFY);

  console.log('data', data)

  function handleVerify() {
    emailVerify({
      variables: {
        token: token
      }
    })
  }

  return (
    <Stack sx={{
      width: '100%',
      height: '100vh'
    }} alignItems='center' justifyContent='center'>
      {
        !data?.emailVerify?.success &&
        <CButton isLoading={loading} disable={loading} onClick={handleVerify} variant='contained'>Click to verify</CButton>
      }
      {
        error && <Typography sx={{ color: 'red', mt: 1 }}>{error?.message}</Typography>
      }
      {

        data?.emailVerify?.success &&
        <Stack gap={2} alignItems='center' justifyContent='center'>
          <Stack sx={{
            border: `2px solid ${theme.palette.primary.main}`,
            width: '100px',
            height: '100px',
            borderRadius: '50%'
          }} alignItems='center' justifyContent='center'>
            <Check sx={{ fontSize: '50px', color: 'primary.main' }} />
          </Stack>
          <Typography variant='h2'>Email Verified</Typography>
          <Typography>{data?.emailVerify?.message}</Typography>
          <Link to='/login'>
            <Button variant='contained'>Back to login</Button>
          </Link>
        </Stack>
      }
    </Stack>
  )
}

export default EmailVerification