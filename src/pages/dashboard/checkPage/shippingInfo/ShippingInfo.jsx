import { Box, Button, DialogActions, Divider, FormControlLabel, FormGroup, IconButton, Paper, Stack, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddAddress from './AddAddress'
import { useMutation, useQuery } from '@apollo/client'
import { useTheme } from '@emotion/react'
import { CheckCircle } from '@mui/icons-material'
import EditAddress from './EditAddress'
import toast from 'react-hot-toast'
import CDialog from '../../../../common/dialog/CDialog'
import Loader from '../../../../common/loader/Index'
import ErrorMsg from '../../../../common/ErrorMsg/ErrorMsg'
import CButton from '../../../../common/CButton/CButton'
import { ADDRESSES } from '../graphql/query'
import { ADDRESS_DELETE } from '../graphql/mutation'

const ShippingInfo = ({shippingInfoErr}) => {
  const [openAddAddressDialog, setOpenAddAddressDialog] = useState(false);
  const [openEditAddressDialog, setOpenEditAddressDialog] = useState(false);
  const [addresses, setAddresses] = useState([])
  const [editedAddressData, setEditedAddressData] = useState({})
  const [addressDeleteDialog, setAddressDeleteDialog] = useState(false)
  const [deletedAddressId, setDeletedAddressId] = useState('')
console.log(shippingInfoErr)
  const theme = useTheme()

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
      <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Shipping Information</Typography>
      <Stack direction='row' justifyContent='space-between' my={2}>
        <Box />
        <Button onClick={() => setOpenAddAddressDialog(true)} variant='outlined'>Add Address</Button>
      </Stack>
      {/* add address */}
      <CDialog openDialog={openAddAddressDialog}>
        <AddAddress closeDialog={() => setOpenAddAddressDialog(false)} />
      </CDialog>
        {
          shippingInfoErr && <Typography sx={{
            color:'red',
            bgcolor:'#F7DADA',
            p:1.5,borderRadius:'8px'
          }}>Select or add new shipping address</Typography>
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
                    {item.addressType === "permanent-address" ? 'PERMANENT ADDRESS' : 'OFFICE ADDRESS'}
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
                <Button onClick={() => handleEdit(item)}>Edit and Select</Button>
                <Button onClick={() => (setDeletedAddressId(item.id), setAddressDeleteDialog(true))}>Remove</Button>
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
                  <Typography variant='h5'>Confirm Remove?</Typography>
                  <DialogActions>
                    <CButton variant='outlined' onClick={() => setAddressDeleteDialog(false)}>Cancel</CButton>
                    <CButton isLoading={addressDeleteLoading} onClick={handlAddressDelete} variant='contained'>Confirm</CButton>
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