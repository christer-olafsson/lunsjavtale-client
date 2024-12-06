/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client';
import { Box, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Close } from '@mui/icons-material';
import { ADDRESS_MUTATION } from '../graphql/mutation';
import { ADDRESSES } from '../graphql/query';
import { ME } from '../../../../graphql/query';
import CButton from '../../../../common/CButton/CButton';

const EditAddress = ({ data, closeDialog }) => {
  const [errors, setErrors] = useState({})
  const [payload, setPayload] = useState({
    address: '',
    addressType: '',
    postCode: '',
    city: '',
    fullName: '',
    phone: '',
    instruction: '',
    default: false
  })

  const { data: user } = useQuery(ME)


  const [addressMutation, { loading }] = useMutation(ADDRESS_MUTATION, {
    onCompleted: (res) => {
      toast.success(res.addressMutation.message)
      closeDialog()
    },
    refetchQueries: [ADDRESSES],
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

  const handleUpdate = () => {
    if (!payload.address) {
      setErrors({ address: 'Address Required!' })
      return
    }
    if (!payload.addressType) {
      setErrors({ addressType: 'Address Type Required!' })
      return
    }
    if (!payload.postCode) {
      setErrors({ postCode: 'Post Code Required!' })
      return
    }
    addressMutation({
      variables: {
        input: {
          id: data.id,
          company: user?.me.company.id,
          ...payload,
          postCode: parseInt(payload.postCode)
        }
      }
    })
  }

  useEffect(() => {
    setPayload({
      address: data.address,
      addressType: data.addressType,
      postCode: data.postCode || '',
      city: data.city || '',
      state: data.state || '',
      country: data.country || '',
      fullName: data.fullName || '',
      phone: data.phone || '',
      instruction: data.instruction || '',
      default: data.default ? data.default : false
    })
  }, [data])


  return (
    <FormGroup>
      <Stack gap={2}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={2}>
          <Typography variant='h5'>Update Shipping Address</Typography>
          <IconButton sx={{ alignSelf: 'flex-end' }} onClick={() => closeDialog(false)}><Close /></IconButton>
        </Stack>
        <TextField
          value={payload.address}
          error={Boolean(errors.address)}
          helperText={errors.address}
          multiline
          rows={3}
          onChange={handleInputChange}
          name='address'
          label='Address'
        />
        <FormControl error={Boolean(errors.addressType)} fullWidth>
          <InputLabel>Address Type</InputLabel>
          <Select
            value={payload.addressType}
            label="Address Type"
            onChange={(e) => setPayload({ ...payload, addressType: e.target.value })}
          >
            <MenuItem value={'permanent-address'}>Permanent Address</MenuItem>
            <MenuItem value={'office-address'}>Office Address</MenuItem>
          </Select>
          {errors.addressType && <FormHelperText>{errors.addressType}</FormHelperText>}
        </FormControl>
        <Stack direction='row' gap={2}>
          <Stack flex={1} gap={2}>
            <TextField value={payload.city} onChange={handleInputChange} name='city' label='City' />
            <TextField value={payload.fullName} onChange={handleInputChange} name='fullName' label='Full Name' />
          </Stack>
          <Stack flex={1} gap={2}>
            <TextField value={payload.postCode} helperText={errors.postCode} error={Boolean(errors.postCode)} onChange={handleInputChange} name='postCode' type='number' label='Post Code' />
            <TextField value={payload.phone} onChange={handleInputChange} name='phone' type='number' label='Phone number' />
          </Stack>
        </Stack>
        <TextField value={payload.instruction} onChange={handleInputChange} name='instruction' label='Instruction' />
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={payload.default}
              onChange={e => setPayload({ ...payload, default: e.target.checked })}
            />} label="Default Address" />
        </FormGroup>
        <CButton onClick={handleUpdate} isLoading={loading} variant='contained'>Update Address</CButton>
      </Stack>
    </FormGroup>
  )
}

export default EditAddress