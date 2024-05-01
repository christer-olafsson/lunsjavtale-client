import { BorderColor } from '@mui/icons-material'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import SettingTab from './SettingTab'

const Setting = () => {
  return (
    <Box maxWidth='lg'>
      <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>System Settings</Typography>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} mt={4}>
        <Box sx={{
          position: {xs:'none',lg: 'sticky'} ,
          top:100,
          flex: 1,
          height: 'fit-content',
          p: 3,
          bgcolor: 'light.main',
          borderRadius: '16px',
        }}>
          <Stack alignItems='center'>
            <Box sx={{
              width: {xs:'100%',md:'360px'}
            }}>
              <img style={{ width: '100%' }} src="/img21232.png" alt="" />
            </Box>
            <Box sx={{
              mt: -6,
              bgcolor: '#fff',
              borderRadius: '50%',
              width: '96px',
              height: '96px',
              p: .5
            }}><Avatar sx={{ width: '100%', height: '100%', }} />
            </Box>
            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Provato Solutions AS</Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>IT Tecnhology</Typography>
            <Box sx={{
              bgcolor: '#fff',
              p: 2, borderRadius: '8px', mt: 3,
              width: '100%'
            }}>
              <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Payment Method</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>On 04 March, 2024</Typography>
              <Stack mt={2} direction='row' justifyContent='space-between'>
                <Stack>
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
                </Stack>
                <IconButton>
                  <BorderColor />
                </IconButton>
              </Stack>
            </Box>
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