import { BorderColor, BorderColorOutlined, Close, ModeEdit, Search } from '@mui/icons-material'
import { Avatar, Box, Button, DialogActions, IconButton, Input, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/dashboard/DataTable'
import CDialog from '../../../common/dialog/CDialog';
import AddStaff from './AddStaff';
import EditStaff from './EditStaff';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_COMPANY_STAFFS } from './graphql/query';
import LoadingBar from '../../../common/loadingBar/LoadingBar';
import { format } from 'date-fns';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import Loader from '../../../common/loader/Index';
import { USER_DELETE } from './graphql/mutation';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';


const ManageStaff = () => {
  const [rowdata, setRowData] = useState([])
  const [addStaffDialogOpen, setAddStaffDilogOpen] = useState(false);
  const [editStaffDialogOpen, setEditStaffDilogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
  const [editStaffData, setEditStaffData] = useState({});
  const [selectedDeteleMail, setSelectedDeteleMail] = useState('')

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [getCompanyStaffs, { loading, error }] = useLazyQuery(GET_COMPANY_STAFFS, {
    fetchPolicy: "network-only",
    onCompleted: (res) => {
      const data = res.companyStaffs.edges.filter(({ node }) => !node.isDeleted);
      setRowData(data);
    },
  });

  const [userDelete, { loading: userDeleteLoading }] = useMutation(USER_DELETE, {
    onCompleted: (res) => {
      toast.success(res.userDelete.message)
      getCompanyStaffs()
      setRemoveDialogOpen(false)
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const handleUserDelete = () => {
    userDelete({
      variables: {
        email: selectedDeteleMail
      }
    })
  }

  const rows = rowdata?.map(item => ({
    id: item.node.id,
    firstName: item.node.firstName || '',
    lastName: item.node.lastName || '',
    username: item.node.username,
    role: item.node.role,
    email: item.node.email,
    jobTitle: item.node.jobTitle,
    phone: item.node.phone,
    photoUrl: item.node.photoUrl,
    join: format(new Date(item.node.dateJoined), 'MMMM dd, yyyy'),
    allergies: item.node.allergies
  })).sort((a, b) => {
    if (a.role === 'owner') return -1;
    if (b.role === 'owner') return 1;
    if (a.role === 'manager') return -1;
    if (b.role === 'manager') return 1;
    return 0;
  });


  function handleStaffEdit(row) {
    setEditStaffDilogOpen(true)
    setEditStaffData(row)
  }
  function handleRemove(row) {
    setRemoveDialogOpen(true)
    setSelectedDeteleMail(row.email)
  }

  const handleAddStaffDialogClose = () => {
    setAddStaffDilogOpen(false)
  }

  const columns = [
    {
      field: 'id', headerName: 'ID', width: 50
    },
    {
      field: 'users',
      headerName: 'Users',
      width: 300,
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar src={params.row?.photoUrl ? row.photoUrl : ''} />
            <Box>
              <Typography sx={{ fontSize: '16px' }}>{row.firstName + row.lastName}</Typography>
              <Stack direction='row' alignItems='center' gap={2}>
                <Typography sx={{ fontSize: '12px' }}>@{row.username}</Typography>
                <Typography sx={{
                  fontSize: '12px',
                  bgcolor: row.role === 'manager' ? 'primary.main' : row.role === 'owner' ? 'purple' : 'gray.main',
                  px: 1, borderRadius: '50px',
                  color: row.role === 'manager' ? '#fff' : row.role === 'owner' ? '#fff' : 'inherit',
                }}>{params.row.role}</Typography>
              </Stack>
            </Box>
          </Stack>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 200,
    },
    {
      field: 'join',
      headerName: 'Joining Date',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Stack sx={{ height: '100%', display: params.row.role === 'owner' ? 'none' : 'flex' }} direction='row' gap={2} alignItems='center'>
          <IconButton sx={{
            bgcolor: 'light.main',
            borderRadius: '5px',
            width: '40px',
            height: '40px',
          }} onClick={() => handleStaffEdit(params.row)}>
            <ModeEdit fontSize='small' />
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


  useEffect(() => {
    getCompanyStaffs()
  }, [])


  useEffect(() => {
    setColumnVisibilityModel({
      email: isMobile ? false : true,
      phone: isMobile ? false : true,
      join: isMobile ? false : true,
    })
  }, [isMobile])


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
        <AddStaff closeDialog={handleAddStaffDialogClose} getCompanyStaffs={getCompanyStaffs} />
      </CDialog>
      {/* edit staff */}
      <CDialog openDialog={editStaffDialogOpen} >
        <EditStaff data={editStaffData} closeDialog={() => setEditStaffDilogOpen(false)} getCompanyStaffs={getCompanyStaffs} />
      </CDialog>
      {/* remove staff */}
      <CDialog openDialog={removeDialogOpen} closeDialog={() => setRemoveDialogOpen(false)} >
        <Typography variant='h5'>Confirm Remove?</Typography>
        <DialogActions>
          <Button variant='outlined' onClick={() => setRemoveDialogOpen(false)}>Cancel</Button>
          <CButton isLoading={userDeleteLoading} onClick={handleUserDelete} variant='contained'>Confirm</CButton>
        </DialogActions>
      </CDialog>
      <Box>
        {
          loading ? <Loader /> : error ? <ErrorMsg /> :
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