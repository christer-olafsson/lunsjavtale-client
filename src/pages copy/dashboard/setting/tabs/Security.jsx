import { Box, Button, Stack, Switch, Typography } from '@mui/material'
import React from 'react'

const Security = () => {
  return (
    <Box>
      <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1 }}>Security Settings</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>View and update your security  details</Typography>
      <Box sx={{
        p: 2, mt: 3,
        border: '1px solid lightgray',
        borderRadius: '8px'
      }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Two-factor Authentication</Typography>
          <Button variant='contained'>Enable</Button>
        </Stack>
        <Typography sx={{ fontSize: '14px',maxWidth:'80%',mt:1 }}>Two-factor authentication is an enhanced security. Once enabled, you'll be required to give two types of identification when you log into Google Authentication and SMS are Supported.</Typography>
      </Box>
      <Box sx={{
        p: 2, mt: 3,
        border: '1px solid lightgray',
        borderRadius: '8px'
      }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Login History</Typography>
          <Switch defaultChecked />
        </Stack>
        <Typography sx={{ fontSize: '14px',maxWidth:'80%',mt:1 }}>Choose the option you want as your default setting. Block a site: Next to "Not allowed to send notifications," click Add.</Typography>
      </Box>
    </Box>
  )
}

export default Security