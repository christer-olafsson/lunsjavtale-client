import { Box, Button, Input, Stack, Typography } from '@mui/material'

const inputStyle = {
  width: '100%',
  padding: '8px 24px',
  border: '1px solid gray',
  borderRadius: '50px', mb: 1.5
}

const PostCodeNotAvailable = ({handleNotAvailabe}) => {

  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={{
        width: '100%',
        padding: '8px 24px',
        bgcolor: '#C94F2A',
        color: '#fff',
        fontSize: '18px',
        borderRadius: '8px'
      }}>
        We do not deliver to this postcode yet. But fill in the fields below and we'll see what we can do. 🧑‍🍳
      </Typography>
      <Typography sx={{ fontSize: '24px', fontWeight: '600', my: 2 }}>Information about your company</Typography>
      <Input disableUnderline sx={inputStyle} placeholder='Company name' />
      <Input disableUnderline sx={inputStyle} placeholder='Your work email' />
      <Input disableUnderline sx={inputStyle} placeholder='Your mobile number' />
      <Stack direction='row' gap={2} mt={2}>
        <Button onClick={handleNotAvailabe}>Back</Button>
        <Button variant='contained' color='light'>Got started</Button>
      </Stack>
    </Box>
  )
}

export default PostCodeNotAvailable