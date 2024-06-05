import { CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Checkbox, FormControl, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../../common/CButton/CButton';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_COMPANY_STAFF } from './graphql/mutation';
import { GET_INGREDIENTS } from './graphql/query';
import toast from 'react-hot-toast';
import { ME } from '../../../graphql/query';
import { uploadFile } from '../../../utils/uploadFile';


const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const AddStaff = ({ closeDialog, getCompanyStaffs }) => {
  const [file, setFile] = useState(null);
  const [selectedAllergiesId, setSelectedAllergiesId] = useState([]);
  const [allAllergies, setAllAllergies] = useState([]);
  const [errors, setErrors] = useState({});
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [payload, setPayload] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: '',
    phone: ''
  });

  const { data: user } = useQuery(ME)

  const handleRoleChange = (event) => {
    setPayload({ ...payload, role: event.target.value });
  };

  const [createStaff, { loading: createStaffLoading }] = useMutation(CREATE_COMPANY_STAFF, {
    onCompleted: (res) => {
      toast.success(res.createCompanyStaff.message)
      getCompanyStaffs()
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

  //get all allergies
  const { error: ingredientErr, loading: ingredientLoading } = useQuery(GET_INGREDIENTS, {
    onCompleted: (res) => {
      setAllAllergies(res.ingredients.edges.map(item => item.node))
    }
  })


  const handleAddStaff = async () => {
    if (!payload.username) {
      setErrors({ username: 'User Name required!' });
      return
    }
    if (!payload.email) {
      setErrors({ email: 'Email required!' });
      return
    }
    if (!payload.role) {
      setErrors({ role: 'User Role required!' });
      return
    }
    if (!payload.phone) {
      setErrors({ phone: 'Phone number required!' });
      return
    }
    let photoUrl = '';
    let fileId = '';
    if (file) {
      setFileUploadLoading(true)
      const { public_id, secure_url } = await uploadFile(file, 'staffs')
      setFileUploadLoading(false)
      photoUrl = secure_url
      fileId = public_id
    }
    createStaff({
      variables: {
        input: {
          ...payload,
          photoUrl,
          fileId,
          allergies: selectedAllergiesId
        }
      }
    })
  }


  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' mb={4}>
        <Typography variant='h4'>Add Staff</Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>
      <Stack direction='row' alignItems='center' gap={2}>
        <Avatar sx={{ width: { xs: '60px', lg: '96px' }, height: { xs: '60px', lg: '96px' } }} src={file ? URL.createObjectURL(file) : ''} />
        <Box sx={{
          bgcolor: 'primary.main',
          width: { xs: '200px', md: '100%' },
          padding: '12px 24px',
          borderRadius: '6px',
          color: '#fff'
        }}>
          <input onChange={e => setFile(e.target.files[0])} type="file" id='staffImg' accept='jpg,png' />
        </Box>
      </Stack>
      <FormGroup>
        <Stack mt={4}>
          <Stack direction='row' gap={2} mb={2}>
            <Stack flex={1} gap={2}>
              <TextField onChange={handleInputChange} name='firstName' size='small' label='First Name' />
              <TextField onChange={handleInputChange} helperText={errors.username} error={Boolean(errors.username)} name='username' size='small' label='User Name' />
              <FormControl error={Boolean(errors.role)} size='small' fullWidth>
                <InputLabel>Staff Role</InputLabel>
                <Select
                  value={payload.role}
                  label="Staff Role"
                  onChange={handleRoleChange}
                >
                  {
                    user?.me.role === 'company-owner' &&
                    <MenuItem value={'company-manager'}>Manager</MenuItem>
                  }
                  <MenuItem value={'company-employee'}>Employee</MenuItem>
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>
              {/* <TextField name='userName' size='small' label='User Name' /> */}
            </Stack>
            <Stack flex={1} gap={2}>
              <TextField
                onChange={handleInputChange}
                name='lastName'
                size='small'
                label='Last Name'
              />
              <TextField
                helperText={errors.email}
                error={Boolean(errors.email)}
                onChange={handleInputChange}
                name='email'
                size='small'
                label='Email' />
              <TextField
                helperText={errors.phone}
                error={Boolean(errors.phone)}
                onChange={handleInputChange}
                type='number'
                name='phone'
                size='small'
                label='Phone Number'
              />
            </Stack>
          </Stack>
        </Stack>
      </FormGroup>

      <Autocomplete
        size='small'
        multiple
        options={allAllergies}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => setSelectedAllergiesId(value.map(item => item.id))}
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
          <TextField {...params} label="Select Allergies" />
        )}
      />

      <CButton isLoading={createStaffLoading || fileUploadLoading} onClick={handleAddStaff} variant='contained' style={{ width: '100%', mt: 2, height: { xs: '45px', md: '45px' } }}>
        Add
      </CButton>

    </Box >
  )
}

export default AddStaff