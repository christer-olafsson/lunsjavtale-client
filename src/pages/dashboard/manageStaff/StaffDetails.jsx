import { useQuery } from '@apollo/client'
import { LockOutlined, West } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Loader from '../../../common/loader/Index'
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg'

const StaffDetails = () => {
  const [company, setCompany] = useState({})

  const { id } = useParams()
  const navigate = useNavigate()

  const { loading: loadingCompany, error: companyErr } = useQuery(COMPANY, {
    variables: {
      id
    },
    onCompleted: (res) => {
      setCompany(res.company)
    },
  });

  return (
    <Box>
      <Stack direction='row' alignItems='center' gap={2} mb={2}>
        <IconButton onClick={() => navigate(-1)}>
          <West />
        </IconButton>
        <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>Customer Details</Typography>
      </Stack>


      <Box mt={3}>
        <Box sx={{ width: { xs: '100%', md: '70%' } }}>
          <Stack gap={3}>
            {
              loadingCompany ? <Loader /> : companyErr ? <ErrorMsg /> :
                <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent='space-between'>
                  <Stack direction='row' gap={2} mb={5} alignItems='center'>
                    <img style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }} src={company.logoUrl ? company.logoUrl : "/noImage.png"} alt="" />
                    <Box>
                      <Typography sx={{ display: 'inline-flex', gap: 1 }}>Company: <b>{company?.name}</b> <LockOutlined sx={{
                        display: company.isBlocked ? 'block' : 'none',
                        color: 'red'
                      }} /> </Typography>
                      <Typography>Email: <b>{company?.email}</b> </Typography>
                      <Typography>Phone: <b>{company?.contact}</b> </Typography>
                      <Typography>Post Code: <b>{company?.postCode}</b> </Typography>
                      <Typography>Total Employee: <b>{company?.totalEmployee}</b> </Typography>
                      <Typography>Added Employee: <b>{company?.users?.edges.length}</b> </Typography>
                    </Box>
                  </Stack>
                  <Stack gap={2}>
                    <Typography sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      bgcolor: company?.balance === '0.00' ? 'lightgray' : '#F7DCD9',
                      color: company?.balance === '0.00' ? 'inherit' : 'red',
                      borderRadius: '4px',
                      textAlign: 'center',
                      p: 1
                    }}>
                      <i>Total Due: </i>
                      {company?.balance ?? '00'} <span style={{ fontWeight: 400 }}>kr</span>
                    </Typography>
                    <Typography sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      bgcolor: company?.orderedAmount === '0.00' ? 'lightgray' : 'primary.light',
                      color: company?.orderedAmount === '0.00' ? 'inherit' : '#fff',
                      borderRadius: '4px',
                      textAlign: 'center',
                      p: 1
                    }}>
                      <i>Ordered Amount: </i>
                      {company?.orderedAmount ?? '00'} <span style={{ fontWeight: 400 }}>kr</span>
                    </Typography>
                    <Typography sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      bgcolor: company?.paidAmount === '0.00' ? 'lightgray' : 'green',
                      color: company?.paidAmount === '0.00' ? 'inherit' : '#fff',
                      borderRadius: '4px',
                      textAlign: 'center',
                      p: 1
                    }}>
                      <i>Paid Amount: </i>
                      {company?.paidAmount ?? '00'} <span style={{ fontWeight: 400 }}>kr</span>
                    </Typography>
                  </Stack>
                </Stack>
            }
          </Stack>
        </Box>

      </Box >



    </Box>
  )
}

export default StaffDetails