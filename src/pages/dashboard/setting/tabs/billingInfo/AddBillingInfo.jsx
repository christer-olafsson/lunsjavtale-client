import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import { Button, Stack, TextField } from '@mui/material';
import CButton from '../../../../../common/CButton/CButton';
import { ME } from '../../../../../graphql/query';
import { BILLING_ADDRESS_MUTATION } from '../../graphql/mutation';

const AddBillingInfo = () => {
  const [editOn, setEditOn] = useState(false)
  const [errors, setErrors] = useState({})
  const [payload, setPayload] = useState({
    firstName: '',
    lastName: '',
    address: '',
    sector: '',
    phone: '',
  })

  const { data: user } = useQuery(ME)

  const [billingAddressMutation, { loading }] = useMutation(BILLING_ADDRESS_MUTATION, {
    onCompleted: (res) => {
      toast.success(res.companyBillingAddressMutation.message)
      setErrors({})
    },
    // refetchQueries: [ADDRESSES],
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

  const handleBillingInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!payload.address) {
      setErrors({ address: 'Address Required!' })
    }
    billingAddressMutation({
      variables: {
        input: {
          ...payload
        }
      }
    })
  }

  useEffect(() => {
    const data = user?.me?.company?.billingAddress ?? {}
    setPayload({
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      address: data.address ?? '',
      sector: data.sector ?? '',
      phone: data.phone ?? '',
    })
  }, [user])


  return (
    <Stack flex={1} gap={2} mt={3}>
      <TextField
        error={Boolean(errors.address)}
        helperText={errors.address}
        value={payload.address}
        onChange={handleBillingInputChange}
        name='address'
        label="Business Address"
        variant="standard"
        disabled={!editOn}
      />
      <Stack direction='row' flex={1} gap={2} >
        <TextField
          fullWidth
          value={payload.firstName}
          onChange={handleBillingInputChange}
          name='firstName'
          label="First Name"
          variant="standard"
          disabled={!editOn}
        />
        <TextField
          fullWidth
          value={payload.lastName}
          onChange={handleBillingInputChange}
          name='lastName'
          label="Last Name"
          variant="standard"
          disabled={!editOn}
        />
      </Stack>
      <Stack direction='row' flex={1} gap={2} >
        <TextField
          fullWidth
          value={payload.phone}
          onChange={handleBillingInputChange}
          name='phone'
          type='number'
          label="Phone"
          variant="standard"
          disabled={!editOn}
        />
      </Stack>
      <TextField
        value={payload.sector}
        onChange={handleBillingInputChange}
        name='sector'
        label="Sector"
        variant="standard"
        disabled={!editOn}
      />
      {
        editOn ?
          <Stack direction='row' gap={2} alignItems='center' alignSelf='flex-end'>
            <Button onClick={() => setEditOn(false)} variant='outlined'>Cancel</Button>
            <CButton onClick={handleAdd} isLoading={loading} variant='contained'>Save Changes</CButton>
          </Stack>
          : <Button onClick={() => setEditOn(true)} sx={{ width: 'fit-content', alignSelf: 'flex-end' }} variant='contained'>Edit</Button>
      }
    </Stack>
  )
}

export default AddBillingInfo