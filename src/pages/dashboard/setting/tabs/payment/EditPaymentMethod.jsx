/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { Close } from '@mui/icons-material'
import { Box, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PAYMENT_METHOD_MUTATION } from '../../graphql/mutation';
import CButton from '../../../../../common/CButton/CButton';


const EditPaymentMethod = ({ data, fetchPaymentMethods, closeDialog }) => {
  const [errors, setErrors] = useState({});
  const [payload, setPayload] = useState({
    cardHolderName: '',
    cardNumber: '',
    CVV: '',
    expiry: '',
    isDefault: false,
  })

  const [paymentMutation, { loading }] = useMutation(PAYMENT_METHOD_MUTATION, {
    onCompleted: (res) => {
      toast.success(res.paymentMethodMutation.message)
      fetchPaymentMethods()
      closeDialog()
    },
    onError: (err) => {
      toast.error(err.message)
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

  const handleSave = async () => {
    if (!payload.cardHolderName) {
      setErrors({ cardHolderName: 'Card Holder Name required!' })
      return
    }
    if (!payload.cardNumber) {
      setErrors({ cardNumber: 'Card Number required!' })
      return
    }
    if (!payload.CVV) {
      setErrors({ CVV: 'CVV required!' })
      return
    }
    if (!payload.expiry) {
      setErrors({ expiry: 'Expiry Date required!' })
      return
    }
    if (data.id) {
      paymentMutation({
        variables: {
          input: {
            id: data.id,
            ...payload
          }
        }
      })
    }
  }

  useEffect(() => {
    if (data) {
      setPayload({
        cardHolderName: data.cardHolderName,
        cardNumber: data.cardNumber,
        CVV: data.CVV,
        expiry: data.expiry,
        isDefault: data.isDefault ?? false,
      })
    }
  }, [data])



  return (
    <Box>

      <Stack direction='row' justifyContent='space-between' mb={4}>
        <Typography variant='h5'>New Payment Method</Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>

      <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          error={Boolean(errors.cardHolderName)}
          helperText={errors.cardHolderName}
          onChange={handleInputChange}
          value={payload.cardHolderName}
          name='cardHolderName'
          label='Card Holder Name'
        />
        <TextField
          error={Boolean(errors.cardNumber)}
          helperText={errors.cardNumber}
          onChange={handleInputChange}
          value={payload.cardNumber}
          name='cardNumber'
          label='Card Number'
          type='number'
        />
        <TextField
          error={Boolean(errors.CVV)}
          helperText={errors.CVV}
          onChange={handleInputChange}
          value={payload.CVV}
          name='CVV'
          label='CVV'
        />
        <Stack>
          <Typography mb={1} variant='body2'>Expiry date</Typography>
          <TextField
            error={Boolean(errors.expiry)}
            helperText={errors.expiry}
            onChange={handleInputChange}
            value={payload.expiry}
            name='expiry'
            type='date'
          />
        </Stack>
        <FormControlLabel
          control={<Switch onChange={e => setPayload({ ...payload, isDefault: e.target.checked })}
            checked={payload.isDefault} />} label="Default" />
      </FormGroup>

      <CButton isLoading={loading} onClick={handleSave} variant='contained' style={{ width: '100%', mt: 2 }}>
        Save and Add
      </CButton>

    </Box>
  )
}

export default EditPaymentMethod