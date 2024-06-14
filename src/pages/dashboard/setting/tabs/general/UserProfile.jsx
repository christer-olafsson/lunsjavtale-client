import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Checkbox, FormControl, FormGroup, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'
import { ME } from '../../../../../graphql/query'
import { GENERAL_PROFILE_UPDATE } from '../../graphql/mutation'
import { GET_INGREDIENTS } from '../../../manageStaff/graphql/query'
import { uploadFile } from '../../../../../utils/uploadFile'
import { deleteFile } from '../../../../../utils/deleteFile'
import CButton from '../../../../../common/CButton/CButton'


const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const UserProfile = () => {
  const [file, setFile] = useState(null)
  const [payloadEditOn, setPayloadEditOn] = useState(false);
  const [errors, setErrors] = useState([])
  const [allAllergies, setAllAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
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
  useQuery(GET_INGREDIENTS, {
    onCompleted: (res) => {
      setAllAllergies(res.ingredients.edges.map(item => item.node))
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
          allergies: selectedAllergies.map(item => item.id),
          photoUrl,
          fileId
        }
      }
    })
  }
console.log(selectedAllergies)
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
      setSelectedAllergies(user?.me.allergies.edges.map(item => item.node))
    }
  }, [user]);


  return (
    <Box>
      <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1 }}>User Profile</Typography>
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
            <CButton disable={user?.me.company.isBlocked} onClick={() => setPayloadEditOn(true)} variant='contained'>Edit</CButton>
        }
      </Stack>
    </Box>
  )
}

export default UserProfile