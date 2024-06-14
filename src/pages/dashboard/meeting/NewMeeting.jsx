/* eslint-disable react/prop-types */
import { CheckBox, CheckBoxOutlineBlank, Close, CloudUpload } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { GET_ALL_CATEGORY, ME } from '../../../graphql/query';
import { useMutation, useQuery } from '@apollo/client';
import { MEETING_MUTATION } from './graphql/mutation';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';


const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;



const NewMeeting = ({fetchMeeting, closeDialog }) => {
  const { data: user } = useQuery(ME)
  const [allCategories, setAllCategories] = useState([]);
  const [errors, setErrors] = useState({})
  const [payload, setPayload] = useState({
    title: '',
    firstName: user.me.firstName,
    lastName: user.me.lastName,
    companyName: user.me.company?.name,
    email: user.me.email,
    phone: user.me.phone,
    meetingTime: '',
    topics: [],
    meetingType: '',
    description: ''
  })


  useQuery(GET_ALL_CATEGORY, {
    onCompleted: (data) => {
      setAllCategories(data?.categories?.edges.map(item => item.node))
    },
  });

  const [meetingMutation, { loading: meetingLoading }] = useMutation(MEETING_MUTATION, {
    onCompleted: (res) => {
      toast.success(res.foodMeetingMutation.message)
      fetchMeeting()
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
    <Box sx={{
      p: { xs: 0, md: 2 }
    }}>

      <Stack direction='row' justifyContent='space-between' mb={4}>
        <Typography variant='h5'>Create Meeting</Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>

      <FormGroup>
        <Stack >
          <TextField error={errors.title} helperText={errors.title} onChange={handleInputChange} name='title' label='Title' />
          <Stack direction='row' gap={2} my={2}>
            {/* <Stack flex={1} gap={2}>
              <TextField value={payload.firstName} onChange={handleInputChange} name='firstName' label='First Name' />
              <TextField value={payload.companyName} onChange={handleInputChange} name='companyName' label='Company Name' />
              <TextField value={payload.phone} onChange={handleInputChange} name='phone' type='number' label='Phone number' />
            </Stack> */}
            <Stack flex={1} gap={2}>
              {/* <TextField value={payload.lastName} onChange={handleInputChange} name='lastName' label='Last name' />
              <TextField value={payload.email} onChange={handleInputChange} name='email' label='Email' /> */}
              <FormControl error={Boolean(errors.meetingType)} fullWidth>
                <InputLabel>Meeting Type</InputLabel>
                <Select
                  label="Meeting Type"
                  onChange={(e) => setPayload({ ...payload, meetingType: e.target.value })}
                >
                  <MenuItem value={'remote'}>Remote</MenuItem>
                  <MenuItem value={'interview'}>Interview</MenuItem>
                  <MenuItem value={'in-person'}>In Person</MenuItem>
                  <MenuItem value={'others'}>Others</MenuItem>
                </Select>
                {errors.meetingType && <FormHelperText>{errors.meetingType}</FormHelperText>}
              </FormControl>
            </Stack>
          </Stack>
          <Box mb={2}>
            <Typography variant='body2'>Meeting Time</Typography>
            <TextField value={payload.meetingTime} onChange={(e) => setPayload({ ...payload, meetingTime: e.target.value })} error={Boolean(errors.meetingTime)} helperText={errors.meetingTime} fullWidth type='datetime-local' />
          </Box>
          <Stack gap={2}>
            <Autocomplete
              multiple
              options={allCategories ? allCategories : []}
              disableCloseOnSelect
              onChange={(event, value) => setPayload({ ...payload, topics: value.map(item => item.id) })}
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
              renderInput={(params) => (
                <TextField {...params} label="Meeting Topic" />
              )}
            />

          </Stack>
          <TextField value={payload.description} error={Boolean(errors.description)} helperText={errors.description} onChange={handleInputChange} name='description' sx={{ my: 2 }} label='Description' rows={4} multiline />
          <CButton onClick={handleCreate} isLoading={meetingLoading} variant='contained'>Create Meeting</CButton>
        </Stack>
      </FormGroup>

    </Box>
  )
}

export default NewMeeting