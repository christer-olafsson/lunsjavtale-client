import { BorderColor, BorderColorOutlined, Close, Search } from '@mui/icons-material'
import { Box, Button, DialogActions, IconButton, Input, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/dashboard/DataTable'
import CDialog from '../../../common/dialog/CDialog';
import AddStaff from './AddStaff';
import EditStaff from './EditStaff';
import { useQuery } from '@apollo/client';
import { GET_COMPANY_STAFFS } from './graphql/query';
import LoadingBar from '../../../common/loadingBar/LoadingBar';
import { format } from 'date-fns';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import Loader from '../../../common/loader/Index';


const ManageStaff = () => {
  const [rowdata, setRowData] = useState([])
  const [addStaffDialogOpen, setAddStaffDilogOpen] = useState(false);
  const [editStaffDialogOpen, setEditStaffDilogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { loading, error } = useQuery(GET_COMPANY_STAFFS, {
    onCompleted: (res) => {
      const data = res.companyStaffs.edges
      setRowData(data)
    },
  });

  const rows = rowdata?.map(item => {
    return {
      id: item.node.id,
      name: item.node.firstName + ' ' + item.node.lastName,
      firstName: item.node.firstName,
      lastName: item.node.lastName,
      email: item.node.email,
      jobTitle: item.node.jobTitle,
      phone: item.node.phone,
      join: format(new Date(item.node.dateJoined), 'MMMM dd, yyyy')
    }
  })


  useEffect(() => {
    setColumnVisibilityModel({
      email: isMobile ? false : true,
      phone: isMobile ? false : true,
      join: isMobile ? false : true,
    })
  }, [isMobile])


  function handleStaffEdit(row) {
    setEditStaffDilogOpen(true)
    console.log(row)
  }
  function handleRemove(row) {
    setRemoveDialogOpen(true)
  }

  const columns = [
    { field: 'id', headerName: 'Staff ID', flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1
    },
    {
      field: 'join',
      headerName: 'Joining Date',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' gap={2} alignItems='center'>
          <IconButton sx={{
            bgcolor: 'light.main',
            borderRadius: '5px',
            width: '40px',
            height: '40px',
          }} onClick={() => handleStaffEdit(params.row)}>
            <BorderColor fontSize='small' />
          </IconButton>
          <IconButton sx={{
            border: '1px solid lightgray',
            borderRadius: '5px',
            width: '40px',
            height: '40px',
          }} onClick={() => handleRemove(params.row)}>
            <Close fontSize='small' />
          </IconButton>
        </Stack>
      ),
    },
  ];


  return (
    <Box maxWidth='xxl'>
      <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Manage Staff</Typography>
      <Stack direction='row' justifyContent='space-between' gap={2} sx={{
        p: { xs: .5, lg: 3 },
        mb: 4
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '480px',
          bgcolor: '#fff',
          width: '100%',
          border: '1px solid lightgray',
          borderRadius: '4px',
          pl: 2
        }}>
          <Input fullWidth disableUnderline placeholder='Search Staff' />
          <IconButton><Search /></IconButton>
        </Box>
        <Button onClick={() => setAddStaffDilogOpen(true)} variant='contained' sx={{ textWrap: 'nowrap' }}>Add Staff</Button>
      </Stack>
      {/* Add Staff */}
      <CDialog openDialog={addStaffDialogOpen} >
        <AddStaff closeDialog={() => setAddStaffDilogOpen(false)} />
      </CDialog>
      {/* edit staff */}
      <CDialog openDialog={editStaffDialogOpen} >
        <EditStaff closeDialog={() => setEditStaffDilogOpen(false)} />
      </CDialog>
      {/* remove staff */}
      <CDialog openDialog={removeDialogOpen} closeDialog={() => setRemoveDialogOpen(false)} >
        <Typography variant='h5'>Confirm Remove?</Typography>
        <DialogActions>
          <Button variant='outlined' onClick={() => setRemoveDialogOpen(false)}>Cancel</Button>
          <Button variant='contained'>Confirm</Button>
        </DialogActions>
      </CDialog>
      <Box>
        {
          loading ? <Loader/> : error ? <ErrorMsg /> :
            <DataTable
              rows={rows}
              columns={columns}
              columnVisibilityModel={columnVisibilityModel}
            />
        }
      </Box>
    </Box>
  )
}

export default ManageStaff