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

const Contact = () => {
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
        <Typography sx={{ fontSize: '24px', mb: 1, color: 'primary.main' }}>Har du fortsatt spørsmål?</Typography>
        <Typography sx={{ textAlign: 'center' }}>Vi er tilgjengelige på chat, eller så kan du ringe tråden når som helst</Typography>
        <a href="https://wa.me/+4748306377" target='blank'>
          <CButton variant='contained' style={{ height: { xs: '37px', md: '56px' }, mt: 3, width: '150px' }}>
            Kontakt Oss
          </CButton>
        </a>
        {/* <Dialog
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
                <Typography sx={{ fontWeight: 700, fontSize: '16px', color: 'primary.main', textAlign: 'center' }}>Kontakt oss</Typography>
                <Typography sx={{ fontSize: '32px', fontWeight: 700, mb: 1, textAlign: 'center' }}>Kom i kontakt</Typography>
                <Typography sx={{ fontSize: '18px', fontWeight: 400, mb: 1, textAlign: 'center' }}>Vi vil gjerne høre fra deg. Vennligst fyll ut dette skjemaet.</Typography>
                <Stack direction='row' gap={2} mb={2}>
                  <Stack flex={1} gap={2}>
                    <TextField label='Bedriftens navn' />
                    <TextField label='Telefonnummer' />
                  </Stack>
                  <Stack flex={1} gap={2}>
                    <TextField label='Ditt navn' />
                    <TextField label='Antall ansatte' />
                  </Stack>
                </Stack>
                <TextField sx={{mb:2}} label='E-postadresse' />
                <TextField sx={{mb:2}} label='Emne' />
                <TextField label='Melding' rows={4} multiline />
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                  <FormControlLabel required control={<Checkbox />} label="Du godtar vår vennlige" />
                  <a href="">personvernpolicy.</a>
                </Box>
                <Button type='submit' size='large' variant='contained'>Send melding</Button>
              </Stack>
            </FormGroup>
          </DialogContent>
        </Dialog> */}
      </Stack>
    </Container>
  )
}

export default Contact
