import { Autocomplete, Box, Checkbox, Container, Divider, FormControlLabel, FormGroup, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../common/CButton/CButton';
import { Link } from 'react-router-dom';
import CDialog from '../../common/dialog/CDialog';
import { CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const topicList = [
  { name: 'Topic 1' },
  { name: 'Topic 2' },
  { name: 'Topic 3' },
]
const meetingType = [
  { name: 'Meeting Type 1' },
  { name: 'Meeting Type 2' },
  { name: 'Meeting Type 3' },
]
const attendees = [
  { name: 'Attendees 1' },
  { name: 'Attendees 2' },
  { name: 'Attendees 3' },
]


const SoEasy = () => {
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Container sx={{ my: { xs: 5, md: 10 } }} maxWidth='lg'>
      <Stack sx={{ width: '100%' }} gap={{ xs: 8, md: 4 }} direction={{ xs: 'column', lg: 'row' }} alignItems='center' justifyContent='space-between'>

        <Box >
          <Typography sx={{ fontWeight: 800, fontSize: { xs: '32px', md: '58px' } }}>So easy!</Typography>
          <Divider sx={{ width: '64px', borderBottomWidth: '2px', my: { xs: 1, md: 3 } }} />
          <List>
            {
              [1, 2, 3, 4, 5].map((_, id) => (
                <ListItem sx={{ mb: { xs: 1, md: 2 } }} disablePadding key={id}>
                  <ListItemIcon><img src="/ok.png" alt="" /></ListItemIcon>
                  <ListItemText sx={{ ml: -3 }}>
                    <Typography sx={{ fontSize: { xs: '14px', md: '18px' } }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                  </ListItemText>
                </ListItem>
              ))
            }
          </List>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 3 }}>
            <Link to='/search'>
              <CButton variant='contained' color='secondary' style={{ width: { xs: '100%', md: '119px' }, textWrap: 'noWrap' }}>Get Started</CButton>
            </Link>
            <CButton onClick={() => setMeetingDialogOpen(true)} variant='outlined' style={{ width: '100%' }}>Do you need meeting food?</CButton>
          </Stack>
        </Box>
        <Stack direction='row' alignItems='center' gap={2}>
          <Stack gap={2}>
            <Box sx={{
              width: { xs: '165px', md: '310px' },
              height: { xs: '272px', md: '408px' }
            }}>
              <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/Rectangle 1.png" alt="" />
            </Box>
            <Box sx={{
              width: { xs: '165px', md: '310px' },
              height: { xs: '78px', md: '117px' }
            }}>
              <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/Rectangle 3.png" alt="" />
            </Box>
          </Stack>
          <Box sx={{
            width: { xs: '165px', md: '310px' },
            height: { xs: '272px', md: '408px' }
          }}>
            <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} src="/Rectangle 2.png" alt="" />
          </Box>
        </Stack>
        <CDialog
          openDialog={meetingDialogOpen}
          maxWidth='md'
          fullWidth
        >
          <FormGroup>
            <Stack >
              <Stack direction='row' alignItems='center' justifyContent='space-between' mb={3}>
                <Typography variant='h5'>Meeting Name</Typography>
                <IconButton sx={{ alignSelf: 'flex-end' }} onClick={() => setMeetingDialogOpen(false)}><Close /></IconButton>
              </Stack>
              <Stack direction='row' gap={2} mb={2}>
                <Stack flex={1} gap={2}>
                  <TextField label='First name' />
                  <TextField label='Company name' />
                  <TextField label='Phone number' />
                  <TextField type='date' helperText='Meeting date' />
                  <Autocomplete
                    multiple
                    options={meetingType}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    // style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Meeting type" placeholder="Meeting type" />
                    )}
                  />
                </Stack>
                <Stack flex={1} gap={2}>
                  <TextField label='Last name' />
                  <TextField label='Email' />
                  <Autocomplete
                    multiple
                    options={topicList}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    // style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Meeting topic" placeholder="Topic" />
                    )}
                  />
                  <TextField type='time' helperText='Meeting time' />
                  <Autocomplete
                    multiple
                    options={attendees}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    // style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Attendees" placeholder="Attendees" />
                    )}
                  />
                </Stack>
              </Stack>
              <TextField sx={{mb:2}} label='Description' rows={4} multiline />
              <CButton variant='contained'>Create Meeting</CButton>
            </Stack>
          </FormGroup>
        </CDialog>

      </Stack>
    </Container>
  )
}

export default SoEasy