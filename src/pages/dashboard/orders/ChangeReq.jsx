/* eslint-disable react/prop-types */
import { Avatar, Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useIsMobile from '../../../hook/useIsMobile'
import { CONFIRM_USER_CART_UPDATE } from './graphql/mutation'
import { useMutation } from '@apollo/client'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { MailOutline, PhoneInTalkOutlined } from '@mui/icons-material'
import DataTable from '../../../components/dashboard/DataTable'
import CButton from '../../../common/CButton/CButton'

const ChangeReq = ({ orderCarts }) => {
  const [allAlterCarts, setAllAlterCarts] = useState([])
  const [selectedAlterCartData, setSelectedAlterCartData] = useState({})

  const isMobile = useIsMobile()

  //create staffs payment
  const [userCartUpdate, { loading }] = useMutation(CONFIRM_USER_CART_UPDATE, {
    onCompleted: (res) => {
      toast.success(res.confirmUserCartUpdate.message)
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  function handleAcceptClick(row) {
    setSelectedAlterCartData(row)
    userCartUpdate({
      variables: {
        id: row.id,
        status: 'accepted'
      }
    })
  }

  useEffect(() => {
    const allReqData = orderCarts?.node.users.edges.map(item => item.node.alterCart)
    setAllAlterCarts(allReqData)
  }, [orderCarts])


  const columns = [
    {
      field: 'users',
      width: 300,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Staffs</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Stack direction='row' gap={1} alignItems='center'>
              <Avatar src={row?.addedFor?.photoUrl ? row.photoUrl : ''} />
              <Stack>
                <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{row.base.addedFor.firstName + row.base.addedFor.lastName}</Typography>
                <Link to={`/dashboard/staff-details/${row.base.addedFor.id}`}>
                  <Typography sx={{ fontSize: '14px' }}>@{row.base.addedFor.username}</Typography>
                </Link>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: .5 }}>
                  <MailOutline sx={{ fontSize: '14px' }} />{params.row.base.addedFor.email}
                </Typography>
                <Typography sx={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: .5 }}>
                  <PhoneInTalkOutlined sx={{ fontSize: '13px' }} />{params.row.base.addedFor.phone}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )
      }
    },
    {
      field: 'reqitem',
      width: 250,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Requested Item</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        const item = row.item
        return (
          <Stack sx={{ height: '100%' }} justifyContent='center'>
            <Stack direction='row' gap={1} alignItems='center'>
              <img style={{
                width: '70px',
                height: '70px',
                objectFit: 'cover',
                borderRadius: '4px',
              }} src={item?.attachments?.edges.find(item => item.node.isCover)?.node.fileUrl ?? "/noImage.png"} alt="" />              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{item?.name}</Typography>
                <Typography sx={{ fontSize: '14px' }}>{item?.category.name}</Typography>
                <Typography sx={{ fontSize: '14px' }}>{item?.priceWithTax} kr</Typography>
              </Box>
            </Stack>
          </Stack>
        )
      }
    },
    {
      field: 'dueAmount', headerName: '',
      width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Due Amount</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} justifyContent='center'>
          <Typography sx={{
            fontWeight: 600,
            color: params.row.previousCart.dueAmount === '0' ? 'inherit' : 'red',
            borderRadius: '4px',
            p: 1
          }}>
            {params.row.previousCart
              .dueAmount ?? '00'} <span style={{ fontWeight: 400 }}>kr</span>
          </Typography>
        </Stack>
      )
    },
    {
      field: 'status', headerName: '',
      width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Status</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} justifyContent='center'>
          <Typography sx={{
            fontWeight: 600,
            bgcolor: params.row.status !== 'pending' ? 'green' : 'darkgray',
            color: params.row.status !== 'pending' ? 'inherit' : '#fff',
            borderRadius: '4px',
            textAlign: 'center',
            p: .5
          }}>
            {params.row.status}
          </Typography>
        </Stack>
      )
    },
    {
      field: 'action', headerName: '',
      width: 150,
      renderCell: (params) => (
        <Stack sx={{ height: '100%', ml: 2, width: '100px' }} justifyContent='center'>
          <CButton isLoading={selectedAlterCartData.id === params.row.id ? loading : false} onClick={() => handleAcceptClick(params.row)} variant='contained'>Accept</CButton>
        </Stack>
      )
    },
  ];


  return (
    <Box>
      <DataTable
        headerColor={false}
        rows={allAlterCarts ?? []}
        columns={columns}
        rowHeight={80}
      />
    </Box>
  )
}

export default ChangeReq