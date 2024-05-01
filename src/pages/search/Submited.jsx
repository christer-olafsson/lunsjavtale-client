import { Chat, KeyboardArrowLeft } from '@mui/icons-material'
import { Box, Button, Container, Input, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { CHECk_POST_CODE } from '../../graphql/query'
import LoadingBar from '../../common/loadingBar/LoadingBar'

const inputStyle = {
  width: '100%',
  padding: '8px 24px',
  border: '1px solid gray',
  borderRadius: '50px', mb: 1.5
}

const Submited = () => {
  const [input, setinput] = useState('');


  return (
    <Container maxWidth='lg' sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      py: { xs: 5, md: 0 }
    }}>
      <Link to='/'>
        <Button startIcon={<KeyboardArrowLeft />} sx={{ color: 'primary.main', alignSelf: 'flex-start', mb: 2 }}>
          Back To Home
        </Button>
      </Link>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center' gap={{ xs: 4, md: 8 }}>
        <Box sx={{
          flex: 1,
          width: { xs: '100%', md: '588px' }
        }}>
          <img style={{ width: '100%', height: '100%' }} src="/Group155.png" alt="" />
        </Box>
        <Stack sx={{ flex: 1 }}>
          <Typography sx={{
            fontSize: { xs: '24px', md: '48px' },
            fontWeight: { xs: 500, md: 800 },
            mb: { xs: 2, md: 4 }
          }}>Better food, less food waste, more time</Typography>
          <Typography sx={{
            width: '100%',
            padding: '8px 24px',
            bgcolor: '#F3FFFB'
          }}>
            Thanks! We have received your details and will contact you as soon as we deliver to your postcode.
          </Typography>
          <Typography sx={{ fontSize: '24px', fontWeight: '600', my: 2 }}>Are you not a decision maker?</Typography>

          <Button sx={{alignSelf:'center',mb:3}}>Back</Button>
          <Stack direction='row' sx={{
            alignSelf: { xs: 'start', md: 'start' },
            bgcolor: '#fff',
            width: '100%',
            height: { xs: '40px', md: '56px' },
            justifyContent: 'space-between',
            border: '1px solid lightgray',
            borderRadius: '40px',
            pl: { xs: 1.5, md: 2 },
          }}>
            <Input disableUnderline sx={{
              border: 'none', outline: 'none',
              flex: 1, fontSize: { xs: '11px', sm: '13px', md: '15px' }, borderRadius: '38px'
            }} type="number" placeholder="Your work email" value={input} onChange={e => setinput(e.target.value)} />
            <Button variant='contained' size='small' sx={{
              textWrap: 'nowrap',
              fontWeight: 700,
              fontSize: { xs: '11px', sm: '13px', md: '15px' },
              borderRadius: '38px',
              color: '#fff',
              px: { xs: 1.5, md: 2 }
            }} startIcon={<Chat size='small' />}>Send me info*</Button>
          </Stack>
          <Typography sx={{
            fontSize:'16px',
            fontStyle:'italic',
            fontWeight:'400',mt:2
          }}>
            By pressing "Send me info", you agree that we will send you an email with information that you can pass on to your boss.
          </Typography>
        </Stack>
      </Stack >
    </Container >
  )
}

export default Submited