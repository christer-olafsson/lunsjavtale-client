import { Avatar, Box, FormGroup, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'
import { ME } from '../../../../../graphql/query'
import { COMPANY_MUTATION } from '../../graphql/mutation'
import { uploadFile } from '../../../../../utils/uploadFile'
import { deleteFile } from '../../../../../utils/deleteFile'
import CButton from '../../../../../common/CButton/CButton'

const CompanyProfile = () => {
  const [file, setFile] = useState(null)
  const [payloadEditOn, setPayloadEditOn] = useState(false);
  const [errors, setErrors] = useState([])
  const [fileUploadLoading, setFileUploadLoading] = useState(false)
  const [payload, setPayload] = useState({
    name: '',
    firstName: '',
    description: '',
    email: '',
    contact: '',
    postCode: '',
    noOfEmployees: '',
    formationDate: null,
    address: '',
  })

  const { data: user } = useQuery(ME);
  console.log(user?.me)

  const [CompanyProfileUpdate, { loading: updateLoading }] = useMutation(COMPANY_MUTATION, {
    refetchQueries: [
      { query: ME }
    ],
    onCompleted: (res) => {
      toast.success(res.companyMutation.message);
      setPayloadEditOn(false)
      setErrors({})
    },
    onError: (err) => {
      toast.error(err.message)
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const graphqlError = err.graphQLErrors[0];
        const { extensions } = graphqlError;
        if (extensions && extensions.errors) {
          setErrors(extensions.errors);
        }
      }
    }
  })

  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  };

  const handleUpdate = async () => {
    let fileId = user.me.fileId;
    if (!payload.name) {
      setErrors({ name: 'Company Name Required!' });
      return
    }
    if (!payload.firstName) {
      setErrors({ firstName: 'Owner Name Required!' });
      return
    }
    if (!payload.postCode) {
      setErrors({ postCode: 'Post Code Required!' });
      return
    }
    if (!payload.email) {
      setErrors({ email: 'Email Required!' });
      return
    }
    if (!payload.contact) {
      setErrors({ contact: 'Contact Number Required!' });
      return
    }
    let logoUrl = user.me.company.logoUrl;
    if (file) {
      setFileUploadLoading(true)
      const { public_id, secure_url } = await uploadFile(file, 'companies')
      if (user.me.company.fileId) {
        await deleteFile(user.me.company.fileId)
      }
      logoUrl = secure_url
      fileId = public_id
      setFileUploadLoading(false)
    }
    CompanyProfileUpdate({
      variables: {
        input: {
          ...payload,
          id: user?.me.company.id,
          postCode: parseInt(payload.postCode),
          workingEmail: payload.email,
          noOfEmployees: parseInt(payload.noOfEmployees),
          logoUrl,
          fileId
        }
      }
    })
  }

  useEffect(() => {
    const company = user?.me.company
    setPayload({
      name: company.name ?? '',
      firstName: user?.me.firstName ?? '',
      description: company.description ?? '',
      email: company.email ?? '',
      contact: company.contact ?? '',
      postCode: company.postCode ?? '',
      noOfEmployees: company.noOfEmployees ?? '',
      formationDate: company.formationDate ?? null,
      address: '',
    });
  }, [user]);


  return (
    <Box>
      <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 1 }}>Company Profile</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>View and update your Company profile  details</Typography>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={3} alignItems='center' justifyContent='space-between' mt={1}>
        <Stack direction='row' gap={3} alignItems='center'>
          {
            payloadEditOn &&
            <>
              <Avatar src={
                file ? URL.createObjectURL(file)
                  : user?.me.photoUrl
                    ? user?.me.photoUrl
                    : ''}
                sx={{ width: '80px', height: '80px' }} />
              <label style={{
                border: '1px solid lightgray',
                padding: '5px 24px',
                borderRadius: '6px',
              }} htmlFor="avatar">Choose</label>
            </>
          }
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="avatar"
            hidden accept="jpg,png,gif"
          />
          {/* <Button disabled={!payloadEditOn} onClick={() => setFile(null)} startIcon={<Delete />}>Remove</Button> */}
        </Stack>
      </Stack>
      <FormGroup>
        <Stack mt={4}>
          <Stack direction='row' gap={2} mb={2}>
            <Stack flex={1} gap={2}>
              <TextField
                helperText={errors.name}
                error={Boolean(errors.name)}
                disabled={!payloadEditOn}
                value={payload.name}
                onChange={handleInputChange}
                name='name'
                size='small'
                label='Company Name'
              />
              <TextField
                disabled={!payloadEditOn}
                value={payload.noOfEmployees}
                onChange={handleInputChange}
                name='noOfEmployees'
                size='small'
                label='No Of Employees'
              />
              <TextField
                helperText={errors.email}
                error={Boolean(errors.email)}
                disabled={!payloadEditOn}
                value={payload.email}
                onChange={handleInputChange}
                name='email'
                size='small'
                label='Email'
              />
              <TextField
                disabled={!payloadEditOn}
                value={payload.formationDate ? payload.formationDate : ''}
                name='formationDate'
                onChange={handleInputChange}
                size='small'
                type='date'
                helperText={`Formation Date`} />
            </Stack>
            <Stack flex={1} gap={2}>
              <TextField
                helperText={errors.firstName}
                error={Boolean(errors.firstName)}
                disabled={!payloadEditOn}
                value={payload.firstName}
                onChange={handleInputChange}
                name='firstName'
                size='small'
                label='Owner Name' />
              <TextField
                helperText={errors.postCode}
                error={Boolean(errors.postCode)}
                disabled={!payloadEditOn}
                value={payload.postCode}
                onChange={handleInputChange}
                name='postCode'
                size='small'
                label='Post Code' />
              <TextField
                helperText={errors.contact}
                error={Boolean(errors.contact)}
                disabled={!payloadEditOn}
                value={payload.contact}
                onChange={handleInputChange}
                name='contact'
                size='small'
                label='Contact number'
              />
            </Stack>
          </Stack>
          <TextField
            sx={{ mb: 2 }}
            disabled={!payloadEditOn}
            value={payload.address}
            onChange={handleInputChange}
            name='address'
            size='small'
            label='Address'
          />
          <TextField
            disabled={!payloadEditOn}
            value={payload.description}
            onChange={handleInputChange}
            name='description'
            size='small'
            label='Description'
            multiline
            rows={2}
          />
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

export default CompanyProfile