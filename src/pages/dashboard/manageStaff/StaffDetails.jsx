import { useQuery } from '@apollo/client'
import { LockOutlined, West } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Loader from '../../../common/loader/Index'
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg'
import { USER } from './graphql/query'
import { format } from 'date-fns'

const StaffDetails = () => {
  const [user, setUser] = useState({})

  const { id } = useParams()
  const navigate = useNavigate()

  const { loading: loadingUser, error: userErr } = useQuery(USER, {
    variables: {
      id
    },
    onCompleted: (res) => {
      setUser(res.user)
    },
  });

  return (
    <Box maxWidth='xl'>
      <Stack direction='row' alignItems='center' gap={2} mb={2}>
        <IconButton onClick={() => navigate(-1)}>
          <West />
        </IconButton>
        <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>Ansattdetaljer</Typography>
      </Stack>


      <Box mt={3}>
        <Box sx={{ width: { xs: '100%', md: '70%' } }}>
          <Stack gap={3}>
            {
              loadingUser ? <Loader /> : userErr ? <ErrorMsg /> :
                <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent='space-between'>
                  <Stack direction='row' gap={2} mb={5} alignItems='center'>
                    <img style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }} src={user.photoUrl ? user.photoUrl : "/noImage.png"} alt="" />
                    <Box>
                      {user?.createdOn &&
                        <Typography>Lagt til: <b>{format(user?.createdOn, 'dd-MM-yyyy')}</b> </Typography>
                      }
                      <Typography>Brukernavn: <b>{user?.username}</b> </Typography>
                      <Typography>Navn: <b>{user?.firstName + ' ' + user?.lastName}</b> </Typography>
                      <Typography>E-post: <b>{user?.email}</b> </Typography>
                      <Typography>Telefon: <b>{user?.phone}</b> </Typography>
                      <Typography>Kjønn: <b>{user?.gender}</b> </Typography>
                      <Typography>Adresse: <b>{user?.address}</b> </Typography>
                      <Typography>Allergier: </Typography>
                      <ul>
                        {
                          user?.allergies?.edges.map(item => (
                            <li key={item.node.id}>{item.node.name}</li>
                          ))
                        }
                      </ul>
                    </Box>
                  </Stack>
                  <Stack gap={2}>
                    <Typography sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      bgcolor: user?.dueAmount === '0.00' ? 'lightgray' : '#F7DCD9',
                      color: user?.dueAmount === '0.00' ? 'inherit' : 'red',
                      borderRadius: '4px',
                      textAlign: 'center',
                      p: 1
                    }}>
                      <i>Total skyldig: </i>
                      {user?.dueAmount ?? '00'} <span style={{ fontWeight: 400 }}>kr</span>
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