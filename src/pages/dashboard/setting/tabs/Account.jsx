import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, FilledInput, IconButton, Input, InputAdornment, InputLabel, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import CButton from '../../../../common/CButton/CButton';

const Account = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Stack>
      <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1 }}>Account Settings</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>View and update your account  details</Typography>
      <InputLabel sx={{ mt: 3, fontWeight: 600 }}>Username</InputLabel>
      <Input startAdornment={
        <InputAdornment position="start">
          <Typography>Lunsjavtale.no/</Typography>
        </InputAdornment>
      }
      />
      <InputLabel sx={{ mt: 3, fontWeight: 600 }}>Email</InputLabel>
      <Input label='Email' variant='standard' />
      <InputLabel sx={{ mt: 3, fontWeight: 600 }}>Password</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        variant='standard'
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <Typography mt={3}>Forget Password?</Typography>
      <Stack direction='row' mt={2} justifyContent='space-between'>
        <Box></Box>
        <CButton variant='contained'>Save Changes</CButton>
      </Stack>
    </Stack>
  )
}

export default Account