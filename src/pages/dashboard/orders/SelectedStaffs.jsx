/* eslint-disable react/prop-types */
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { MailOutline, PhoneInTalkOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SelectedStaffs = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'users',
      headerName: 'Users',
      width: 300,
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Stack direction='row' gap={1} alignItems='center'>
              <Avatar src={params.row?.photoUrl ? row.photoUrl : ''} />
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{row.firstName + row.lastName}</Typography>
                <Stack direction='row' alignItems='center' gap={2}>
                  <Link to={`/dashboard/staff-details/${row.id}`}>
                    <Typography sx={{ fontSize: '14px' }}>@{row.username}</Typography>
                  </Link>
                  <Typography sx={{
                    fontSize: '12px',
                    bgcolor: row.role === 'company-manager' ? 'primary.main' : row.role === 'company-owner' ? 'purple' : 'gray.main',
                    px: 1, borderRadius: '50px',
                    color: row.role === 'company-manager' ? '#fff' : row.role === 'company-owner' ? '#fff' : 'inherit',
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
      field: 'dueAmount', headerName: '', width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Due Amount</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} justifyContent='center'>
          <Typography sx={{
            fontSize: '14px',
            fontWeight: 600,
            bgcolor: params.row.dueAmount === '0' ? 'lightgray' : '#F7DCD9',
            color: params.row.dueAmount === '0' ? 'inherit' : 'red',
            borderRadius: '4px',
            textAlign: 'center',
            p: 1
          }}>
            {params.row.dueAmount ?? '00'} <span style={{ fontWeight: 400 }}>kr</span>
          </Typography>
        </Stack>
      )
    },
  ];

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
        dueAmount: item.node?.dueAmount,
        photoUrl: user?.photoUrl,
        role: user?.role,
      })
    }).sort((a, b) => {
      if (a.role === 'company-owner') return -1;
      if (b.role === 'company-owner') return 1;
      if (a.role === 'company-manager') return -1;
      if (b.role === 'company-manager') return 1;
      return 0;
    });
    setSelectedRows(rows.map(item => item))
  }, [data])


  return (
    <Box>
      <Typography variant='body2' mb={.5}>Selected Staffs</Typography>
      <DataGrid
        sx={{ my: 2 }}
        rows={selectedRows ?? []}
        columns={columns}
        rowSelection={false}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        localeText={{
          noRowsLabel: 'Empty',
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} Selected`
              : `${count.toLocaleString()} Selected`,
        }}
        pageSizeOptions={[10]}
        autoHeight
        disableColumnFilter
        disableColumnMenu
        disableColumnSorting
      />
    </Box>
  )
}

export default SelectedStaffs