import { useLazyQuery, useQuery } from '@apollo/client'
import { ArrowBack, Cancel, CheckCircle } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GET_ONLINE_PAYMENT_INFO } from '../products/graphql/query'
import Loader from '../../../common/loader/Index'
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg'

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState({})

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const ref = queryParams.get('ref')

  const [getOnlinePaymentInfo, { loading, error }] = useLazyQuery(GET_ONLINE_PAYMENT_INFO, {
    fetchPolicy: 'network-only',
    variables: {
      id: ref
    },
    onCompleted: (res) => {
      console.log(res)
      setPaymentData(res.getOnlinePaymentInfo)
    }
  })

  useEffect(() => {
    if (paymentData.sessionState === 'PaymentInitiated') {
      getOnlinePaymentInfo()
    }
  }, [paymentData])


  useEffect(() => {
    getOnlinePaymentInfo()
  }, [ref])

  if (loading) return <Loader />
  if (error) return <Typography><ErrorMsg /></Typography>

  return (
    <Box sx={{ maxWidth: '1368px' }}>

      <Link to='/dashboard/payments-history'>
        <Button startIcon={<ArrowBack />}>Go To Payment History</Button>
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
            {
              paymentData?.sessionState === 'PaymentTerminated' &&
              <Cancel sx={{ color: 'red', fontSize: '100px' }} />
            }
            {
              paymentData?.sessionState === 'PaymentSuccessful' &&
              <CheckCircle sx={{ color: 'green', fontSize: '100px' }} />
            }
            {
              paymentData?.sessionState &&
              <Typography sx={{
                fontSize: '20px',
                fontWeight: 600,
                color: paymentData?.sessionState === 'PaymentTerminated' ? 'red' : 'green'
              }}>{paymentData?.sessionState}</Typography>
            }
            {
              paymentData?.sessionState === 'PaymentSuccessful' &&
              <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>You will receive confirmation email with details of your payment.</Typography>
            }
            {/* <Box sx={{ display: 'inline-flex', textAlign: 'center' }}>
            <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Order ID:</Typography>
            <Typography sx={{ fontSize: '24px', fontWeight: 600, color: 'primary.main', ml: 1 }}>#2548654 </Typography>
            </Box> */}
          </Box>
          :
          <Typography p={6} color='red'>No Payment Found!</Typography>
      }
    </Box >
  )
}

export default PaymentSuccess