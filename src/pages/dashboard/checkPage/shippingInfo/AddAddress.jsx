import { useMutation, useQuery } from '@apollo/client';
import { Box, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Close } from '@mui/icons-material';
import { ME } from '../../../../graphql/query';
import { ADDRESS_MUTATION } from '../graphql/mutation';
import { ADDRESSES } from '../graphql/query';
import CButton from '../../../../common/CButton/CButton';

const AddAddress = ({ closeDialog }) => {
  const [errors, setErrors] = useState({})
  const [payload, setPayload] = useState({
    address: '',
    addressType: '',
    postCode: '',
    city: '',
    fullName: '',
    phone: '',
    instruction: '',
    default: true
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

  const handleCreate = () => {
    if (!payload.address) {
      setErrors({ address: 'Adresse er påkrevd!' })
      return
    }
    if (!payload.addressType) {
      setErrors({ addressType: 'Adressenavn er påkrevd!' })
      return
    }
    if (!payload.postCode) {
      setErrors({ postCode: 'Postnummer er påkrevd!' })
      return
    }
    addressMutation({
      variables: {
        input: {
          company: user?.me.company.id,
          ...payload,
          postCode: parseInt(payload.postCode)
        }
      }
    })
  }
  return (
    <FormGroup>
      <Stack gap={2}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={2}>
          <Typography variant='h5'>Legg til leveringsadresse</Typography>
          <IconButton sx={{ alignSelf: 'flex-end' }} onClick={() => closeDialog(false)}><Close /></IconButton>
        </Stack>
        <TextField
          error={Boolean(errors.address)}
          helperText={errors.address}
          multiline
          rows={3}
          onChange={handleInputChange}
          name='address'
          label='Adresse'
        />
        <FormControl error={Boolean(errors.addressType)} fullWidth>
          <InputLabel>Adressenavn</InputLabel>
          <Select
            label="Adressenavn"
            onChange={(e) => setPayload({ ...payload, addressType: e.target.value })}
          >
            <MenuItem value={'permanent-address'}>Permanent adresse</MenuItem>
            <MenuItem value={'office-address'}>Kontoradresse</MenuItem>
          </Select>
          {errors.addressType && <FormHelperText>{errors.addressType}</FormHelperText>}
        </FormControl>
        <Stack direction='row' gap={2}>
          <Stack flex={1} gap={2}>
            <TextField onChange={handleInputChange} name='city' label='By' />
            <TextField onChange={handleInputChange} name='fullName' label='Fullt navn' />
          </Stack>
          <Stack flex={1} gap={2}>
            <TextField helperText={errors.postCode} error={Boolean(errors.postCode)} onChange={handleInputChange} name='postCode' type='number' label='Postnummer' />
            <TextField onChange={handleInputChange} name='phone' type='number' label='Telefonnummer' />
          </Stack>
        </Stack>
        <TextField onChange={handleInputChange} name='instruction' label='Instruksjon' />
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={payload.default}
              onChange={e => setPayload({ ...payload, default: e.target.checked })}
            />} label="Standardadresse" />
        </FormGroup>
        <CButton onClick={handleCreate} isLoading={loading} variant='contained'>Lagre adresse</CButton>
      </Stack>
    </FormGroup>
  )
}

export default AddAddress