/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { Close } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import { MAKE_ONLINE_PAYMENT } from '../payment/graphql/mutation';

const PayCompanyDue = ({ orderData, closeDialog }) => {

  const [createPayment, { loading }] = useMutation(MAKE_ONLINE_PAYMENT, {
    onCompleted: (res) => {
      console.log(res)
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
          orders: [orderData?.id] ?? null,
          company: orderData?.company.id ?? '',
          paidAmount: parseInt(orderData.companyDueAmount),
        }
      }
    })
  }

  return (
    <Box>

      <Stack direction='row' justifyContent='space-between' mb={1}>
        <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
          Create payment for order
          <span style={{ color: 'coral' }}> #{orderData?.id}</span>
        </Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>
      <Typography>Total Company Due for Pay <b style={{ color: 'coral' }}>{orderData?.companyDueAmount}</b>  kr</Typography>

      <CButton isLoading={loading} onClick={handlePay} variant='contained' style={{ width: '100%', mt: 2 }}>
        Confirm
      </CButton>

    </Box>
  )
}

export default PayCompanyDue