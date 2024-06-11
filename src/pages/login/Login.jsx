/* eslint-disable react/prop-types */
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CButton from '../../common/CButton/CButton'
import { Link, useNavigate } from 'react-router-dom'
import { Google, KeyboardArrowLeft, Visibility, VisibilityOff } from '@mui/icons-material';
import Carousel from 'react-multi-carousel';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_USER, PASSWORD_RESET } from './graphql/mutation';
import toast from 'react-hot-toast';
import { SEND_VERIFICATION_MAIL } from '../search/graphql/mutation';
import { PROMOTIONS } from '../../graphql/query';
import Loader from '../../common/loader/Index';
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg';


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1278 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1074, min: 700 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1
  }
};

const SlideItem = ({ data }) => {

  return (
    <Stack sx={{ maxWidth: '521px' }}>
      <Box sx={{
        width: { xs: '100%', md: '521px' },
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <Box sx={{
          width: '100%',
          height: '250px',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <img style={{ width: '100%', height: '100%', borderRadius: '8px' }}
            src={data?.node?.photoUrl ? data?.node?.photoUrl : '/noImage.png'} alt="" />
        </Box>
      </Box>
      <Typography sx={{ fontSize: { xs: '18px', md: '32px' }, fontWeight: 700, mt: { xs: 1, md: 2 }, textAlign: 'center' }}>{data.node.title}</Typography>
      <Typography sx={{ fontSize: '14px', fontWeight: 400, mt: { xs: 1, md: 3 }, textAlign: 'center' }}>{data.node.description}</Typography>
    </Stack>
  )
}

const Login = (props) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [forgotePassSecOpen, setForgotePassSecOpen] = useState(false);
  const [payload, setPayload] = useState({ email: '', password: '' })
  const [payloadError, setPayloadError] = useState({ email: "", password: "" });
  const [emailNotReceivedSecOpen, setEmailNotReceivedSecOpen] = useState(false)
  const [disableResendBtn, setDisableResendBtn] = useState(false);
  const [forgotEmail, setForgotEmail] = useState({ email: '' });
  const [promotions, setPromotions] = useState([])


  const { loading: promotionLoading, error: promotionErr } = useQuery(PROMOTIONS, {
    onCompleted: (res) => {
      setPromotions(res.promotions.edges)
    }
  })



  const [loginUser, { loading, error: loginErr }] = useMutation(LOGIN_USER, {
    onCompleted: (res) => {
      localStorage.setItem("token", res.loginUser.access);
      toast.success('Login Success!');
      window.location.href = "/dashboard/myside";
    },
    onError: (err) => {
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const errorCode = err.graphQLErrors[0].extensions.code;
        const errorMessage = err.graphQLErrors[0].extensions.message;
        toast.error(errorMessage)
        if (errorCode === 'email_not_verified') {
          setEmailNotReceivedSecOpen(true)
        }
      }
    },
  });



  const handleInputChange = (e) => {
    setPayloadError({ ...payloadError, [e.target.name]: '' });
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const handleLogin = () => {
    if (!payload.email) {
      setPayloadError({ ...payloadError, email: 'Please enter email!' });
      return;
    }
    if (!payload.password) {
      setPayloadError({ ...payloadError, password: 'Please enter password!' })
      return;
    }
    if (loginErr) toast.error('SomeThing went wrong!')
    loginUser({ variables: payload })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }



  const [resendMail] = useMutation(SEND_VERIFICATION_MAIL, {
    onCompleted: (res) => {
      const { message, success } = res.sendVerificationMail;
      toast.success(message)
    },
    onError: (res) => {
      console.log('sendverificationmail:', res)
    }
  });

  const handleResendMail = () => {
    resendMail({
      variables: {
        email: payload.email
      }
    })
    setDisableResendBtn(true)
    setTimeout(() => {
      setDisableResendBtn(false)
    }, 50000);
  };



  const [passwordReset, { loading: passResetLoading, data: passResetData }] = useMutation(PASSWORD_RESET, {
    onCompleted: (res) => {
      // toast.success(res.passwordResetMail.message)
      setForgotEmail({ email: '' })
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    }
  });

  const handleForgotePassword = () => {
    if (!forgotEmail.email) {
      toast.error('Please enter your email!')
      return;
    }
    passwordReset({
      variables: {
        email: forgotEmail.email
      }
    })
  }




  const passwordVisibilityHandler = () => setPasswordVisibility(!passwordVisibility);


  return (
    <Container sx={{
      width: '100%',
      height: { xs: '100%', lg: '100vh' },
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      py: { xs: 5, lg: 0 },
      background: { xs: 'linear-gradient(90deg, #EDF3FF 0%, #FFE8D7 100%, #F0FFDF 100%)', lg: 'none' }
    }} maxWidth='xxl'>
      <Stack sx={{ width: '100%', display: { xs: 'flex', md: 'none' } }} direction='row' alignItems='center' justifyContent='space-between'>
        <Link to='/'>
          <IconButton sx={{
            bgcolor: '#fff',
            border: '1px solid lightgray'
          }}>
            <KeyboardArrowLeft />
          </IconButton>
        </Link>
        <Box sx={{
          width: '150px',
          mb: 2
        }}>
          <img width='100%' src="Logo.svg" alt="" />
        </Box>
        <Box />
      </Stack>
      <Stack alignItems='center' justifyContent='center' sx={{
        width: { xs: '100%', md: '50%' },
        height: '100%',
        background: { xs: 'none', md: `linear-gradient(90deg, #EDF3FF 0%, #FFE8D7 100%, #F0FFDF 100%)` }
      }}>
        <Box sx={{ width: { xs: '100%', md: '500px' } }}>
          {
            promotionLoading ? <Loader /> : promotionErr ? <ErrorMsg /> :
              <Carousel
                swipeable={true}
                // draggable={true}
                showDots={true}
                arrows={false}
                rewindWithAnimation={true}
                rewind={true}
                responsive={responsive}
                infinite={true}
                renderButtonGroupOutside={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all 1s"
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={props.deviceType}
              >

                {
                  promotions.map(data => (
                    <Box key={data.node.id} py={5}>
                      <SlideItem data={data} />
                    </Box>
                  ))
                }
              </Carousel>
          }
        </Box>

      </Stack>
      <Stack alignItems='center' sx={{ width: { xs: '100%', md: '50%' } }}>
        {
          forgotePassSecOpen ? (
            <Stack sx={{
              width: { xs: '100%', md: '480px' },
              justifyContent: 'center',
            }}>
              <Stack sx={{ width: '100%' }} direction='row' alignItems='center' justifyContent={'space-between'}>

                <Button onClick={() => setForgotePassSecOpen(false)} sx={{
                  color: 'gray',
                  fontSize: '22px',
                  mb: 2,
                }} startIcon={<KeyboardArrowLeft />}> Back </Button>
              </Stack>
              {
                passResetData ?
                  <Typography sx={{
                    bgcolor: 'light.main',
                    borderRadius: '8px',
                    px: 2, py: 1, color: 'primary.main'
                  }}>{passResetData.passwordResetMail.message}</Typography> :
                  <Stack>
                    <Typography sx={{ fontWeight: 600, fontSize: '25px', mb: 3 }}>Forgote Password?</Typography>
                    <Input value={forgotEmail.email} sx={{ mb: 2 }} placeholder='Enter Your Email' onChange={(e) => setForgotEmail({ email: e.target.value })} type="text" />
                    {/* <TextField onChange={(e)=> setForgotEmail(e.target.value)} sx={{ mb: 2 }} fullWidth placeholder='email address' variant="outlined" /> */}
                    <CButton isLoading={passResetLoading} disable={passResetLoading} onClick={handleForgotePassword} variant='contained'>Submit</CButton>
                  </Stack>
              }
            </Stack>

          ) : (
            <Stack sx={{
              width: { xs: '100%', md: '480px' },
              justifyContent: 'center',
            }}>
              <Stack sx={{ width: '100%', display: { xs: 'none', md: 'flex' } }} direction='row' alignItems='center' justifyContent={'space-between'}>
                <Link to='/'>
                  <Button sx={{
                    color: 'primary.main',
                    mb: 2,
                  }} startIcon={<KeyboardArrowLeft />}> Back To Home </Button>
                </Link>
                <Box sx={{
                  width: { xs: '70%', md: '200px' },
                  mb: 2
                }}>
                  <img width='100%' src="Logo.svg" alt="" />
                </Box>
              </Stack>
              <Typography sx={{ fontWeight: 600, fontSize: '25px', mb: 3 }}>Sign into your account</Typography>
              <TextField
                onChange={handleInputChange}
                name='email'
                value={payload.email}
                error={payloadError.email !== ''}
                helperText={payloadError && payloadError.email}
                sx={{ mb: 2 }}
                fullWidth
                label="Email"
                variant="outlined"
                onKeyDown={handleKeyPress}
              />
              <TextField
                sx={{ mb: 2 }}
                variant="outlined"
                type={passwordVisibility ? "text" : "password"}
                name="password"
                label="Password"
                fullWidth
                value={payload.password}
                error={payloadError.password !== ""}
                helperText={payloadError && payloadError.password}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
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
              <Stack direction='row' justifyContent='space-between'>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Typography onClick={() => setForgotePassSecOpen(true)} sx={{ fontSize: '15px', alignSelf: 'center', color: 'primary.main ', cursor: 'pointer' }}>Forgot password?</Typography>
              </Stack>
              {emailNotReceivedSecOpen &&
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '8px 24px',
                  bgcolor: 'light.main',
                  borderRadius: '8px',
                  fontSize: '18px',
                  color: 'primary.main',
                  my: 3
                }}>
                  <Typography >Don't received an email?</Typography>
                  <Button onClick={handleResendMail} disabled={disableResendBtn}>Click to send again</Button>

                </Box>
              }
              <CButton onClick={handleLogin} isLoading={loading} variant='contained'> Sign In</CButton>
              <CButton startIcon={<Google />} variant='outlined' style={{ mt: 2 }}>Sign in with Google</CButton>
              <Box sx={{ display: 'inline-flex', alignSelf: 'center', mt: 2 }}>
                <Typography sx={{ whiteSpace: 'nowrap', fontSize: { xs: '14px', md: '16px' } }}>Don't have an account?</Typography>
                <Link to='/search'>
                  <Typography sx={{ whiteSpace: 'nowrap', fontSize: { xs: '14px', md: '16px' }, color: 'primary.main', ml: 2 }}>Create free account</Typography>
                </Link>
              </Box>
            </Stack>
          )
        }
      </Stack>
    </Container>
  )
}

export default Login