import { CheckBox, CheckBoxOutlineBlank, Delete } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Button, Checkbox, FormControl, FormGroup, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CButton from '../../../../common/CButton/CButton'
import { useMutation, useQuery } from '@apollo/client'
import { GENERAL_PROFILE_UPDATE } from './graphql/mutation'
import { ME } from '../../../../graphql/query'
import toast from 'react-hot-toast'
import { GET_INGREDIENTS } from '../../manageStaff/graphql/query'
import Loader from '../../../../common/loader/Index'
import ErrorMsg from '../../../../common/ErrorMsg/ErrorMsg'
import { uploadFile } from '../../../../utils/uploadFile'
import { deleteFile } from '../../../../utils/deleteFile'


const General = () => {
  const [file, setFile] = useState(null)
  const [payloadEditOn, setPayloadEditOn] = useState(false);
  const [errors, setErrors] = useState([])
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergiesId, setSelectedAllergiesId] = useState([]);
  const [fileUploadLoading, setFileUploadLoading] = useState(false)


  const [payload, setPayload] = useState({
    firstName: '',
    lastName: '',
    address: '',
    // postCode: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    about: ''
  })

  const { data: user } = useQuery(ME);

  const toggleAllergy = (allergy) => {
    const isSelected = selectedAllergiesId.includes(allergy);
    if (isSelected) {
      setSelectedAllergiesId(selectedAllergiesId.filter(item => item !== allergy));
    } else {
      setSelectedAllergiesId([...selectedAllergiesId, allergy]);
    }
  };



  const [profileUpdate, { loading: updateLoading }] = useMutation(GENERAL_PROFILE_UPDATE, {
    refetchQueries: [
      { query: ME }
    ],
    onCompleted: (res) => {
      const data = res.generalProfileUpdate
      toast.success(data.message);
      setPayloadEditOn(false)
      setErrors({})
    },
    onError: (err) => {
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const graphqlError = err.graphQLErrors[0];
        const { extensions } = graphqlError;
        if (extensions && extensions.errors) {
          setErrors(Object.values(extensions.errors));
        }
      }
    }
  })

  //get all allergies
  const { error: ingredientErr, loading: ingredientLoading } = useQuery(GET_INGREDIENTS, {
    onCompleted: (res) => {
      setAllergies(res.ingredients.edges)
    }
  });


  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  };

  const handleUpdate = async () => {
    const postCodeValue = parseInt(payload.postCode);
    const dateOfBirthValue = payload.dateOfBirth !== undefined ? payload.dateOfBirth : null;
    let photoUrl = user.me.photoUrl;
    let fileId = user.me.fileId;
    if (file) {
      setFileUploadLoading(true)
      const { public_id, secure_url } = await uploadFile(file, 'owners')
      if (user.me.fileId) {
        await deleteFile(user.me.fileId)
      }
      photoUrl = secure_url
      fileId = public_id
      setFileUploadLoading(false)
    }
    profileUpdate({
      variables: {
        input: {
          ...payload,
          id: user.id,
          postCode: postCodeValue,
          dateOfBirth: dateOfBirthValue,
          allergies: selectedAllergiesId,
          photoUrl,
          fileId
        }
      }
    })
  }

  useEffect(() => {
    setPayload({
      firstName: user?.me.firstName ? user.me.firstName : '',
      lastName: user?.me.lastName ? user.me.lastName : '',
      address: user?.me.address ? user.me.address : '',
      // postCode: user?.me.postCode ? user.me.postCode : '',
      dateOfBirth: user?.me.dateOfBirth ? user.me.dateOfBirth : null,
      gender: user?.me.gender ? user.me.gender : '',
      phone: user?.me.phone ? user.me.phone : '',
      about: user?.me.about ? user.me.about : ''
    });
    if (user?.me.allergies) {
      setSelectedAllergiesId(user?.me.allergies.edges.map(item => item.node.id))
    }
  }, [user]);


  return (
    <Box>
      <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1 }}>Profile</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>View and update your profile  details</Typography>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={3} alignItems='center' justifyContent='space-between' mt={1}>
        <Stack direction='row' gap={3} alignItems='center'>
          {
            payloadEditOn &&
            <>
              <Avatar src={file ? URL.createObjectURL(file) : user?.me.photoUrl ? user?.me.photoUrl : ''} sx={{ width: '80px', height: '80px' }} />
              <label style={{
                border: '1px solid lightgray',
                padding: '5px 24px',
                borderRadius: '6px',
              }} htmlFor="avatar">Choose</label>
            </>
          }
          <input onChange={(e) => setFile(e.target.files[0])} type="file" id="avatar" hidden accept="jpg,png,gif" />
          {/* <Button disabled={!payloadEditOn} onClick={() => setFile(null)} startIcon={<Delete />}>Remove</Button> */}
        </Stack>
      </Stack>
      <FormGroup>
        <Stack mt={4}>
          <Stack direction='row' gap={2} mb={2}>
            <Stack flex={1} gap={2}>
              <TextField disabled={!payloadEditOn} value={payload.firstName} onChange={handleInputChange} name='firstName' size='small' label='First Name' />
              <TextField disabled={!payloadEditOn} value={payload.address} onChange={handleInputChange} name='address' size='small' label='Address' />
              <TextField disabled={!payloadEditOn} value={payload.phone} onChange={handleInputChange} name='phone' size='small' label='Phone number' />
            </Stack>
            <Stack flex={1} gap={2}>
              <TextField disabled={!payloadEditOn} value={payload.lastName} onChange={handleInputChange} name='lastName' size='small' label='Last Name' />
              {/* <TextField disabled={!payloadEditOn} value={payload.postCode} onChange={handleInputChange} name='postCode' type='number' size='small' label='Post Code' /> */}
              <FormControl disabled={!payloadEditOn} size='small'>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  value={payload.gender}
                  label="Gender"
                  name='gender'
                  onChange={handleInputChange}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              </FormControl>
              <TextField disabled={!payloadEditOn} value={payload.dateOfBirth ? payload.dateOfBirth : ''} name='dateOfBirth' onChange={handleInputChange} size='small' type='date' helperText={`Date of birth`} />

            </Stack>
          </Stack>
          <TextField disabled={!payloadEditOn} value={payload.about} onChange={handleInputChange} name='about' size='small' label='About' multiline rows={2} />
          {/* allergies */}
          {
            payloadEditOn &&
            <Box mt={2}>
              <Typography variant='h6' mb={1}>Allergies</Typography>
              <Stack direction='row' flexWrap='wrap'>
                {ingredientLoading ? <Loader /> : ingredientErr ? <ErrorMsg /> : allergies.map((allergy, index) => (
                  <Box
                    key={index}
                    onClick={() => toggleAllergy(allergy.node.id)}
                    sx={{
                      padding: { xs: '3px 5px', md: '6px 10px' },
                      margin: '5px',
                      cursor: 'pointer',
                      border: '1px solid lightgray',
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
            </Box>
          }
          {
            errors.length > 0 &&
            <ul style={{ color: 'red', fontSize: '13px' }}>
              {
                errors.map((err, id) => (
                  <li key={id}>{err}</li>
                ))
              }
            </ul>
          }
        </Stack>
      </FormGroup>
      <Stack direction='row' mt={2} justifyContent='space-between'>
        <Box></Box>
        {
          payloadEditOn ?
            <Stack direction='row' alignItems='center' gap={2}>
              <CButton onClick={() => setPayloadEditOn(false)} variant='outlined'>Cencel</CButton>
              <CButton isLoading={updateLoading || fileUploadLoading} onClick={handleUpdate} variant='contained'>Save Changes</CButton>
            </Stack> :
            <CButton onClick={() => setPayloadEditOn(true)} variant='contained'>Edit</CButton>
        }
      </Stack>
    </Box>
  )
}

export default General