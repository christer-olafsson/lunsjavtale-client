import { Delete } from '@mui/icons-material'
import { Avatar, Box, Button, FormGroup, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../../../common/CButton/CButton'


const General = () => {
  const [file, setFile] = useState(null)
  return (
    <Box>
      <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1 }}>Profile</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>View and update your profile  details</Typography>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={3} alignItems='center' justifyContent='space-between' mt={4}>
        <Stack direction='row' gap={3} alignItems='center'>
          <Avatar src={file ? URL.createObjectURL(file) : ''} sx={{ width: '80px', height: '80px' }} />
          <label style={{
            border: '1px solid lightgray',
            padding: '5px 24px',
            borderRadius: '6px'
          }} htmlFor="avatar">Choose</label>
          <input onChange={(e) => setFile(e.target.files[0])} type="file" id="avatar" hidden accept="jpg,png,gif" />
          <Button startIcon={<Delete />}>Remove</Button>
        </Stack>
        <Typography >JPG, GIF or PNG. 3MB Max.</Typography>
      </Stack>
      <FormGroup>
        <Stack mt={4}>
          <Stack direction='row' gap={2} mb={2}>
            <Stack flex={1} gap={2}>
              <TextField size='small' label='First Name*' />
              <TextField size='small' label='Address*' />
              <TextField size='small' label='Phone number' />
            </Stack>
            <Stack flex={1} gap={2}>
              <TextField size='small' label='Last Name*' />
              <TextField size='small' label='Post Code*' />
              {/* <TextField size='small' label='Language' /> */}
            </Stack>
          </Stack>
          <TextField size='small' label='About' multiline rows={2} />
        </Stack>
      </FormGroup>
      <Stack direction='row' mt={2} justifyContent='space-between'>
        <Box></Box>
        <CButton variant='contained'>Save Changes</CButton>
      </Stack>
    </Box>
  )
}

export default General