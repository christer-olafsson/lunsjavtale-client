import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import { Stack, TextField } from '@mui/material';
import CButton from '../../../../../common/CButton/CButton';
import { ME } from '../../../../../graphql/query';
import { BILLING_ADDRESS_MUTATION } from '../../graphql/mutation';

const AddBillingInfo = () => {
  const [errors, setErrors] = useState({})
  const [payload, setPayload] = useState({
    firstName: '',
    lastName: '',
    address: '',
    sector: '',
    country: '',
    phone: '',
  })

  const {data: user} = useQuery(ME)

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
      country: data.country ?? '',
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
      />
      <Stack direction='row' flex={1} gap={2} >
        <TextField
          fullWidth
          value={payload.firstName}
          onChange={handleBillingInputChange}
          name='firstName'
          label="First Name"
          variant="standard"
        />
        <TextField
          fullWidth
          value={payload.lastName}
          onChange={handleBillingInputChange}
          name='lastName'
          label="Last Name"
          variant="standard"
        />
      </Stack>
      <Stack direction='row' flex={1} gap={2} >
        <TextField
          fullWidth
          value={payload.country}
          onChange={handleBillingInputChange}
          name='country'
          label="Country"
          variant="standard"
        />
        <TextField
          fullWidth
          value={payload.phone}
          onChange={handleBillingInputChange}
          name='phone'
          type='number'
          label="Phone"
          variant="standard"
        />
      </Stack>
      <TextField
        value={payload.sector}
        onChange={handleBillingInputChange}
        name='sector'
        label="Sector"
        variant="standard"
      />
      <CButton onClick={handleAdd} isLoading={loading} variant='contained'>Save Changes</CButton>
    </Stack>
  )
}

export default AddBillingInfo