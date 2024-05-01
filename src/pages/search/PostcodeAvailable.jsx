import { Chat, KeyboardArrowLeft, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Checkbox, Container, FormControlLabel, IconButton, Input, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { CHECk_POST_CODE } from '../../graphql/query'
import LoadingBar from '../../common/loadingBar/LoadingBar'
import { CREATE_VALID_COMPANY, SEND_VERIFICATION_MAIL } from './graphql/mutation'
import CButton from '../../common/CButton/CButton'
import toast from 'react-hot-toast'

const inputStyle = {
  width: '100%',
  padding: '8px 24px',
  border: '1px solid gray',
  borderRadius: '50px', mb: 1.5
}

const PostCodeAvailable = ({ handleAvailabe, postCode }) => {
  const [errors, setErrors] = useState([]);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [regSuccess, setRegSuccess] = useState(null);
  const [disableResendBtn, setDisableResendBtn] = useState(true);
  const [userEmail, setUserEmail] = useState('')
  const [payloadErr, setPayloadErr] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPass: ''
  });
  const [payload, setPayload] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPass: ''
  });

  const [validCreateCompany, { loading, error }] = useMutation(CREATE_VALID_COMPANY, {
    onCompleted: (res) => {
      setRegSuccess(res.validCreateCompany.success)
      toast.success('Registration Success! Please Check email')
      setUserEmail(payload.email)
      setDisableResendBtn(false)
      setPayload({
        company: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPass: ''
      })
      setPayloadErr({})
      setErrors([])
    },
    onError: (err) => {
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const graphqlError = err.graphQLErrors[0];
        const { extensions } = graphqlError;
        if (extensions && extensions.errors) {
          setErrors(Object.values(extensions.errors));
          // const { name, workingEmail, email, contact, password } = extensions.errors;
        }
      }
    }
  });


  const [resendMail, { loading: resendMailLoading }] = useMutation(SEND_VERIFICATION_MAIL, {
    onCompleted: (res) => {
      const { message, success } = res.sendVerificationMail;
      toast.success(message)
      console.log('sendverificationmail:', res)
    },
    onError: (res) => {
      console.log('sendverificationmail:', res)
    }
  });

  const handleResendMail = () => {
    resendMail({
      variables: {
        email: userEmail
      }
    })
    setDisableResendBtn(true)
    setTimeout(() => {
      setDisableResendBtn(false)
    }, 50000);
  }

  const passwordVisibilityHandler = () => setPasswordVisibility(!passwordVisibility);

  const handleSubmit = () => {
    if (!payload.company) {
      setPayloadErr({ ...payloadErr, company: 'Company name required!' });
      return
    }
    if (!payload.name) {
      setPayloadErr({ ...payloadErr, name: 'Name required!' });
      return
    }
    if (!payload.email) {
      setPayloadErr({ ...payloadErr, email: 'Email required!' });
      return
    }
    if (!payload.phone) {
      setPayloadErr({ ...payloadErr, phone: 'Phone number required!' });
      return
    }
    if (!payload.password) {
      setPayloadErr({ ...payloadErr, password: 'Password required!' });
      return
    }
    if (!payload.confirmPass) {
      setPayloadErr({ ...payloadErr, confirmPass: 'Please confirm password!' });
      return
    }
    validCreateCompany({
      variables: {
        input: {
          name: payload.company,
          email: payload.email,
          workingEmail: payload.email,
          contact: payload.phone,
          postCode: parseInt(postCode),
          firstName: payload.name,
          password: payload.confirmPass === payload.password ? payload.password : ''
        }
      }
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value })
    if (name === 'confirmPass') {
      if (value !== payload.password) {
        setPayloadErr({ ...error, confirmPass: 'Password not match!' })
      } else {
        setPayloadErr({ ...payloadErr, confirmPass: '' })
      }
    }
  }


  return (
    <Box sx={{ flex: 1, py: 10 }}>
      {
        regSuccess ?
          <Box >
            <Typography sx={{
              width: '100%',
              padding: '8px 24px',
              bgcolor: 'light.main',
              borderRadius: '8px',
              fontSize: '18px',
              color: 'primary.main'
            }}>Registration Success! please check your inox or spam box and active your account.</Typography>
            <Box sx={{ mt: 1, ml: 3, display: 'inline-flex', alignItems: 'center' }}>
              <Typography >Don't get email?</Typography>
              <Button onClick={handleResendMail} disabled={disableResendBtn}>Click to send again</Button>
            </Box>
          </Box>
          :
          <Typography sx={{
            width: '100%',
            padding: '8px 24px',
            bgcolor: 'primary.main',
            borderRadius: '8px',
            fontSize: '18px',
            color: '#fff'
          }}>
            We  deliver to this postcode yet. But fill in the fields below and we'll see what we can do. 🧑‍🍳
          </Typography>
      }
      <Typography sx={{ fontSize: '24px', fontWeight: '600', my: 3 }}>Create your company account</Typography>

      <Stack gap={2}>
        <Stack direction='row' gap={2}>
          <TextField value={payload.company} helperText={payloadErr.company} error={Boolean(payloadErr.company)} onChange={handleInputChange} name='company' fullWidth label="Name of the company" variant="outlined" />
          <TextField value={payload.name} helperText={payloadErr.name} error={Boolean(payloadErr.name)} onChange={handleInputChange} name='name' fullWidth label="Your name" variant="outlined" />
        </Stack>
        <Stack direction='row' gap={2}>
          <TextField value={payload.email} helperText={payloadErr.email} error={Boolean(payloadErr.email)} onChange={handleInputChange} name='email' fullWidth label="Email" variant="outlined" />
          <TextField value={payload.phone} helperText={payloadErr.phone} type='number' error={Boolean(payloadErr.phone)} onChange={handleInputChange} name='phone' fullWidth label="Phone" variant="outlined" />
        </Stack>
        <TextField
          value={payload.password}
          helperText={payloadErr.password}
          error={Boolean(payloadErr.password)}
          onChange={handleInputChange}
          name='password'
          type={passwordVisibility ? "text" : "password"}
          fullWidth
          label="Password"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={passwordVisibilityHandler}
                  onMouseDown={passwordVisibilityHandler}
                  edge="end"
                >
                  {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField value={payload.confirmPass} helperText={payloadErr.confirmPass} error={Boolean(payloadErr.confirmPass)} onChange={handleInputChange} name='confirmPass' type='password' fullWidth label="Confirm password" variant="outlined" />
        {
          errors.length > 0 &&
          <ul style={{ color: 'red', fontSize: '13px' }}>
            {
              errors.map((err, id) => (
                <li key={id}>{err}</li>
              ))
            }
          </ul>
        }
        <FormControlLabel control={<Checkbox />} label="Remember me" />
      </Stack>

      <Stack direction='row' gap={2} mt={2}>
        <Button onClick={handleAvailabe}>Back</Button>
        <CButton isLoading={loading} disabled={loading} onClick={handleSubmit} variant='contained' color='primary'>Sign up</CButton>
      </Stack>
      <Box sx={{
        display: 'inline-flex', mt: 2
      }}>
        <Typography>Already have a account? </Typography>
        <Link to='/login'>
          <Typography sx={{ fontWeight: 'bold', color: 'primary.main', ml: 1 }}>Sign in here </Typography>
        </Link>
      </Box>
    </Box >
  )
}

export default PostCodeAvailable