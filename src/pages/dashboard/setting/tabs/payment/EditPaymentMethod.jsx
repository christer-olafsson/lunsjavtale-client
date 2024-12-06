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
      setErrors({ cardHolderName: 'Kortinnehaverens navn er påkrevd!' })
      return
    }
    if (!payload.cardNumber) {
      setErrors({ cardNumber: 'Kortnummer er påkrevd!' })
      return
    }
    if (!payload.CVV) {
      setErrors({ CVV: 'CVV er påkrevd!' })
      return
    }
    if (!payload.expiry) {
      setErrors({ expiry: 'Utløpsdato er påkrevd!' })
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
        <Typography variant='h5'>Ny betalingsmetode</Typography>
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
          label='Kortinnehaverens navn'
        />
        <TextField
          error={Boolean(errors.cardNumber)}
          helperText={errors.cardNumber}
          onChange={handleInputChange}
          value={payload.cardNumber}
          name='cardNumber'
          label='Kortnummer'
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
          <Typography mb={1} variant='body2'>Utløpsdato</Typography>
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
            checked={payload.isDefault} />} label="Standard" />
      </FormGroup>

      <CButton isLoading={loading} onClick={handleSave} variant='contained' style={{ width: '100%', mt: 2 }}>
        Lagre og legg til
      </CButton>

    </Box>
  )
}

export default EditPaymentMethod