import { Box, Button, Checkbox, Container, Dialog, DialogContent, FormControlLabel, FormGroup, IconButton, Input, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../common/CButton/CButton'
import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const HaveQ = () => {
  const [openDialog, setOpenDialog] = useState(false);

  function handleOpenDialog() {
    setOpenDialog(true)
  }
  function handleCloseDialog() {
    setOpenDialog(false)
  }
  return (
    <Container maxWidth='lg' sx={{
      dispaly: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      bgcolor: 'light.main',
      borderRadius: { xs: 0, md: '16px' },
      my: 5
    }}>
      <Stack justifyContent='center' alignItems='center' py={5}>
        <Box sx={{
          width: '120px',
          height: '56px',
          mb: 3
        }}>
          <img style={{ width: '100%' }} src="/Avatar group.png" alt="" />
        </Box>
        <Typography sx={{ fontSize: '24px', mb: 1, color: 'primary.main' }}>Do you still have questions?</Typography>
        <Typography sx={{ textAlign: 'center' }}>We are available on chat, otherwise you can call the thread at any time</Typography>
        <CButton onClick={handleOpenDialog} variant='contained' style={{ height: { xs: '37px', md: '56px' }, mt: 3, width: '150px' }}>
          Contact Us
        </CButton>
        <Dialog
          // onClose={handleCloseDialog}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
          maxWidth='sm'
          fullWidth
        >
          <DialogContent>
            <FormGroup>
              <Stack >
                <IconButton sx={{alignSelf:'flex-end'}} onClick={handleCloseDialog}><Close /></IconButton>
                <Typography sx={{ fontWeight: 700, fontSize: '16px', color: 'primary.main', textAlign: 'center' }}>Contact us</Typography>
                <Typography sx={{ fontSize: '32px', fontWeight: 700, mb: 1, textAlign: 'center' }}>Get in touch</Typography>
                <Typography sx={{ fontSize: '18px', fontWeight: 400, mb: 1, textAlign: 'center' }}>We’d love to hear from you. Please fill out this form.</Typography>
                <Stack direction='row' gap={2} mb={2}>
                  <Stack flex={1} gap={2}>
                    <TextField label='Name of the Company' />
                    <TextField label='Phone Number' />
                  </Stack>
                  <Stack flex={1} gap={2}>
                    <TextField label='Your Name' />
                    <TextField label='Number of employees' />
                  </Stack>
                </Stack>
                <TextField sx={{mb:2}} label='Number of employees' />
                <TextField sx={{mb:2}} label='Number of employees' />
                <TextField label='Message' rows={4} multiline />
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                  <FormControlLabel required control={<Checkbox />} label="You agree to our friendly" />
                  <a href="">privacy policy.</a>
                </Box>
                <Button type='submit' size='large' variant='contained'>Send Message</Button>
              </Stack>
            </FormGroup>
          </DialogContent>
        </Dialog>
      </Stack>
    </Container>
  )
}

export default HaveQ