import { Box, Paper, Stack, Switch, Typography } from '@mui/material'
import React from 'react'

const Notification = () => {
  return (
    <Box>
      <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1 }}>Notification Settings</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>View and update your notification  details</Typography>
      <Box sx={{
        p:2,mt:3,
        border: '1px solid lightgray',
        borderRadius:'8px'
        }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography sx={{fontSize:'16px',fontWeight:600}}>Show email notifications</Typography>
          <Switch defaultChecked />
        </Stack>
        <Typography sx={{fontSize:'14px',maxWidth:'80%'}}>Under Settings, choose Notifications. Under Select an account, choose the account to enable notifications for.</Typography>
      </Box>
      <Box sx={{
        p:2,mt:3,
        border: '1px solid lightgray',
        borderRadius:'8px'
        }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography sx={{fontSize:'16px',fontWeight:600}}>Show desktop notifications</Typography>
          <Switch defaultChecked />
        </Stack>
        <Typography sx={{fontSize:'14px',maxWidth:'80%'}}>Choose the option you want as your default setting. Block a site: Next to "Not allowed to send notifications," click Add.</Typography>
      </Box>
      <Box sx={{
        p:2,mt:3,
        border: '1px solid lightgray',
        borderRadius:'8px'
        }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography sx={{fontSize:'16px',fontWeight:600}}>Show purchase notifications</Typography>
          <Switch defaultChecked />
        </Stack>
        <Typography sx={{fontSize:'14px',maxWidth:'80%'}}>Get real-time purchase alerts to protect yourself from fraudulent charges.</Typography>
      </Box>
    </Box>
  )
}

export default Notification