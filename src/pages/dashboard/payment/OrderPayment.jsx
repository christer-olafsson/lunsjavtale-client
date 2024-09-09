/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client';
import { Close } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ME } from '../../../graphql/query';
import CButton from '../../../common/CButton/CButton';
import { MAKE_ONLINE_PAYMENT } from './graphql/mutation';

const OrderPayment = ({ closeDialog }) => {
  const { data: user } = useQuery(ME)

  const [createPayment, { loading }] = useMutation(MAKE_ONLINE_PAYMENT, {
    onCompleted: (res) => {
      if (res.makeOnlinePayment.paymentUrl) {
        window.location.href = res.makeOnlinePayment.paymentUrl
      }
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const isStaff = user?.me.role === 'company-employee'

  const handleSave = () => {
    createPayment({
      variables: {
        input: {
          paymentFor: isStaff ? user?.me?.id : '',
          company: user?.me?.company?.id,
          paidAmount: isStaff ? user?.me?.dueAmount : user?.me?.company?.balance,
        }
      }
    })
  }


  return (
    <Box>

      <Stack direction='row' justifyContent='space-between' mb={1}>
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>Make Vipps Payment</Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>

      <Typography>
        Total For Payment:
        <b>{isStaff ? user?.me?.dueAmount :  user?.me?.company?.balance}</b> kr
      </Typography>

      <CButton disable={user?.me?.dueAmount === '0.00'} isLoading={loading} onClick={handleSave} variant='contained' style={{ width: '100%', mt: 2 }}>
        Pay Now (Vipps)
      </CButton>

    </Box>
  )
}

export default OrderPayment