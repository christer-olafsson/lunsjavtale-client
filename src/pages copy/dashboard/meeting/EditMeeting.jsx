/* eslint-disable react/prop-types */
import { CheckBox, CheckBoxOutlineBlank, Close, CloudUpload } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { GET_ALL_CATEGORY, ME } from '../../../graphql/query';
import { useMutation, useQuery } from '@apollo/client';
import { MEETING_MUTATION } from './graphql/mutation';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';


const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;



const EditMeeting = ({ data, fetchMeeting, closeDialog }) => {
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
      setAllCategories(data?.categories?.edges.map(item => ({
        id: item.node.id,
        name: item.node.name
      })))
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

  const handleDateTimeChange = (e) => {
    const selectedDate = new Date(e.target.value);
    // Format the date as 'YYYY-MM-DDTHH:mm:ssXXX' (ISO 8601 format)
    const formattedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ssXXX");
    setPayload({ ...payload, meetingTime: formattedDate });
  };

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
    if (data.id) {

      meetingMutation({
        variables: {
          input: {
            id: data.id,
            ...payload,
            topics: payload.topics.map(item => item.id)
          }
        }
      })
    }
  }

  useEffect(() => {
    if (data) {
      setPayload({
        title: data.title,
        meetingTime: data.meetingTime,
        topics: data.topics?.edges.map(item => ({
          id: item.node.id,
          name: item.node.name
        })),
        meetingType: data.meetingType,
        description: data.description
      })
    }
  }, [data])

  return (
    <Box sx={{
      p: { xs: 0, md: 2 }
    }}>

      <Stack direction='row' justifyContent='space-between' mb={4}>
        <Typography variant='h5'>Edit Meeting</Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>

      <FormGroup>
        <Stack >
          <TextField value={payload.title} error={errors.title} helperText={errors.title} onChange={handleInputChange} name='title' label='Title' />
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
                  value={payload.meetingType}
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
            <Typography variant='body2'>Meeting Time <b>({format(data.meetingTime, 'dd-MM-yyyy hh:mm a')})</b> </Typography>
            <TextField onChange={handleDateTimeChange} error={Boolean(errors.meetingTime)} helperText={errors.meetingTime} fullWidth type='datetime-local' />
          </Box>
          <Stack gap={2}>
            <Autocomplete
              multiple
              value={payload.topics}
              options={allCategories ? allCategories : []}
              disableCloseOnSelect
              onChange={(event, value) => setPayload({ ...payload, topics: value.map(item => item) })}
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

export default EditMeeting