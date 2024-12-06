import { CheckCircleOutlined } from '@mui/icons-material'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import SettingTab from './SettingTab'
import { useQuery } from '@apollo/client'
import { ME } from '../../../graphql/query'
import { useState } from 'react'
import { PAYMENT_METHODS } from './graphql/query'
import Loader from '../../../common/loader/Index'
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg'
import { format } from 'date-fns'

const Setting = () => {
  const [paymentMethods, setPaymentMethods] = useState([])

  const { loading, error: paymentMethodErr } = useQuery(PAYMENT_METHODS, {
    onCompleted: (res) => {
      setPaymentMethods(res.paymentMethods.edges.map(item => item.node));
    }
  });

  const { data: user } = useQuery(ME)

  return (
    <Box maxWidth='lg'>
      <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Systeminnstillinger</Typography>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} mt={4}>
        <Box sx={{
          position: { xs: 'none', lg: 'sticky' },
          top: 100,
          flex: .5,
          height: 'fit-content',
          p: 3,
          bgcolor: 'light.main',
          borderRadius: '16px',
        }}>
          <Stack alignItems='center'>
            <Box sx={{
              width: { xs: '100%', md: '400px' },
              maxHeight: '400px'
            }}>
              <img style={{ width: '100%', height: '300px', objectFit: 'cover' }} src={user?.me.company.logoUrl ? user?.me.company.logoUrl : '/img21232.png'} alt="" />
            </Box>
            <Box sx={{
              mt: -6,
              bgcolor: '#fff',
              borderRadius: '50%',
              width: '96px',
              height: '96px',
              p: .5
            }}><Avatar src={user?.me.photoUrl ? user.me.photoUrl : ''} sx={{ width: '100%', height: '100%', }} />
            </Box>
            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{user?.me.company.name}</Typography>
            {/* <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>IT Tecnhology</Typography> */}
            {
              loading ? <Loader /> : paymentMethodErr ? <ErrorMsg /> :
                paymentMethods.map(data => (
                  <Box key={data.id} sx={{
                    border: '1px solid lightgray',
                    borderRadius: '8px', p: 1.5, mt: 3,
                    display: data.isDefault ? 'block' : 'none'
                  }}>
                    <Stack direction='row' justifyContent='space-between'>
                      <Stack direction='row' alignItems='center' spacing={1}>
                        <Box sx={{
                          bgcolor: 'light.main',
                          width: '72px', height: '58px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '8px'
                        }}>
                          <img src="/visaicon.png" alt="" />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
                            Kortinnehaverens navn:
                            <span style={{ fontWeight: 300, marginLeft: '10px' }}>{data.cardHolderName} </span>
                          </Typography>
                          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
                            Kortnummer:
                            <span style={{ fontWeight: 300, marginLeft: '10px' }}>{data.cardNumber.replace(/.(?=.{4})/g, '*')} </span>
                          </Typography>
                          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
                            Utløpsdato:
                            <span style={{ fontWeight: 300, marginLeft: '10px' }}>{format(data.expiry, 'dd-MM-yyyy')} </span>
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                ))
            }
          </Stack>
        </Box>

        <Box sx={{
          flex: 2
        }}>
          <SettingTab />
        </Box>
      </Stack>
    </Box>
  )
}

export default Setting