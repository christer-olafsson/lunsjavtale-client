import { Box, Button, Checkbox, Container, Dialog, DialogContent, FormControlLabel, FormGroup, IconButton, Input, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../common/CButton/CButton'
import styled from '@emotion/styled';
import { Close, Phone, WhatsApp } from '@mui/icons-material';
import { SlideAnimation } from '../animation/Animation';
import { useQuery } from '@apollo/client';
import { CLIENT_DETAILS } from '../../graphql/query';

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
  const [clientDetails, setClientDetails] = useState({})

  useQuery(CLIENT_DETAILS, {
    onCompleted: (res) => {
      setClientDetails(res.clientDetails)
    },
  });

  function handleOpenDialog() {
    setOpenDialog(true)
  }
  function handleCloseDialog() {
    setOpenDialog(false)
  }
  return (
    <Box maxWidth='xxl' id='Kontakt' sx={{
      dispaly: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      bgcolor: 'primary.main',
      color: '#fff',
      mt: 10
    }}>
      <Container maxWidth='lg'>
        <Stack justifyContent='space-between' direction={{ xs: 'column', md: 'row' }} alignItems='center' py={6}>
          <Box>
            <SlideAnimation direction='up' delay={100}>
              <Typography sx={{ mb: 1, textAlign: { xs: 'center', md: 'start' } }}>Har du spørsmål ?</Typography>
            </SlideAnimation>
            <SlideAnimation direction='up' delay={200}>
              <Typography sx={{ fontSize: { xs: '30px', md: '40px' }, lineHeight: '40px', textAlign: { xs: 'center', md: 'start' }, fontFamily: 'Forum' }}>Vi er tilgjengelig på telefon, ring oss i dag</Typography>
            </SlideAnimation>
          </Box>
          <Stack direction='row' gap={2}>
            {/* <a href={`https://wa.me/${clientDetails?.contact}`} target='blank'>
              <SlideAnimation direction='up' delay={300}>
                <CButton startIcon={<WhatsApp />} variant='contained'
                  style={{ mt: 3, width: '150px' }}>
                  Ring oss
                </CButton>
              </SlideAnimation>
            </a> */}
            <a className='link' href={`tel: ${clientDetails?.contact}`}>
              <SlideAnimation direction='up' delay={300}>
                <CButton startIcon={<Phone />} variant='contained'
                  style={{ width: '150px', bgcolor: '#fff', color: 'primary.main' }}>
                  Ring oss
                </CButton>
              </SlideAnimation>
            </a>
          </Stack>

        </Stack>
      </Container>
    </Box>
  )
}

export default Contact
