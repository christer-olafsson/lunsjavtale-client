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
    postCode: '',
    phone: '',
  })

  const { data: user } = useQuery(ME)

  const [billingAddressMutation, { loading }] = useMutation(BILLING_ADDRESS_MUTATION, {
    onCompleted: (res) => {
      toast.success(res.companyBillingAddressMutation.message)
      setErrors({})
      setEditOn(false)
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
      setErrors({ address: 'Adresse er påkrevd!' })
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
      postCode: data.postCode ?? '',
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
        label="Sted"
        variant="standard"
        disabled={!editOn}
      />
      <Stack direction='row' flex={1} gap={2} >
        <TextField
          fullWidth
          value={payload.firstName}
          onChange={handleBillingInputChange}
          name='firstName'
          label="Fornavn"
          variant="standard"
          disabled={!editOn}
        />
        <TextField
          fullWidth
          value={payload.lastName}
          onChange={handleBillingInputChange}
          name='lastName'
          label="Etternavn"
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
          label="Organisasjonsnummer "
          variant="standard"
          disabled={!editOn}
        />
        <TextField
          fullWidth
          value={payload.postCode}
          onChange={handleBillingInputChange}
          name='postCode'
          type='number'
          label="Poststed"
          variant="standard"
          disabled={!editOn}
        />
      </Stack>

      {
        editOn ?
          <Stack direction='row' gap={2} alignItems='center' alignSelf='flex-end'>
            <Button onClick={() => setEditOn(false)} variant='outlined'>Avbryt</Button>
            <CButton onClick={handleAdd} isLoading={loading} variant='contained'>Lagre endringer</CButton>
          </Stack>
          : <Button onClick={() => setEditOn(true)} sx={{ width: 'fit-content', alignSelf: 'flex-end' }} variant='contained'>Rediger</Button>
      }
    </Stack>
  )
}

export default AddBillingInfo