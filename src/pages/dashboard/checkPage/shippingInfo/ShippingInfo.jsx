import { Box, Button, DialogActions, Divider, FormControlLabel, FormGroup, IconButton, Paper, Stack, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddAddress from './AddAddress'
import { useMutation, useQuery } from '@apollo/client'
import { useTheme } from '@emotion/react'
import { CheckCircle, RemoveCircle } from '@mui/icons-material'
import EditAddress from './EditAddress'
import toast from 'react-hot-toast'
import CDialog from '../../../../common/dialog/CDialog'
import Loader from '../../../../common/loader/Index'
import ErrorMsg from '../../../../common/ErrorMsg/ErrorMsg'
import CButton from '../../../../common/CButton/CButton'
import { ADDRESSES } from '../graphql/query'
import { ADDRESS_DELETE } from '../graphql/mutation'
import { useLocation } from 'react-router-dom'

const ShippingInfo = ({ shippingInfoErr }) => {
  const [openAddAddressDialog, setOpenAddAddressDialog] = useState(false);
  const [openEditAddressDialog, setOpenEditAddressDialog] = useState(false);
  const [addresses, setAddresses] = useState([])
  const [editedAddressData, setEditedAddressData] = useState({})
  const [addressDeleteDialog, setAddressDeleteDialog] = useState(false)
  const [deletedAddressId, setDeletedAddressId] = useState('')

  const theme = useTheme()
  const { pathname } = useLocation()

  const { loading, error } = useQuery(ADDRESSES, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (res) => {
      setAddresses(res.addresses.edges.map(item => item.node))
    }
  })

  const [addressDelete, { loading: addressDeleteLoading }] = useMutation(ADDRESS_DELETE, {
    onCompleted: (res) => {
      toast.success(res.addressDelete.message)
      setAddressDeleteDialog(false)
    },
    refetchQueries: [ADDRESSES],
    onError: (err) => {
      toast.error(err.message)
    }
  });


  const handleEdit = (data) => {
    setEditedAddressData(data)
    setOpenEditAddressDialog(true)
  }

  const handlAddressDelete = () => {
    addressDelete({
      variables: {
        id: deletedAddressId
      }
    })
  }

  return (
    <Stack>
      {
        pathname !== '/dashboard/setting' &&
        <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Fraktinformasjon</Typography>
      }
      <Stack direction='row' justifyContent='space-between' my={2}>
        <Box />
        <Button onClick={() => setOpenAddAddressDialog(true)} variant='outlined'>Legg til adresse</Button>
      </Stack>
      {/* add address */}
      <CDialog openDialog={openAddAddressDialog}>
        <AddAddress closeDialog={() => setOpenAddAddressDialog(false)} />
      </CDialog>
      {
        shippingInfoErr && <Typography sx={{
          color: 'red',
          bgcolor: '#F7DADA',
          p: 1.5, borderRadius: '8px'
        }}>Velg eller legg til ny leveringsadresse</Typography>
      }
      {
        loading ? <Loader /> : error ? <ErrorMsg /> :
          addresses.map(item => (
            <Paper elevation={4} key={item.id} sx={{
              pt: 3, pl: 3, pr: 3, pb: 1, mt: 4,
              border: item.default ? `1px solid ${theme.palette.primary.main}` : '#fff',
              bgcolor: item.default ? 'light.main' : '#fff',
            }}>
              <Box>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 2 }}>
                    {item.addressType === "permanent-address" ? 'PERMANENT ADRESSE' : 'KONTORADRESSE'}
                  </Typography>
                  {
                    item.default &&
                    <CheckCircle sx={{ alignSelf: 'flex-end', color: 'primary.main' }} />
                  }
                </Stack>
                <Typography>{item.fullName}</Typography>
                <Typography>{item.address}</Typography>
              </Box>
              <Divider sx={{ mt: 2 }} />
              <Stack direction='row' justifyContent='space-between'>
                <Button onClick={() => handleEdit(item)}>Rediger og velg</Button>
                <IconButton onClick={() => (setDeletedAddressId(item.id), setAddressDeleteDialog(true))}>
                  <RemoveCircle />
                </IconButton>
              </Stack>
              {/* edit address */}
              {
                editedAddressData.id === item.id &&
                <CDialog openDialog={openEditAddressDialog}>
                  <EditAddress data={editedAddressData} closeDialog={() => setOpenEditAddressDialog(false)} />
                </CDialog>
              }
              {/* delete address */}
              {
                deletedAddressId === item.id &&
                <CDialog openDialog={addressDeleteDialog} closeDialog={() => setAddressDeleteDialog(false)} >
                  <Typography variant='h5'>Bekreft fjerning?</Typography>
                  <DialogActions>
                    <CButton variant='outlined' onClick={() => setAddressDeleteDialog(false)}>Avbryt</CButton>
                    <CButton isLoading={addressDeleteLoading} onClick={handlAddressDelete} variant='contained'>Bekreft</CButton>
                  </DialogActions>
                </CDialog>
              }
            </Paper>
          ))
      }

    </Stack>
  )
}

export default ShippingInfo