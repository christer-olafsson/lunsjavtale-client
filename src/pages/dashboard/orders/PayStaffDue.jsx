/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { Close } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import { MAKE_ONLINE_PAYMENT } from '../payment/graphql/mutation';

const PayStaffDue = ({ orderData, closeDialog, staffCart, totalDue }) => {

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

  const handlePay = () => {
    createPayment({
      variables: {
        input: {
          company: orderData?.company.id,
          paidAmount: totalDue,
          paymentFor: staffCart[0].addedFor.id,
          userCarts: staffCart.map(item => item.id)
        }
      }
    })
  }

  return (
    <Box>

      <Stack direction='row' justifyContent='space-between' mb={1}>
        <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
          Opprett betaling for bestilling
          <span style={{ color: 'coral' }}> #{orderData?.id}</span>
        </Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>
      <Typography>Total skyldig for betaling <b style={{ color: 'coral' }}>{totalDue}</b>  kr</Typography>

      <CButton isLoading={loading} onClick={handlePay} variant='contained' style={{ width: '100%', mt: 2 }}>
        Bekreft
      </CButton>

    </Box>
  )
}

export default PayStaffDue