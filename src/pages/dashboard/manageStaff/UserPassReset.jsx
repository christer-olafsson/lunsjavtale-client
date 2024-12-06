/* eslint-disable react/prop-types */
import { Close, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, DialogActions, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import CButton from '../../../common/CButton/CButton'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { USER_PASSWORD_RESET } from './graphql/mutation'

const UserPassReset = ({ data, closeDialog }) => {
  const [error, setError] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [payload, setPayload] = useState({
    password: '',
    confirmPassword: ''
  })


  const [userPasswordReset, { loading }] = useMutation(USER_PASSWORD_RESET, {
    onCompleted: (res) => {
      toast.success(res.userPasswordReset.message);
      closeDialog()
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const passwordVisibilityHandler = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleResetPassword = () => {
    if (!payload.password) {
      setError(true)
      toast.error('Passord er tomt!')
      return
    }
    if (!payload.confirmPassword) {
      setError(true)
      toast.error('Bekreft passord er tomt!')
      return
    }
    if (payload.password !== payload.confirmPassword) {
      setError(true)
      toast.error('Passordene stemmer ikke overens!')
      return
    }
    userPasswordReset({
      variables: {
        id: data.id,
        password: (payload.password === payload.confirmPassword) && payload.confirmPassword
      }
    })
  }
  return (
    <Stack gap={2}>
      <Typography variant='h6'>Tilbakestill passord for ({data.email})</Typography>

      <TextField
        variant="outlined"
        type={passwordVisibility ? "text" : "password"}
        name="password"
        label="Passord"
        error={error}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
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
        variant="outlined"
        type={passwordVisibility ? "text" : "password"}
        name="confirmPassword"
        label="Bekreft passord"
        error={error}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
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


      <DialogActions>
        <CButton variant='outlined' onClick={() => closeDialog(false)}>Avbryt</CButton>
        <CButton isLoading={loading} onClick={handleResetPassword} variant='contained'>Tilbakestill</CButton>
      </DialogActions>
    </Stack>
  )
}

export default UserPassReset