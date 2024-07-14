/* eslint-disable react/prop-types */
import { CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Button, Checkbox, DialogActions, FormControl, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CButton from '../../../common/CButton/CButton';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_COMPANY_STAFF } from './graphql/mutation';
import { GET_INGREDIENTS } from './graphql/query';
import toast from 'react-hot-toast';
import { uploadFile } from '../../../utils/uploadFile';
import { deleteFile } from '../../../utils/deleteFile';
import CDialog from '../../../common/dialog/CDialog';
import UserPassReset from './UserPassReset';


const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const EditStaff = ({ closeDialog, data, getCompanyStaffs }) => {
  const [file, setFile] = useState(null);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [allAllergies, setAllAllergies] = useState([]);
  const [errors, setErrors] = useState({});
  const [fileUploadLoading, setFileUploadLoading] = useState(false)
  const [resetPassDialogOpen, setResetPassDialogOpen] = useState(false)
  const [payload, setPayload] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    role: ''
  });

  const [editStaff, { loading: editStaffLoading }] = useMutation(CREATE_COMPANY_STAFF, {
    onCompleted: () => {
      toast.success('Successfully Updated!');
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
  useQuery(GET_INGREDIENTS, {
    onCompleted: (res) => {
      setAllAllergies(res.ingredients.edges.map(item => item.node))
    }
  })



  const handleEditStaff = async () => {
    let photoUrl = data.photoUrl;
    let fileId = data.fileId;
    if (file) {
      setFileUploadLoading(true)
      const { public_id, secure_url } = await uploadFile(file, 'staffs')
      await deleteFile(data.fileId)
      photoUrl = secure_url
      fileId = public_id
      setFileUploadLoading(false)
      // photoUrl = location || data.photoUrl;
    }
    editStaff({
      variables: {
        input: {
          ...payload,
          photoUrl,
          fileId,
          allergies: selectedAllergies.map(item => item.id),
          id: parseInt(data.id)
        }
      }
    });
  };

  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    setSelectedAllergies(data.allergies.edges.map(item => item.node))
    setPayload({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      phone: data.phone,
      role: data.role
    });
  }, [data])


  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' mb={4}>
        <Typography variant='h4'>Edit Staff</Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>
      <Stack direction='row' alignItems='center' gap={2}>
        <Avatar sx={{ width: { xs: '60px', lg: '96px' }, height: { xs: '60px', lg: '96px' } }}
          src={file ? URL.createObjectURL(file) : data ? data.photoUrl : ''} />
        <Box sx={{
          bgcolor: 'primary.main',
          width: { xs: '200px', md: '100%' },
          padding: '12px 24px',
          borderRadius: '6px',
          color: '#fff'
        }}>
          <input onChange={(e) => {
            const file = e.target.files[0];
            const maxFileSize = 500 * 1024; // 500KB in bytes
            if (file.size > maxFileSize) {
              alert(`File ${file.name} is too large. Please select a file smaller than 500KB.`);
              return
            }
            setFile(e.target.files[0])
          }} type="file" id='staffImg' accept='jpg,png' />
        </Box>
      </Stack>
      <FormGroup>
        <Stack mt={4}>
          <Stack direction='row' gap={2} mb={2}>
            <Stack flex={1} gap={2}>
              <TextField value={payload.firstName} onChange={handleInputChange} name='firstName' size='small' label='First Name' />
              <TextField value={payload.username} onChange={handleInputChange} helperText={errors.username} error={Boolean(errors.username)} name='username' size='small' label='User Name' />
              <FormControl error={Boolean(errors.role)} size='small' fullWidth>
                <InputLabel>Staff Role</InputLabel>
                <Select
                  value={payload.role}
                  label="Staff Role"
                  onChange={(e) => setPayload({ ...payload, role: e.target.value })}
                >
                  <MenuItem value={'company-manager'}>Manager</MenuItem>
                  <MenuItem value={'company-employee'}>Employee</MenuItem>
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>
            </Stack>
            <Stack flex={1} gap={2}>
              <TextField value={payload.lastName} onChange={handleInputChange} name='lastName' size='small' label='Last Name' />
              <TextField value={payload.email} helperText={errors.email} error={Boolean(errors.email)} onChange={handleInputChange} name='email' size='small' label='Email' />
              <TextField value={payload.phone} helperText={errors.phone} error={Boolean(errors.phone)} onChange={handleInputChange} name='phone' size='small' label='Phone Number' />
            </Stack>
          </Stack>
        </Stack>
      </FormGroup>

      <Autocomplete
        size='small'
        multiple
        options={allAllergies}
        disableCloseOnSelect
        value={selectedAllergies}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => setSelectedAllergies(value.map(item => item))}
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

      <CButton
        isLoading={editStaffLoading || fileUploadLoading}
        onClick={handleEditStaff}
        variant='contained'
        style={{ width: '100%', my: 2, height: { xs: '45px', md: '45px' } }}
      >
        Update
      </CButton>

      <Button onClick={() => setResetPassDialogOpen(true)}>Reset Password</Button>

      {/* reset password */}
      <CDialog openDialog={resetPassDialogOpen} closeDialog={() => setResetPassDialogOpen(false)} >
        <UserPassReset data={data} closeDialog={() => setResetPassDialogOpen(false)} />
      </CDialog>

    </Box >
  )
}

export default EditStaff