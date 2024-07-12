/* eslint-disable no-unused-vars */
import { Box, Button, Input, Stack, TextField, Typography } from '@mui/material'
import { CREATE_COMPANY } from './graphql/mutation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg';
import CButton from '../../common/CButton/CButton';

const inputStyle = {
  width: '100%',
  padding: '8px 24px',
  border: '1px solid gray',
  borderRadius: '50px', mb: 1.5
}

const PostCodeNotAvailable = ({ handleNotAvailabe, postCode }) => {
  const [regSuccess, setRegSuccess] = useState(null);
  const [errors, setErrors] = useState([]);
  const [payloadErr, setPayloadErr] = useState({
    company: '',
    email: '',
    phone: '',
  });
  const [payload, setPayload] = useState({
    company: '',
    email: '',
    phone: '',
  });


  const [createCompany, { data, loading, error: createErr }] = useMutation(CREATE_COMPANY, {
    onCompleted: (res) => {
      toast.success(res.createCompany.message)
      setRegSuccess(res.createCompany.success)
      setPayload({
        company: '',
        email: '',
        phone: '',
      })
      setPayloadErr({})
      setErrors([])
    },
    onError: (err) => {
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const graphqlError = err.graphQLErrors[0];
        const { extensions } = graphqlError;
        if (extensions && extensions.errors) {
          setErrors(Object.values(extensions.errors));
          // const { name, workingEmail, email, contact, password } = extensions.errors;
        }
      }
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value })
  }

  const handleSubmit = () => {
    if (!payload.company) {
      setPayloadErr({ ...payloadErr, company: 'Firmanavn er påkrevd!' })
      return
    }
    if (!payload.email) {
      setPayloadErr({ ...payloadErr, email: 'E-post er påkrevd!' })
      return
    }
    if (!payload.phone) {
      setPayloadErr({ ...payloadErr, phone: 'Kontakttelefon er påkrevd!' })
      return
    }
    createCompany({
      variables: {
        input: {
          name: payload.company,
          email: payload.email,
          workingEmail: payload.email,
          contact: payload.phone,
          postCode: parseInt(postCode)
        }
      }
    })
  }

  return (
    <Stack sx={{ flex: 1 }}>
      {
        createErr && <ErrorMsg />
      }
      {
        regSuccess ?
          <Typography sx={{
            width: '100%',
            padding: '8px 24px',
            bgcolor: 'light.main',
            borderRadius: '8px',
            fontSize: '18px',
            color: 'primary.main'
          }}>Takk for innsending! Vi har mottatt informasjonen din.</Typography> :
          <Stack gap={2}>
            <Typography sx={{
              width: '100%',
              padding: '8px 24px',
              bgcolor: '#C94F2A',
              color: '#fff',
              fontSize: '18px',
              borderRadius: '8px'
            }}>
              Vi leverer ikke til dette postnummeret ennå. Men fyll ut feltene nedenfor, så skal vi se hva vi kan gjøre. 🧑‍🍳
            </Typography>
            <Typography sx={{ fontSize: '24px', fontWeight: '600', my: 2 }}>Informasjon om bedriften din</Typography>
            <TextField value={payload.company} helperText={payloadErr.company} error={Boolean(payloadErr.company)} onChange={handleInputChange} name='company' placeholder='Firmanavn' />
            <TextField value={payload.email} helperText={payloadErr.email} error={Boolean(payloadErr.email)} onChange={handleInputChange} name='email' placeholder='Din arbeids-e-post' />
            <TextField value={payload.phone} helperText={payloadErr.phone} error={Boolean(payloadErr.phone)} onChange={handleInputChange} type='number' name='phone' placeholder='Ditt mobilnummer' />
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
            <Stack direction='row' gap={2} mt={2}>
              <Button onClick={handleNotAvailabe}>Tilbake</Button>
              <CButton isLoading={loading} onClick={handleSubmit} variant='contained'>Send inn</CButton>
            </Stack>
          </Stack>
      }
    </Stack>
  )
}

export default PostCodeNotAvailable;
