import { CalendarMonthOutlined, Close, DoneOutline, MailOutline, ModeEdit, PhoneInTalkOutlined, Search } from '@mui/icons-material'
import { Avatar, Box, Button, DialogActions, FormControl, IconButton, Input, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import DataTable from '../../../components/dashboard/DataTable'
import CDialog from '../../../common/dialog/CDialog';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { format } from 'date-fns';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import Loader from '../../../common/loader/Index';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import { deleteFile } from '../../../utils/deleteFile';
import { ME } from '../../../graphql/query';
import { ADDED_EMPLOYEE_CARTS } from './graphql/query';
import { DataGrid } from '@mui/x-data-grid';
import { APPROVE_CART_REQUEST } from './graphql/mutation';


const StaffsOrder = () => {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [deleteStaffData, setDeleteStaffData] = useState({ email: '', fileId: '' });
  const [searchText, setSearchText] = useState('')
  const [addedEmployeeCarts, setAddedEmployeeCarts] = useState([])
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [reqStatus, setReqStatus] = useState('')

  const { data: user } = useQuery(ME)

  const [fetchAddedEmployeeCarts, { loading, error }] = useLazyQuery(ADDED_EMPLOYEE_CARTS, {
    fetchPolicy: "network-only",
    variables: {
      title: searchText,
    },
    onCompleted: (res) => {
      setAddedEmployeeCarts(res.addedEmployeeCarts.edges.map(item => item.node))
    },
  });


  const [cartRequest, { loading: cartReqLoading }] = useMutation(APPROVE_CART_REQUEST, {
    onCompleted: (res) => {
      toast.success(res.approveCartRequest.message)
      fetchAddedEmployeeCarts()
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const handleCartRequest = () => {
    cartRequest({
      variables: {
        id: selectedRowIds,
        requestStatus: reqStatus
      }
    })
  }

  // function handleStaffRemove(row) {
  //   setDeleteStaffData({ email: row.email, fileId: row.fileId })
  //   setRemoveDialogOpen(true)
  // }

  const columns = [
    {
      field: 'products', width: 250,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Products</Typography>
      ),
      renderCell: (params) => {
        return (
          <Stack sx={{ height: '100%' }} direction='row' alignItems='center' gap={2}>
            <Avatar src={params.row.item.attachments.edges.find(item => item.node.isCover)?.node.fileUrl ?? 'noImage.png'} />
            <Stack>
              <Typography>{params.row.item.name}</Typography>
              <Typography sx={{ fontSize: '12px' }}><b>{params.row.priceWithTax} kr</b>  {params.row.item.category.name}</Typography>
            </Stack>
          </Stack>
        )
      }
    },
    {
      field: 'quentity', width: 120,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Quantity</Typography>
      ),
      renderCell: (params) => {
        return (
          <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{params.row.orderedQuantity}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'totalprice', width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Total Price</Typography>
      ),
      renderCell: (params) => {
        return (
          <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{params.row.totalPriceWithTax} kr</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'due',
      headerName: '',
      width: 150,
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
              width: 'fit-content',
              px: 2, py: 1,
              bgcolor: params.row.dueAmount === '0' ? 'gray.main' : '#F7DCD9',
              color: params.row.dueAmount === '0' ? 'inherit' : 'red',
              borderRadius: '4px',
              textAlign: 'center',
            }}>{row.dueAmount ?? <b>00 </b>} kr</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'createdOn',
      headerName: '',
      width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Order Date</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              <CalendarMonthOutlined fontSize='small' /> {format(row.createdOn, 'yyyy-MM-dd')}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'deliveriedOn',
      headerName: '',
      width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Delivery Date</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Typography sx={{ display: 'inline-flex', alignItems: 'center', fontWeight: 600, gap: 1 }}>
              <CalendarMonthOutlined fontSize='small' /> {row.date}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'orderStatus', width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Order Status</Typography>
      ),
      renderCell: (params) => {
        return (
          <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
            <Typography sx={{
              fontSize: '14px',
              bgcolor: 'lightgray',
              px: 1, borderRadius: '4px'
            }}>{params.row.requestStatus}</Typography>
          </Stack>
        )
      }
    },
    // {
    //   field: 'action',
    //   headerName: '',
    //   width: 150,
    //   renderCell: (params) => (
    //     <Stack sx={{ height: '100%', display: params.row.role === 'company-owner' ? 'none' : 'flex' }} direction='row' gap={2} alignItems='center'>
    //       <IconButton disabled={user?.me.company.isBlocked} sx={{
    //         border: '1px solid lightgray',
    //         borderRadius: '5px',
    //         width: '40px',
    //         height: '40px',
    //       }} onClick={() => handleStaffRemove(params.row)}>
    //         <Close fontSize='small' />
    //       </IconButton>
    //     </Stack>
    //   ),
    // },
  ];


  useEffect(() => {
    fetchAddedEmployeeCarts()
  }, [])

  return (
    <Box maxWidth='xxl'>
      <Typography sx={{ fontSize: '24px', fontWeight: 600, mb: 5 }}>Order Request</Typography>
      <Stack direction='row' justifyContent='space-between' gap={2} sx={{
        mb: 4,
      }}>
        {
          (selectedRowIds.length > 0 && user?.me.role !== 'company-employee') &&
          <Stack direction='row' gap={2}>
            <Box width={{width:'200px'}}>
              <FormControl size='small' fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={reqStatus}
                  label="Status"
                  onChange={e => setReqStatus(e.target.value)}
                >
                  <MenuItem value={'accepted'}>Accepted </MenuItem>
                  <MenuItem value={'rejected'}>Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <CButton disable={reqStatus === ''} isLoading={cartReqLoading} onClick={handleCartRequest} variant='contained'>Approve</CButton>
          </Stack>
        }
        {/* <Box sx={{
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
          <Input onChange={e => setSearchText(e.target.value)} fullWidth disableUnderline placeholder='Search' />
          <IconButton><Search /></IconButton>
        </Box> */}

      </Stack>
      <CDialog openDialog={removeDialogOpen} closeDialog={() => setRemoveDialogOpen(false)} >
        <Typography variant='h5'>Confirm Remove?</Typography>
        <DialogActions>
          <Button variant='outlined' onClick={() => setRemoveDialogOpen(false)}>Cancel</Button>
          {/* <CButton isLoading={userDeleteLoading || loadingFiledelete} onClick={handlStaffDelete} variant='contained'>Confirm</CButton> */}
        </DialogActions>
      </CDialog>
      <Box>
        {
          loading ? <Loader /> : error ? <ErrorMsg /> :
            <DataGrid
              rows={addedEmployeeCarts}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              autoHeight
              disableColumnFilter
              disableColumnMenu
              disableColumnSorting
              checkboxSelection={user?.me.role !== 'company-employee'}
              onRowSelectionModelChange={(newSelection) => setSelectedRowIds(newSelection)}
            />
        }
      </Box>
    </Box>
  )
}

export default StaffsOrder