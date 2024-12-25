import { Box, Button, DialogActions, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../../common/CButton/CButton'
import { useMutation } from '@apollo/client';
import { USER_DELETE } from './graphql/mutation';
import toast from 'react-hot-toast';
import { deleteFile } from '../../../utils/deleteFile';
import { GET_COMPANY_STAFFS } from './graphql/query';

const UserDelete = ({ data, closeDialog, closeDeleteDialog }) => {
  const [loadingFiledelete, setLoadingFileDelete] = useState(false)


  const [userDelete, { loading: userDeleteLoading }] = useMutation(USER_DELETE, {
    onCompleted: (res) => {
      toast.success(res.userDelete.message)
      closeDeleteDialog()
      closeDialog()
    },
    refetchQueries: [GET_COMPANY_STAFFS],
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const handlStaffDelete = async () => {
    setLoadingFileDelete(true)
    await deleteFile(data.fileId);
    setLoadingFileDelete(false)
    userDelete({
      variables: {
        email: data.email
      }
    })
  }
  return (
    <Box>
      <Typography variant='h5'>Bekreft fjerning <i style={{ color: 'red' }}>@{data.username}</i>?</Typography>
      <Typography color='red'>Denne brukeren vil bli permanent fjernet fra ansattlisten</Typography>
      <DialogActions>
        <Button variant='outlined' onClick={() => closeDeleteDialog()}>Avbryt</Button>
        <CButton isLoading={userDeleteLoading || loadingFiledelete} onClick={handlStaffDelete} variant='contained'>Bekreft</CButton>
      </DialogActions>
    </Box>
  )
}

export default UserDelete