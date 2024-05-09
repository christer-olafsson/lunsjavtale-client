import { ArrowDropDown, Close } from '@mui/icons-material'
import { Avatar, Box, Button, Collapse, FormControl, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../../common/CButton/CButton';
import { useTheme } from '@emotion/react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_COMPANY_STAFF } from './graphql/mutation';
import { GET_INGREDIENTS } from './graphql/query';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import toast from 'react-hot-toast';
import { fileUpload } from '../../../utils/fileHandle/fileUpload';
import { fileDelete } from '../../../utils/fileHandle/fileDelete';
import { ME } from '../../../graphql/query';


const AddStaff = ({ closeDialog, getCompanyStaffs }) => {
  const [file, setFile] = useState(null);
  const [selectedAllergiesId, setSelectedAllergiesId] = useState([]);
  const [allAllergies, setAllAllergies] = useState([]);
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [allergySecOpen, setAllergySecOpen] = useState(false)
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
    setRole(event.target.value);
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
          // setErrors(Object.values(extensions.errors));
          // const { name, workingEmail, email, contact, password } = extensions.errors;
        }
      }
    }
  });

  const handleAddStaff = async () => {
    let photoUrl = '';
    if (file) {
      setFileUploadLoading(true)
      const { location } = await fileUpload(file, 'staff');
      setFileUploadLoading(false)
      photoUrl = location
    }
    createStaff({
      variables: {
        input: {
          ...payload,
          photoUrl: photoUrl,
          role: role,
          allergies: selectedAllergiesId
        }
      }
    })
  }

  // const handleDelete = async () => {
  //   const data = await fileDelete()
  //   console.log(data)
  // }

  //get all allergies
  const { error: ingredientErr, loading: ingredientLoading } = useQuery(GET_INGREDIENTS, {
    onCompleted: (res) => {
      setAllAllergies(res.ingredients.edges)
    }
  })


  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const theme = useTheme()

  const toggleAllergy = (allergy) => {
    const isSelected = selectedAllergiesId.includes(allergy);
    if (isSelected) {
      setSelectedAllergiesId(selectedAllergiesId.filter(item => item !== allergy));
    } else {
      setSelectedAllergiesId([...selectedAllergiesId, allergy]);
    }
  };


  return (
    <Box>
      {/* <button onClick={handleDelete}>delete staff</button> */}
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
                  value={role}
                  label="Staff Role"
                  onChange={handleRoleChange}
                >
                  {
                    user?.me.role === 'owner' &&
                    <MenuItem value={'manager'}>Manager</MenuItem>
                  }
                  <MenuItem value={'employee'}>Employee</MenuItem>
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>
              {/* <TextField name='userName' size='small' label='User Name' /> */}
            </Stack>
            <Stack flex={1} gap={2}>
              <TextField onChange={handleInputChange} name='lastName' size='small' label='Last Name' />
              <TextField helperText={errors.email} error={Boolean(errors.email)} onChange={handleInputChange} name='email' size='small' label='Email' />
              <TextField helperText={errors.phone} error={Boolean(errors.phone)} onChange={handleInputChange} name='phone' size='small' label='Phone Number' />
            </Stack>
          </Stack>
        </Stack>
      </FormGroup>

      <Box >
        <Button onClick={() => setAllergySecOpen(!allergySecOpen)} variant='outlined' endIcon={<ArrowDropDown />}>Select Allergies</Button>
        <Collapse in={allergySecOpen}>
          <Typography variant='h6' mb={1}>Allergies</Typography>
          <Stack direction='row' flexWrap='wrap'>
            {ingredientLoading ? <Loader /> : ingredientErr ? <ErrorMsg /> : allAllergies.map((allergy, index) => (
              <Box
                key={index}
                onClick={() => toggleAllergy(allergy.node.id)}
                sx={{
                  padding: { xs: '3px 5px', md: '6px 10px' },
                  margin: '5px',
                  cursor: 'pointer',
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '8px',
                  color: selectedAllergiesId.includes(allergy.node.id) ? '#fff' : 'inherit',
                  bgcolor: selectedAllergiesId.includes(allergy.node.id) ? 'primary.main' : 'transparent',
                  userSelect: 'none'
                }}
              >
                <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>{allergy.node.name}</Typography>
              </Box>
            ))}
          </Stack>
        </Collapse>
      </Box>

      {/* <Box sx={{
        padding: { xs: '5px 10px', md: '12px 24px' },
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px', mt: 2,
        textAlign: 'center'
      }}>
        <Typography sx={{ fontSize: { xs: '14px', lg: '16px' } }}>Nuts (almonds, hazelnuts, walnuts, cashews, pecans, pistachios, brazil nuts and
          macadamia nuts)</Typography>
      </Box> */}

      <CButton isLoading={createStaffLoading || fileUploadLoading} onClick={handleAddStaff} variant='contained' style={{ width: '100%', mt: 2, height: { xs: '45px', md: '45px' } }}>
        Add
      </CButton>

    </Box >
  )
}

export default AddStaff