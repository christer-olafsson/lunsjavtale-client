import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { USER_NOTIFICATIONS } from './query';
import { useQuery } from '@apollo/client';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import DataTable from '../../../components/dashboard/DataTable';
import { AccessTime } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useIsMobile from '../../../hook/useIsMobile';

const Notifications = () => {
  const [notifications, setNotifications] = useState([])

  const isMobile = useIsMobile()

  const { loading, error } = useQuery(USER_NOTIFICATIONS, {
    onCompleted: (res) => {
      setNotifications(res.userNotifications.edges.map(item => item.node))
    }
  });

  const getTimeDifference = (isoString) => {
    const date = parseISO(isoString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const columns = [
    {
      field: 'Time', headerName: '', width: 250,
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} direction='row' gap={.5} alignItems='center'>
            <AccessTime sx={{ fontSize: '16px', color: row.isSeen ? 'gray' : 'green' }} />
            <Typography sx={{
              color: row.isSeen ? 'gray' : 'green'
            }} variant='body2'>{getTimeDifference(row.sentOn)}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'title', width: 250,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Title</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
            <Typography sx={{
              color: row.isSeen ? 'gray' : 'green'
            }}>{row.title}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'Message',
      width: isMobile ? 400 : undefined,
      flex: isMobile ? undefined : 1,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Message</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
            <Link style={{ color: row.isSeen ? 'gray' : 'inherit' }}
              to={row.objectId ? `/dashboard/orders/details/${row.objectId}` : `/dashboard/orders`}>
              <Typography sx={{
                color: row.isSeen ? 'gray' : 'green'
              }} variant='body2'>{row.message}</Typography>
            </Link>
          </Stack>
        )
      }
    },
  ]
  return (
    <Box maxWidth='xl'>
      <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Alle Varsler</Typography>
      <Box mt={3}>
        {
          loading ? <Loader /> : error ? <ErrorMsg /> :
            <DataTable
              columns={columns}
              rows={notifications ?? []}
            />
        }
      </Box>
    </Box>
  )
}

export default Notifications