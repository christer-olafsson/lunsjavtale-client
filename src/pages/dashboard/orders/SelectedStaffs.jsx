/* eslint-disable react/prop-types */
import { Add, ArrowDropDownOutlined, Remove } from '@mui/icons-material'
import { Avatar, Box, Button, Collapse, IconButton, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { GET_COMPANY_STAFFS } from '../manageStaff/graphql/query';
import { CART_UPDATE } from './graphql/mutation';
import { ORDER } from './graphql/query';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';

const SelectedStaffs = ({ data, closeDialog }) => {
  const [tableOpen, setTableOpen] = useState(false)
  const [rowdata, setRowData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [orderedQuantity, setOrderedQuantity] = useState('')


  useQuery(GET_COMPANY_STAFFS, {
    onCompleted: (res) => {
      const data = res.companyStaffs.edges.filter(({ node }) => !node.isDeleted);
      setRowData(data);
    },
  });

  const [cartUpdate, { loading }] = useMutation(CART_UPDATE, {
    onCompleted: (res) => {
      toast.success(res.cartUpdate.message)
      closeDialog()
    },
    refetchQueries: [ORDER],
    onError: (err) => {
      toast.error(err.message)
    }
  });


  const handleCartUpdate = () => {
    if (orderedQuantity === 0) {
      toast.error('Quantity empty!')
      return
    }
    cartUpdate({
      variables: {
        id: data.id,
        quantity: parseInt(orderedQuantity),
        addedFor: selectedRows
      }
    })
  }


  const columns = [
    {
      field: 'users',
      headerName: 'Users',
      width: 200,
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar src={params.row?.photoUrl ? row.photoUrl : ''} />
            <Box>
              <Typography sx={{ fontSize: '16px' }}>{row.firstName + row.lastName}</Typography>
              <Typography sx={{ fontSize: '12px' }}>@{row.username}</Typography>
            </Box>
          </Stack>
        )
      }
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} direction='row' gap={1} alignItems='center'>
            <Typography sx={{
              fontSize: '12px',
              bgcolor: row.role === 'company-manager' ? 'primary.main' : row.role === 'company-owner' ? 'purple' : 'gray.main',
              px: 1, borderRadius: '4px',
              color: row.role === 'company-manager' ? '#fff' : row.role === 'company-owner' ? '#fff' : 'inherit',
            }}>{params.row.role}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
  ];

  const rows = rowdata?.map(item => ({
    id: item.node.id,
    firstName: item.node.firstName || '',
    lastName: item.node.lastName || '',
    username: item.node.username,
    role: item.node.role,
    email: item.node.email,
    // jobTitle: item.node.jobTitle,
    phone: item.node.phone,
    photoUrl: item.node.photoUrl,
  })).sort((a, b) => {
    // sort all selected rows first
    // const aSelected = selectedRows.includes(a.id);
    // const bSelected = selectedRows.includes(b.id);
    // if (aSelected && !bSelected) return -1;
    // if (!aSelected && bSelected) return 1;

    // sort owner and manager first
    if (a.role === 'company-owner') return -1;
    if (b.role === 'company-owner') return 1;
    if (a.role === 'company-manager') return -1;
    if (b.role === 'company-manager') return 1;

    return 0;
  });

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
    if (newSelection.length > orderedQuantity) {
      setOrderedQuantity(newSelection.length)
    }
  };

  const toggleQuantity = (type) => {
    if (type === 'increase') {
      setOrderedQuantity(orderedQuantity + 1)
    } else {
      if (orderedQuantity > selectedRows.length) {
        setOrderedQuantity(orderedQuantity - 1)
      }
    }
  }

  // useEffect(() => {
  //   if (selectedRows.length > orderedQuantity) {
  //     setOrderedQuantity(selectedRows.length)
  //   }
  // }, [selectedRows, orderedQuantity])

  useEffect(() => {
    const rows = data?.users?.edges.map(item => {
      const user = item?.node.addedFor;
      return ({
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        username: user?.username,
        phone: user?.phone,
        email: user?.email,
        dueAmount: user?.dueAmount,
        photoUrl: user?.photoUrl,
        role: user?.role,
      })
    })
    setSelectedRows(rows.map(item => item.id))
    setOrderedQuantity(data.orderedQuantity)
  }, [data])


  // const rows = users?.map(item => {
  //   const user = item?.node.addedFor;
  //   return ({
  //     id: item?.node.id,
  //     firstName: user?.firstName,
  //     lastName: user?.lastName,
  //     username: user?.username,
  //     phone: user?.phone,
  //     email: user?.email,
  //     dueAmount: user?.dueAmount,
  //     photoUrl: user?.photoUrl,
  //     role: user?.role,
  //   })
  // }).sort((a, b) => {
  //   if (a.role === 'owner') return -1;
  //   if (b.role === 'owner') return 1;
  //   if (a.role === 'manager') return -1;
  //   if (b.role === 'manager') return 1;
  //   return 0;
  // })



  return (
    <Box>

      <Typography variant='body2' mb={.5}>Ordered Quantity</Typography>
      <Stack direction='row' gap={2} alignItems='center'>
        <Box>
          <Stack sx={{
            width: '150px',
            border: `1px solid lightgray`,
            borderRadius: '4px',
          }} direction='row' alignItems='center' justifyContent='space-between' >
            <IconButton sx={{ height: '35px' }} onClick={() => toggleQuantity('decrease')}><Remove fontSize='small' /></IconButton>
            <Typography>{orderedQuantity}</Typography>
            <IconButton sx={{ height: '35px' }} onClick={() => toggleQuantity('increase')}><Add fontSize='small' /></IconButton>
          </Stack>
        </Box>
        <Button
          onClick={() => setTableOpen(!tableOpen)}
          sx={{ height: '100%' }}
          variant='outlined'
          endIcon={<ArrowDropDownOutlined />}
        >
          Selected Staffs
        </Button>
      </Stack>

      <Collapse in={tableOpen}>
        <DataGrid
          sx={{ my: 2 }}
          rows={rows}
          columns={columns}
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 10,
          //     },
          //   },
          // }}
          // pageSizeOptions={[10]}
          autoHeight
          disableColumnFilter
          disableColumnMenu
          disableColumnSorting
          checkboxSelection
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={handleSelectionChange}
        />
      </Collapse>

      <Stack direction='row' justifyContent='space-between' >
        <Box />
        <Stack direction='row' gap={2}>
          <Button onClick={closeDialog} variant='outlined'>Cencel</Button>
          <CButton onClick={handleCartUpdate} isLoading={loading} variant='contained'>Update</CButton>
        </Stack>
      </Stack>

    </Box>
  )
}

export default SelectedStaffs