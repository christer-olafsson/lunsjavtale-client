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
import { format } from 'date-fns';


const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;



const NewMeeting = ({ fetchMeeting, closeDialog }) => {
  const { data: user } = useQuery(ME)
  const [allCategories, setAllCategories] = useState([]);
  const [errors, setErrors] = useState({})
  const [payload, setPayload] = useState({
    title: '',
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

  const handleDateTimeChange = (e) => {
    const selectedDate = new Date(e.target.value);
    // Format the date as 'YYYY-MM-DDTHH:mm:ssXXX' (ISO 8601 format)
    const formattedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ssXXX");
    setPayload({ ...payload, meetingTime: formattedDate });
  };

  const handleCreate = () => {
    if (!payload.title) {
      setErrors({ title: 'Møtetittel er påkrevd!' })
      return
    }
    if (!payload.meetingType) {
      setErrors({ meetingType: 'Møtetype er påkrevd!' })
      return
    }
    if (!payload.meetingTime) {
      setErrors({ meetingTime: 'Møtetid er påkrevd!' })
      return
    }
    if (!payload.description) {
      setErrors({ description: 'Møtebeskrivelse er påkrevd!' })
      return
    }
    meetingMutation({
      variables: {
        input: {
          ...payload,
          company: user?.me.company.id
        }
      }
    })
  }

  return (
    <Box sx={{
      p: { xs: 0, md: 2 }
    }}>

      <Stack direction='row' justifyContent='space-between' mb={4}>
        <Typography variant='h5'>Opprett møte</Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>

      <FormGroup>
        <Stack >
          <TextField error={errors.title} helperText={errors.title} onChange={handleInputChange} name='title' label='Tittel' />
          <Stack direction='row' gap={2} my={2}>
            {/* <Stack flex={1} gap={2}>
              <TextField value={payload.firstName} onChange={handleInputChange} name='firstName' label='Fornavn' />
              <TextField value={payload.companyName} onChange={handleInputChange} name='companyName' label='Firmanavn' />
              <TextField value={payload.phone} onChange={handleInputChange} name='phone' type='number' label='Telefonnummer' />
            </Stack> */}
            <Stack flex={1} gap={2}>
              {/* <TextField value={payload.lastName} onChange={handleInputChange} name='lastName' label='Etternavn' />
              <TextField value={payload.email} onChange={handleInputChange} name='email' label='E-post' /> */}
              <FormControl error={Boolean(errors.meetingType)} fullWidth>
                <InputLabel>Møtetype</InputLabel>
                <Select
                  label="Møtetype"
                  onChange={(e) => setPayload({ ...payload, meetingType: e.target.value })}
                >
                  <MenuItem value={'remote'}>Fjernt</MenuItem>
                  <MenuItem value={'interview'}>Intervju</MenuItem>
                  <MenuItem value={'in-person'}>Personlig</MenuItem>
                  <MenuItem value={'others'}>Andre</MenuItem>
                </Select>
                {errors.meetingType && <FormHelperText>{errors.meetingType}</FormHelperText>}
              </FormControl>
            </Stack>
          </Stack>
          <Box mb={2}>
            <Typography variant='body2'>Møtetid</Typography>
            <TextField onChange={handleDateTimeChange} error={Boolean(errors.meetingTime)} helperText={errors.meetingTime} fullWidth type='datetime-local' />
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
                <TextField {...params} label="Møtetema" />
              )}
            />

          </Stack>
          <TextField value={payload.description} error={Boolean(errors.description)} helperText={errors.description} onChange={handleInputChange} name='description' sx={{ my: 2 }} label='Beskrivelse' rows={4} multiline />
          <CButton onClick={handleCreate} isLoading={meetingLoading} variant='contained'>Opprett møte</CButton>
        </Stack>
      </FormGroup>

    </Box>
  )
}

export default NewMeeting