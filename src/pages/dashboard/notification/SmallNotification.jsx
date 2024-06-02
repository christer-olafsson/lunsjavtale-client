import { QueryBuilder } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'

const SmallNotification = () => {
  return (
    <Stack gap={2}>
      <Box>
        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Your order is placed</Typography>
        <Typography sx={{ fontSize: '13px' }}>Inventore impedit natus, numquam quo ducimus molestias consequatur sed culpa rerum </Typography>
        <Stack direction='row' alignItems='center' gap={.5} >
          <QueryBuilder sx={{ fontSize: '12px' }} />
          <Typography sx={{ fontSize: '12px' }}>3 min ago</Typography>
        </Stack>
      </Box>
      <Box>
        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Your order is placed</Typography>
        <Typography sx={{ fontSize: '13px' }}>Inventore impedit natus, numquam quo ducimus molestias consequatur sed culpa rerum </Typography>
        <Stack direction='row' alignItems='center' gap={.5} >
          <QueryBuilder sx={{ fontSize: '12px' }} />
          <Typography sx={{ fontSize: '12px' }}>3 min ago</Typography>
        </Stack>
      </Box>
    </Stack>
  )
}

export default SmallNotification