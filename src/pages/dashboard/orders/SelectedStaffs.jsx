/* eslint-disable react/prop-types */
import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { MailOutline, PhoneInTalkOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ME } from '../../../graphql/query';
import DataTable from '../../../components/dashboard/DataTable';
import useIsMobile from '../../../hook/useIsMobile';
import CButton from '../../../common/CButton/CButton';
import { MAKE_ONLINE_PAYMENT } from '../payment/graphql/mutation';
import toast from 'react-hot-toast';

const SelectedStaffs = ({ order, orderCarts }) => {
  const [cartUsers, setCartUsers] = useState([])
  const [selectedRowData, setSelectedRowData] = useState([])
  const [staffSelectionOn, setStaffSelectionOn] = useState(false)

  const isMobile = useIsMobile()

  //create staffs payment
  const [createPayment, { loading: paymentLoading }] = useMutation(MAKE_ONLINE_PAYMENT, {
    onCompleted: (res) => {
      toast.success(res.makeOnlinePayment.message)
      if (res.makeOnlinePayment.paymentUrl) {
        window.location.href = res.makeOnlinePayment.paymentUrl
      }
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  function handleSelectedRows(rows) {
    const rowData = rows.map(cartId => cartUsers.find(data => data.id === cartId))
    setSelectedRowData(rowData)
  }

  const totalPayment = selectedRowData.reduce((total, data) => total + parseFloat(data.dueAmount), 0).toFixed(2)

  const handlePay = () => {
    createPayment({
      variables: {
        input: {
          company: order?.company.id,
          paidAmount: parseInt(totalPayment),
          userCarts: selectedRowData.map(data => data.id),
        }
      }
    })
  }


  const columns = [
    {
      field: 'staffs',
      width: 250,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Staffs</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Stack direction='row' gap={1} alignItems='center'>
              <Avatar src={row?.addedFor?.photoUrl ? row.photoUrl : ''} />
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{row.addedFor.firstName + row.addedFor.lastName}</Typography>
                <Stack alignItems='center' gap={.5}>
                  <Link to={`/dashboard/staff-details/${row.addedFor.id}`}>
                    <Typography sx={{ fontSize: '14px' }}>@{row.addedFor.username}</Typography>
                  </Link>
                  <Typography sx={{
                    fontSize: '12px',
                    bgcolor: row.addedFor.role === 'company-manager' ? 'primary.main' : row.addedFor.role === 'company-owner' ? 'purple' : 'gray.main',
                    px: 1, borderRadius: '50px',
                    color: row.addedFor.role === 'company-manager' ? '#fff' : row.addedFor.role === 'company-owner' ? '#fff' : 'inherit',
                  }}>{row.addedFor.role.replace('company-', '')}</Typography>
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
            <MailOutline sx={{ fontSize: '14px' }} />{params.row.addedFor.email}
          </Typography>
          <Typography sx={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: .5 }}>
            <PhoneInTalkOutlined sx={{ fontSize: '13px' }} />{params.row.addedFor.phone}
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
    const users = orderCarts?.users?.edges.map(user => user.node)
    setCartUsers(users)
  }, [orderCarts])

  return (
    <Box sx={{ maxWidth: '800px' }}>
      <Box mb={2}>
        {
          staffSelectionOn ?
            <Stack direction='row' gap={2}>
              <CButton onClick={() => setStaffSelectionOn(false)} variant='outlined' >Cancel</CButton>
              <CButton onClick={handlePay} isLoading={paymentLoading} disable={selectedRowData.length === 0} variant='contained' >Pay Now (Vipps)</CButton>
            </Stack> :
            <CButton disable={cartUsers.length === 0} onClick={() => setStaffSelectionOn(true)} variant='contained' >
              Make Payment
            </CButton>
        }
      </Box>
      {staffSelectionOn && <Typography mb={2}>Total Pay: <b>{totalPayment}</b> kr</Typography>}

      <DataTable
        headerColor={false}
        rows={cartUsers ?? []}
        columns={columns}
        rowHeight={70}
        checkboxSelection={staffSelectionOn}
        onRowSelectionModelChange={handleSelectedRows}
        disableColumnFilter
        disableColumnMenu
        disableColumnSorting
      />
    </Box>
  )
}

export default SelectedStaffs