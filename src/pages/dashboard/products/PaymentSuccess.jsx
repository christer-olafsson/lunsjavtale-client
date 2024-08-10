import { useQuery } from '@apollo/client'
import { ArrowBack } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GET_ONLINE_PAYMENT_INFO } from './graphql/query'

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState({})

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const ref = queryParams.get('ref')

  const { loading, error } = useQuery(GET_ONLINE_PAYMENT_INFO, {
    variables: {
      id: ref
    },
    onCompleted: (res) => {
      console.log(res)
      setPaymentData(res.getOnlinePaymentInfo)
    }
  })

  return (
    <Box sx={{ maxWidth: '1368px' }}>

      <Link to='/dashboard'>
        <Button startIcon={<ArrowBack />}>Dashboard</Button>
      </Link>
      {
        paymentData ?

          <Box sx={{
            p: { xs: 0, lg: 3 },
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1
          }}>
            <img style={{ width: '100px' }} src="/image 30.png" alt="" />
            <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Order Placed!</Typography>
            {
              paymentData?.sessionState &&
              <Typography sx={{
                fontSize: '16px',
                fontWeight: 600,
                color: paymentData?.sessionState === 'PaymentTerminated' ? 'red' : 'inherit'
              }}>{paymentData?.sessionState}</Typography>
            }
            <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>You will receive an order confirmation email with details of your order.</Typography>
            {/* <Box sx={{ display: 'inline-flex', textAlign: 'center' }}>
            <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Order ID:</Typography>
            <Typography sx={{ fontSize: '24px', fontWeight: 600, color: 'primary.main', ml: 1 }}>#2548654 </Typography>
            </Box> */}
          </Box>
          :
          <Typography p={6}>Not Found!</Typography>
      }
    </Box >
  )
}

export default PaymentSuccess