import { CalendarMonthOutlined, Close, MailOutline, ModeEdit, PhoneInTalkOutlined, Search } from '@mui/icons-material'
import { Avatar, Box, Button, DialogActions, IconButton, Input, Stack, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import DataTable from '../../../components/dashboard/DataTable'
import CDialog from '../../../common/dialog/CDialog';
import AddStaff from './AddStaff';
import EditStaff from './EditStaff';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_COMPANY_STAFFS } from './graphql/query';
import { format } from 'date-fns';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import Loader from '../../../common/loader/Index';
import { USER_DELETE } from './graphql/mutation';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import { deleteFile } from '../../../utils/deleteFile';
import { ME } from '../../../graphql/query';


const ManageStaff = () => {
  const [rowdata, setRowData] = useState([])
  const [addStaffDialogOpen, setAddStaffDilogOpen] = useState(false);
  const [editStaffDialogOpen, setEditStaffDilogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [editStaffData, setEditStaffData] = useState({});
  const [deleteStaffData, setDeleteStaffData] = useState({ email: '', fileId: '' });
  const [loadingFiledelete, setLoadingFileDelete] = useState(false)
  const [searchText, setSearchText] = useState('')

  const { data: user } = useQuery(ME)

  const [getCompanyStaffs, { loading, error }] = useLazyQuery(GET_COMPANY_STAFFS, {
    fetchPolicy: "network-only",
    variables: {
      title: searchText,
    },
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

  const handlStaffDelete = async () => {
    setLoadingFileDelete(true)
    await deleteFile(deleteStaffData.fileId);
    setLoadingFileDelete(false)
    userDelete({
      variables: {
        email: deleteStaffData.email
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
    dueAmount: item.node.dueAmount,
    photoUrl: item.node.photoUrl,
    fileId: item.node.fileId,
    join: format(new Date(item.node.dateJoined), 'MMMM dd, yyyy'),
    allergies: item.node.allergies
  })).sort((a, b) => {
    if (a.role === 'company-owner') return -1;
    if (b.role === 'company-owner') return 1;
    if (a.role === 'company-manager') return -1;
    if (b.role === 'company-manager') return 1;
    return 0;
  });


  function handleStaffEdit(row) {
    setEditStaffDilogOpen(true)
    setEditStaffData(row)
  }
  function handleStaffRemove(row) {
    setDeleteStaffData({ email: row.email, fileId: row.fileId })
    setRemoveDialogOpen(true)
  }

  const handleAddStaffDialogClose = () => {
    setAddStaffDilogOpen(false)
  }

  const columns = [
    {
      field: 'info',
      headerName: '',
      width: 300,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Info</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Stack direction='row' gap={1} alignItems='center'>
              <Avatar src={params.row?.photoUrl ? row.photoUrl : ''} />
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{row.firstName + row.lastName}</Typography>
                <Stack direction='row' alignItems='center' gap={2}>
                  <Typography sx={{ fontSize: '14px' }}>@{row.username}</Typography>
                  <Typography sx={{
                    fontSize: '12px',
                    bgcolor: row.role === 'company-manager' ? 'primary.main' : row.role === 'company-owner' ? 'purple' : 'darkgray',
                    px: 1, borderRadius: '50px',
                    color: '#fff'
                  }}>{params.row.role.replace('company-', '')}</Typography>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        )
      }
    },
    {
      field: 'contact', headerName: '', width: 250,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Contact</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} justifyContent='center'>
          <Typography sx={{ fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: .5 }}>
            <MailOutline sx={{ fontSize: '14px' }} />{params.row.email}
          </Typography>
          <Typography sx={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: .5 }}>
            <PhoneInTalkOutlined sx={{ fontSize: '13px' }} />{params.row.phone}
          </Typography>
        </Stack>
      )
    },
    {
      field: 'due',
      headerName: '',
      width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Due Amount</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Typography sx={{
              fontSize: '14px',
              fontWeight: 600,
              bgcolor: params.row.dueAmount === '0' ? 'gray.main' : '#F7DCD9',
              color: params.row.dueAmount === '0' ? 'inherit' : 'red',
              borderRadius: '4px',
              textAlign: 'center',
              p: .5
            }}>{row.dueAmount ?? <b>00 </b>} kr</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'joinDate',
      headerName: '',
      width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Join Date</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}> <CalendarMonthOutlined fontSize='small' /> {row.join}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'action',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <Stack sx={{ height: '100%', display: params.row.role === 'company-owner' ? 'none' : 'flex' }} direction='row' gap={2} alignItems='center'>
          <IconButton disabled={user?.me.company.isBlocked} sx={{
            // bgcolor: 'light.main',
            borderRadius: '5px',
            width: '40px',
            height: '40px',
          }} onClick={() => handleStaffEdit(params.row)}>
            <ModeEdit fontSize='small' />
          </IconButton>
          <IconButton disabled={user?.me.company.isBlocked} sx={{
            // border: '1px solid lightgray',
            borderRadius: '5px',
            width: '40px',
            height: '40px',
          }} onClick={() => handleStaffRemove(params.row)}>
            <Close fontSize='small' />
          </IconButton>
        </Stack>
      ),
    },
  ];


  useEffect(() => {
    getCompanyStaffs()
  }, [])

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
          <Input onChange={e => setSearchText(e.target.value)} fullWidth disableUnderline placeholder='Search Staff' />
          <IconButton><Search /></IconButton>
        </Box>
        <Button disabled={user?.me.company.isBlocked} onClick={() => setAddStaffDilogOpen(true)} variant='contained' sx={{ textWrap: 'nowrap' }}>Add Staff</Button>
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
          <CButton isLoading={userDeleteLoading || loadingFiledelete} onClick={handlStaffDelete} variant='contained'>Confirm</CButton>
        </DialogActions>
      </CDialog>
      <Box>
        {
          loading ? <Loader /> : error ? <ErrorMsg /> :
            <DataTable
              rows={rows}
              columns={columns}
            // columnVisibilityModel={columnVisibilityModel}
            />
        }
      </Box>
    </Box>
  )
}

export default ManageStaff