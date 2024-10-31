import { useMutation, useQuery } from '@apollo/client';
import { Autocomplete, Box, Checkbox, FormControl, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { GET_ALL_CATEGORY } from '../../graphql/query';
import toast from 'react-hot-toast';
import { CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material';
import CButton from '../../common/CButton/CButton';
import { useState } from 'react';
import { MEETING_MUTATION } from '../../pages/dashboard/meeting/graphql/mutation';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const NewMeetingFromHome = ({closeDialog}) => {
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

  const [meetingMutation, { loading: meetingLoading }] = useMutation(MEETING_MUTATION, {
    onCompleted: (res) => {
      toast.success(res.foodMeetingMutation.message)
      setPayload({})
      setErrors({})
      closeDialog()
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
    if (!payload.title) {
      setErrors({ title: 'Meeting Title Required!' })
      return
    }
    if (!payload.email) {
      setErrors({ email: 'Email Required!' })
      return
    }
    if (!payload.phone) {
      setErrors({ phone: 'Phone Number Required!' })
      return
    }
    if (!payload.meetingType) {
      setErrors({ meetingType: 'Meeting Type Required!' })
      return
    }
    if (!payload.meetingTime) {
      setErrors({ meetingTime: 'Meeting Time Required!' })
      return
    }
    if (!payload.description) {
      setErrors({ description: 'Meeting Description Required!' })
      return
    }
    meetingMutation({
      variables: {
        input: {
          ...payload
        }
      }
    })
  }
  return (
    <FormGroup>
            <Stack >
              <Stack direction='row' alignItems='center' justifyContent='space-between' mb={3}>
                <Typography variant='h5'>Meeting Name</Typography>
                <IconButton sx={{ alignSelf: 'flex-end' }} onClick={closeDialog}><Close /></IconButton>
              </Stack>
              <TextField error={Boolean(errors.title)} helperText={errors.title} onChange={handleInputChange} name='title' label='Title' />
              <Stack direction='row' gap={2} my={2}>
                <Stack flex={1} gap={2}>
                  <TextField onChange={handleInputChange} name='firstName' label='First Name' />
                  <TextField onChange={handleInputChange} name='companyName' label='Company Name' />
                  <TextField error={Boolean(errors.phone)} helperText={errors.phone} onChange={handleInputChange} name='phone' type='number' label='Phone number' />
                </Stack>
                <Stack flex={1} gap={2}>
                  <TextField onChange={handleInputChange} name='lastName' label='Last name' />
                  <TextField error={Boolean(errors.email)} helperText={errors.email} onChange={handleInputChange} name='email' label='Email' />
                  <FormControl error={Boolean(errors.meetingType)} fullWidth>
                    <InputLabel>Meeting Type</InputLabel>
                    <Select
                      label="Meeting Type"
                      onChange={(e) => setPayload({ ...payload, meetingType: e.target.value })}
                    >
                      <MenuItem value={'remote'}>Remote</MenuItem>
                      <MenuItem value={'interview'}>Interview</MenuItem>
                      <MenuItem value={'in-person'}>In Person</MenuItem>
                    </Select>
                    {errors.meetingType && <FormHelperText>{errors.meetingType}</FormHelperText>}
                  </FormControl>
                </Stack>
              </Stack>
              <Box mb={2}>
                <Typography value={payload.meetingTime} variant='body2'>Meeting Time</Typography>
                <TextField onChange={(e) => setPayload({ ...payload, meetingTime: e.target.value })} error={Boolean(errors.meetingTime)} helperText={errors.meetingTime} fullWidth type='datetime-local' />
              </Box>
              <Stack gap={2}>
                <Autocomplete
                  multiple
                  options={allCategories ? allCategories : []}
                  disableCloseOnSelect
                  onChange={(event, value) => setPayload({ ...payload, topics: value.map(item => item.node.id) })}
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
  )
}

export default NewMeetingFromHome