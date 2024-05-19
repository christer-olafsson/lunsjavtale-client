import { Autocomplete, Box, Checkbox, Container, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../common/CButton/CButton';
import { Link } from 'react-router-dom';
import CDialog from '../../common/dialog/CDialog';
import { CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material';
import { GET_ALL_CATEGORY } from '../../graphql/query';
import { useMutation, useQuery } from '@apollo/client';
import { MEETING_MUTATION } from '../../graphql/mutation';
import toast from 'react-hot-toast';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;


const SoEasy = () => {
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [errors, setErrors] = useState({})
  const [payload, setPayload] = useState({
    title: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    meetingTime: '',
    topics: [],
    meetingType: '',
    description: ''
  })

  useQuery(GET_ALL_CATEGORY, {
    onCompleted: (data) => {
      const res = data?.categories?.edges
      setAllCategories(res)
    },
  });

  const [meetingMutation, { loading: meetingLoading}] = useMutation(MEETING_MUTATION, {
    onCompleted: (res) => {
      toast.success(res.foodMeetingMutation.message)
      setMeetingDialogOpen()
    },
    onError: (err) => {
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const graphqlError = err.graphQLErrors[0];
        const { extensions } = graphqlError;
        if (extensions && extensions.errors) {
          setErrors(extensions.errors)
        }
      }
    }
  });

  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const handleCreate = () => {
    if(!payload.title){
      setErrors({title: 'Meeting Title Required!'})
      return
    }
    if(!payload.meetingType){
      setErrors({meetingType: 'Meeting Type Required!'})
      return
    }
    if(!payload.meetingTime){
      setErrors({meetingTime: 'Meeting Time Required!'})
      return
    }
    if(!payload.description){
      setErrors({description: 'Meeting Description Required!'})
      return
    }
    meetingMutation({
      variables:{
        input: {
          ...payload
        }
      }
    })
  }

console.log(payload)
  return (
    <Container sx={{ my: { xs: 5, md: 10 } }} maxWidth='lg'>
      <Stack sx={{ width: '100%' }} gap={{ xs: 8, md: 4 }} direction={{ xs: 'column', lg: 'row' }} alignItems='center' justifyContent='space-between'>

        <Box >
          <Typography sx={{ fontWeight: 800, fontSize: { xs: '32px', md: '58px' } }}>Så lett!</Typography>
          <Divider sx={{ width: '64px', borderBottomWidth: '2px', my: { xs: 1, md: 3 } }} />
          <List>
            {[
              "Med våre tjenester kan du enkelt administrere dine møtematbehov.",
              "Få tilgang til et bredt utvalg av matkategorier for dine møter.",
              "Bestill møtemat på nettet på et øyeblikk.",
              "Vi tilbyr også et enkelt grensesnitt for administrering av møter og matbestillinger.",
              "Få tilgang til vår fleksible planleggingstjeneste for møtemat.",
              "Opplev den enkle og effektive måten å håndtere dine møtematbehov på."
            ].map((text, index) => (
              <ListItem key={index} sx={{ mb: { xs: 1, md: 1 } }} disablePadding>
                <ListItemIcon><img src="/ok.png" alt="" /></ListItemIcon>
                <ListItemText sx={{ ml: -3 }}>
                  <Typography sx={{ fontSize: { xs: '14px', md: '18px' } }}>{text}</Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 3 }}>
            <Link to='/search'>
              <CButton variant='contained' color='secondary' style={{ width: { xs: '100%', md: '119px' }, textWrap: 'noWrap' }}>Kom i gang</CButton>
            </Link>
            <CButton onClick={() => setMeetingDialogOpen(true)} variant='outlined' style={{ width: '100%' }}>Trenger du møtemat?</CButton>
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
          maxWidth='sm'
          fullWidth
        >
          <FormGroup>
            <Stack >
              <Stack direction='row' alignItems='center' justifyContent='space-between' mb={3}>
                <Typography variant='h5'>Meeting Name</Typography>
                <IconButton sx={{ alignSelf: 'flex-end' }} onClick={() => setMeetingDialogOpen(false)}><Close /></IconButton>
              </Stack>
              <TextField error={Boolean(errors.title)} helperText={errors.title} onChange={handleInputChange} name='title' label='Title' />
              <Stack direction='row' gap={2} my={2}>
                <Stack flex={1} gap={2}>
                  <TextField onChange={handleInputChange} name='firstName' label='First Name' />
                  <TextField onChange={handleInputChange} name='companyName' label='Company Name' />
                  <TextField onChange={handleInputChange} name='phone' type='number' label='Phone number' />
                </Stack>
                <Stack flex={1} gap={2}>
                  <TextField onChange={handleInputChange} name='lastName' label='Last name' />
                  <TextField onChange={handleInputChange} name='email' label='Email' />
                  <FormControl error={Boolean(errors.meetingType)} fullWidth>
                    <InputLabel>Meeting Type</InputLabel>
                    <Select
                      label="Meeting Type"
                      onChange={(e) => setPayload({...payload, meetingType: e.target.value})}
                    >
                      <MenuItem value={'remote'}>Remote</MenuItem>
                      <MenuItem value={'interview'}>Interview</MenuItem>
                      <MenuItem value={'lively'}>Lively</MenuItem>
                    </Select>
                    {errors.meetingType && <FormHelperText>{errors.meetingType}</FormHelperText>}
                  </FormControl>
                </Stack>
              </Stack>
              <Box mb={2}>
                <Typography value={payload.meetingTime} variant='body2'>Meeting Time</Typography>
                <TextField onChange={(e) => setPayload({...payload, meetingTime: e.target.value})} error={Boolean(errors.meetingTime)} helperText={errors.meetingTime} fullWidth type='datetime-local' />
              </Box>
              <Stack gap={2}>
                <Autocomplete
                  multiple
                  options={allCategories ? allCategories : []}
                  disableCloseOnSelect
                  onChange={(event,value) => setPayload({...payload, topics: value.map(item => item.node.id)})}
                  getOptionLabel={(option) => option.node.name}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.node.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Meeting Topic" />
                  )}
                />

              </Stack>
              <TextField error={Boolean(errors.description)} helperText={errors.description} onChange={handleInputChange} name='description' sx={{ my: 2 }} label='Description' rows={4} multiline />
              <CButton onClick={handleCreate} isLoading={meetingLoading} variant='contained'>Create Meeting</CButton>
            </Stack>
          </FormGroup>
        </CDialog>

      </Stack>
    </Container>
  )
}

export default SoEasy