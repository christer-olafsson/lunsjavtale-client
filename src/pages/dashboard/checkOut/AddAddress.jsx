import { useMutation } from '@apollo/client';
import { Box, FormGroup, IconButton, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import { Close } from '@mui/icons-material';
import { ADDRESS_MUTATION } from './graphql/mutation';

const AddAddress = ({ closeDialog }) => {
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const [errors, setErrors] = useState({})
  const [payload, setPayload] = useState({
    address: '',
    postCode: '',
    city: '',
    state: '',
    country: '',
    fullName: '',
    phone: '',
    instruction: '',
  })


  const [meetingMutation, { loading: meetingLoading }] = useMutation(ADDRESS_MUTATION, {
    onCompleted: (res) => {
      toast.success(res.addressMutation.message)
      closeDialog()
    },
    onError: (err) => {
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const graphqlError = err.graphQLErrors[0];
        const { extensions } = graphqlError;
        if (extensions && extensions.errors) {
          setErrors(extensions.errors)
        }
      }
    }
  });

  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const handleCreate = () => {
    if (!payload.title) {
      setErrors({ title: 'Meeting Title Required!' })
      return
    }
    if (!payload.meetingType) {
      setErrors({ meetingType: 'Meeting Type Required!' })
      return
    }
    if (!payload.meetingTime) {
      setErrors({ meetingTime: 'Meeting Time Required!' })
      return
    }
    if (!payload.description) {
      setErrors({ description: 'Meeting Description Required!' })
      return
    }
    meetingMutation({
      variables: {
        input: {
          ...payload
        }
      }
    })
  }
  return (
    <FormGroup>
      <Stack >
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={3}>
          <Typography variant='h5'>Add Shiping Address</Typography>
          <IconButton sx={{ alignSelf: 'flex-end' }} onClick={() => closeDialog(false)}><Close /></IconButton>
        </Stack>
        <TextField error={Boolean(errors.address)} helperText={errors.address} multiline rows={3} onChange={handleInputChange} name='address' label='Address' />
        <Stack direction='row' gap={2} my={2}>
          <Stack flex={1} gap={2}>
            <TextField onChange={handleInputChange} name='country' label='Country' />
            <TextField onChange={handleInputChange} name='city' label='City' />
            <TextField onChange={handleInputChange} name='fullName' label='Full Name' />
          </Stack>
          <Stack flex={1} gap={2}>
            <TextField onChange={handleInputChange} name='postCode' label='Post Code' />
            <TextField onChange={handleInputChange} name='state' label='State' />
            <TextField onChange={handleInputChange} name='phone' type='number' label='Phone number' />
          </Stack>
          {/* <Stack flex={1} gap={2}>
            <TextField onChange={handleInputChange} name='lastName' label='Last name' />
            <TextField onChange={handleInputChange} name='email' label='Email' />
            <FormControl error={Boolean(errors.meetingType)} fullWidth>
              <InputLabel>Meeting Type</InputLabel>
              <Select
                label="Meeting Type"
                onChange={(e) => setPayload({ ...payload, meetingType: e.target.value })}
              >
                <MenuItem value={'remote'}>Remote</MenuItem>
                <MenuItem value={'interview'}>Interview</MenuItem>
                <MenuItem value={'lively'}>Lively</MenuItem>
                </Select>
                {errors.meetingType && <FormHelperText>{errors.meetingType}</FormHelperText>}
                </FormControl>
              </Stack> */}
        </Stack>
        <TextField onChange={handleInputChange} name='instruction' label='Instruction' sx={{mb:2}} />
        <CButton onClick={handleCreate} isLoading={meetingLoading} variant='contained'>Save Address</CButton>
      </Stack>
    </FormGroup>
  )
}

export default AddAddress