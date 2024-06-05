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

const PostCodeAvailable = ({ handleAvailabe, postCode }) => {
  const [errors, setErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [regSuccess, setRegSuccess] = useState(null);
  const [disableResendBtn, setDisableResendBtn] = useState(true);
  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState({ password: '', confirmPassword: '' })
  const [payload, setPayload] = useState({
    name: '',
    firstName: '',
    email: '',
    contact: '',
  });

  const [validCreateCompany, { loading }] = useMutation(CREATE_VALID_COMPANY, {
    onCompleted: (res) => {
      setRegSuccess(res.validCreateCompany.success)
      toast.success('Registration Success! Please Check email')
      setUserEmail(payload.email)
      setDisableResendBtn(false)
      setPayload({
        name: '',
        firstName: '',
        email: '',
        contact: '',
      })
      setErrors([])
    },
    onError: (err) => {
      toast.error(err.message)
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const graphqlError = err.graphQLErrors[0];
        const { extensions } = graphqlError;
        if (extensions && extensions.errors) {
          setErrors(extensions.errors);
        }
      }
    }
  });


  const [resendMail, { loading: resendMailLoading }] = useMutation(SEND_VERIFICATION_MAIL, {
    onCompleted: (res) => {
      const { message } = res.sendVerificationMail;
      toast.success(message)
    },
    onError: (res) => {
      toast.error(res.message)
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value })
  }

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value })
  }

  const passwordVisibilityHandler = () => setPasswordVisibility(!passwordVisibility);

  const handleSubmit = () => {
    if (!payload.name) {
      setErrors({ name: 'Company name required!' });
      return
    }
    if (!payload.firstName) {
      setErrors({ firstName: 'Name required!' });
      return
    }
    if (!payload.email) {
      setErrors({ email: 'Email required!' });
      return
    }
    if (!payload.contact) {
      setErrors({ contact: 'Contact number required!' });
      return
    }
    if (!password.password) {
      setErrors({ password: 'Password required!' });
      return
    }
    if (!password.confirmPassword) {
      setErrors({ confirmPassword: 'Confirm password required!' });
      return
    }
    if (password.password !== password.confirmPassword) {
      setErrors({ confirmPassword: 'Password Not Match!' });
      return
    }
    validCreateCompany({
      variables: {
        input: {
          name: payload.name,
          email: payload.email,
          workingEmail: payload.email,
          contact: payload.contact,
          postCode: parseInt(postCode),
          firstName: payload.firstName,
          password: password.confirmPassword
        }
      }
    })
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
            }}>Registration Success! please check your inbox or spam box and active your account.</Typography>
            <Box sx={{ mt: 1, ml: 3, display: 'inline-flex', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '14px' }}>Don't get email?</Typography>
              <Button onClick={handleResendMail} disabled={disableResendBtn}>Click to send again</Button>
            </Box>
          </Box>
          :
          <Box>
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
            <Typography sx={{ fontSize: '24px', fontWeight: '600', my: 3 }}>Create your company account</Typography>

            <Stack gap={2}>
              <Stack direction='row' gap={2}>
                <TextField
                  value={payload.name}
                  helperText={errors.name}
                  error={Boolean(errors.name)}
                  onChange={handleInputChange}
                  name='name'
                  fullWidth
                  label="Name of the company"
                  variant="outlined"
                />
                <TextField value={payload.firstName}
                  helperText={errors.firstName}
                  error={Boolean(errors.firstName)}
                  onChange={handleInputChange}
                  name='firstName'
                  fullWidth
                  label="Your name"
                  variant="outlined"
                />
              </Stack>
              <Stack direction='row' gap={2}>
                <TextField
                  value={payload.email}
                  helperText={errors.email}
                  error={Boolean(errors.email)}
                  onChange={handleInputChange}
                  name='email'
                  fullWidth
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  value={payload.contact}
                  helperText={errors.contact}
                  type='number'
                  error={Boolean(errors.contact)}
                  onChange={handleInputChange}
                  name='contact'
                  fullWidth
                  label="Phone"
                  variant="outlined"
                />
              </Stack>
              <TextField
                value={password.password}
                helperText={errors.password}
                error={Boolean(errors.password)}
                onChange={handlePasswordInputChange}
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
              <TextField
                value={password.confirmPassword}
                helperText={errors.confirmPassword}
                error={Boolean(errors.confirmPassword)}
                onChange={handlePasswordInputChange}
                name='confirmPassword'
                type={passwordVisibility ? "text" : "password"}
                fullWidth
                label="Confirm Password"
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
              {/* <TextField value={payload.confirmPass} helperText={payloadErr.confirmPass} error={Boolean(payloadErr.confirmPass)} onChange={handleInputChange} name='confirmPass' type='password' fullWidth label="Confirm password" variant="outlined" /> */}
              <FormControlLabel control={<Checkbox />} label="Remember me" />
            </Stack>

            <Stack direction='row' gap={2} mt={2}>
              <Button onClick={handleAvailabe}>Back</Button>
              <CButton isLoading={loading} disabled={loading} onClick={handleSubmit} variant='contained' color='primary'>Sign up</CButton>
            </Stack>
            <Box sx={{
              display: 'inline-flex', mt: 2
            }}>
            </Box>
          </Box>
      }
      <Stack direction='row' sx={{ mt: 2 }}>
        <Typography>Already have a account? </Typography>
        <Link to='/login'>
          <Typography sx={{ fontWeight: 'bold', color: 'primary.main', ml: 1 }}>Sign in here </Typography>
        </Link>
      </Stack>
    </Box >
  )
}

export default PostCodeAvailable