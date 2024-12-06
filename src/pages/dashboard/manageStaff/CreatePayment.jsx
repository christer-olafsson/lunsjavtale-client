/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client';
import { Close } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, FormGroup, IconButton, Stack, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast';
import { MAKE_ONLINE_PAYMENT } from '../payment/graphql/mutation';
import CButton from '../../../common/CButton/CButton';
import { useEffect, useState } from 'react';
import { GET_COMPANY_STAFFS } from './graphql/query';
import { ME } from '../../../graphql/query';

const CreatePayment = ({ closeDialog }) => {
  const [staffs, setStaffs] = useState([])
  const [selectedStaff, setSelectedStaff] = useState({})
  const [paidAmount, setPaidAmount] = useState('')

  const { data: user } = useQuery(ME)

  const [createPayment, { loading: paymentLoading }] = useMutation(MAKE_ONLINE_PAYMENT, {
    onCompleted: (res) => {
      if (res.makeOnlinePayment.paymentUrl) {
        window.location.href = res.makeOnlinePayment.paymentUrl
      }
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const { loading: usersLoading } = useQuery(GET_COMPANY_STAFFS, {
    onCompleted: (res) => {
      const data = res.companyStaffs.edges.filter(({ node }) => !node.isDeleted).map(data => data.node);
      setStaffs(data)
    },
  });


  const handlePay = () => {
    if (!selectedStaff.id) {
      toast.error('Vennligst velg ansatt')
      return
    }
    if (!paidAmount) {
      toast.error('Beløp er tomt')
      return
    }
    createPayment({
      variables: {
        input: {
          company: user.me.company.id,
          paidAmount: paidAmount,
          paymentFor: selectedStaff.id,
        }
      }
    })
  }

  useEffect(() => {
    if (selectedStaff) {
      setPaidAmount(selectedStaff?.dueAmount ?? '')
    }
  }, [selectedStaff])


  return (
    <Box>

      <Stack direction='row' justifyContent='space-between' mb={1}>
        <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
          Opprett betaling for ansatt
        </Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>
      {/* user select */}
      <Autocomplete
        sx={{ mb: 2 }}
        options={staffs}
        loading={usersLoading}
        onChange={(_, value) => setSelectedStaff(value)}
        getOptionLabel={(option) => option.email}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Stack direction='row' gap={2}>
              <Avatar src={option.photoUrl ?? ''} />
              <Box>
                <Typography sx={{ fontSize: '14px' }}> <b>E-post: </b> {option.email}</Typography>
                <Typography sx={{ fontSize: '14px' }}><b>Brukernavn: </b>{option.username}</Typography>
                <Typography sx={{ fontSize: '14px' }}> <b>Skyldig: </b> {option.dueAmount}</Typography>
              </Box>
            </Stack>

          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Betaling for (Bruker)" />
        )}
      />

      <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          onChange={e => setPaidAmount(e.target.value)}
          value={paidAmount}
          label='Beløp'
          type='number'
          InputProps={{ readOnly: true }}
        />
      </FormGroup>

      <CButton disable={selectedStaff?.dueAmount === '0.00'} isLoading={paymentLoading} onClick={handlePay} variant='contained' style={{ width: '100%', mt: 2 }}>
        Bekreft
      </CButton>

    </Box>
  )
}

export default CreatePayment