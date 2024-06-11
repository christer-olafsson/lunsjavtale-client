import { AccessTime, Add, DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import DataTable from '../../../components/dashboard/DataTable';
import NewMeeting from './NewMeeting';
import CDialog from '../../../common/dialog/CDialog';
import EditMeeting from './EditMeeting';
import { useEffect, useState } from 'react';
import { FOOD_MEETINGS } from './graphql/query';
import { useLazyQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import Loader from '../../../common/loader/Index';
import ErrorMsg from '../../../common/ErrorMsg/ErrorMsg';
import moment from 'moment-timezone';

const Meeting = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [createMeetingDialogOpen, setCreateMeetingDialogOpen] = useState(false);
  const [editMeetingDialogOpen, setEditMeetingDialogOpen] = useState(false);
  const [meetings, setMeetings] = useState([])

  const [fetchMeeting, { loading: meetingsLoading, error: meetingsErr }] = useLazyQuery(FOOD_MEETINGS, {
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      setMeetings(res.foodMeetings.edges.map(item => item.node))
    }
  });


  const handleEdit = (row) => {
    setEditMeetingDialogOpen(true)
  }

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };


  function timeUntilNorway(futureDate) {
    const now = moment();
    const future = moment.tz(futureDate, "UTC").tz("Europe/Oslo");

    const diffInMilliseconds = future.diff(now);
    if (diffInMilliseconds < 0) {
      return 'Date passed!';
    }

    const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours`;
    } else {
      return `${diffInDays} days`;
    }
  }

  const formatedNorwayTime = (meetingTime) => {
    const timeZone = 'Europe/Oslo';
    const zonedDate = moment.tz(meetingTime, timeZone);
    const formattedTime = zonedDate.format('HH:mm');
    return formattedTime
  }


  const columns = [
    {
      field: 'title', width: 250,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Title</Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
            <Typography>{row.title}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'type', headerName: '', width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Type</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
          <Typography>{params.row.meetingType}</Typography>
        </Stack>
      )
    },
    {
      field: 'meeting-time', headerName: '', width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Meeting time</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%', }} justifyContent='center'>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{format(params.row.meetingTime, 'yyyy-MM-dd')}</Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 500, display: 'inline-flex', alignItems: 'center' }}>
            <AccessTime sx={{ fontSize: '14px' }} /> {formatedNorwayTime(params.row.meetingTime)}</Typography>
          {/* <AccessTime sx={{ fontSize: '14px' }} /> {format(params.row.meetingTime, 'HH:mm')}</Typography> */}
        </Stack>
      )
    },
    {
      field: 'startIn', headerName: '', width: 200,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' }, ml: '20px' }}>Start In</Typography>
      ),
      renderCell: (params) => (
        <Stack sx={{ height: '100%', ml: '20px' }} direction='row' alignItems='center'>
          <Typography variant='body2'>{timeUntilNorway(params.row.meetingTime)}</Typography>
        </Stack>
      )
    },
    {
      field: 'status', width: 150,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Status </Typography>
      ),
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} direction='row' alignItems='center'>
            <Typography sx={{
              fontSize: { xs: '12px', md: '16px' },
              color: row.status === 'upcoming' ? 'primary.main' : 'gray',
              bgcolor: 'light.main',
              px: 1, borderRadius: '8px',
            }}>&#x2022; {'Pending'}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'edit', headerName: '', width: 50,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditOutlined />
          </IconButton>
        )
      },
    },
  ];

  // useEffect(() => {
  //   setColumnVisibilityModel({
  //     paymentInfo: isMobile ? false : true,
  //     status: isMobile ? false : true,
  //     deliveryDate: isMobile ? false : true,
  //   })
  // }, [isMobile])

  useEffect(() => {
    fetchMeeting()
  }, [])


  return (
    <Box maxWidth='xxl'>
      <Stack direction='row' gap={2} alignItems='center'>
        <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Meetings</Typography>
        <Typography sx={{
          fontSize: '12px',
          fontWeight: 600,
          bgcolor: 'light.main',
          borderRadius: '4px',
          color: 'primary.main',
          px: 1
        }}>{meetings?.length ?? 0} meetings</Typography>
      </Stack>
      <Stack direction='row' justifyContent='space-between' mt={3} sx={{ height: '40px' }}>
        <Box sx={{ minWidth: 200 }}>
          <FormControl size='small' fullWidth>
            <InputLabel>Filter</InputLabel>
            <Select
              value={statusFilter}
              label="Filter"
              onChange={handleFilterChange}
            >
              <MenuItem value={5}>All </MenuItem>
              <MenuItem value={10}>Upcoming</MenuItem>
              <MenuItem value={20}>Complete</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button onClick={() => setCreateMeetingDialogOpen(true)} variant='contained' startIcon={<Add />}>Create Meeting</Button>
      </Stack>
      {/* edit meeting */}
      <CDialog openDialog={editMeetingDialogOpen}>
        <EditMeeting closeDialog={() => setEditMeetingDialogOpen(false)} />
      </CDialog>
      {/* new meeting */}
      <CDialog openDialog={createMeetingDialogOpen}>
        <NewMeeting closeDialog={() => setCreateMeetingDialogOpen(false)} />
      </CDialog>
      <Box mt={3}>
        {
          meetingsLoading ? <Loader /> : meetingsErr ? <ErrorMsg /> :
            <DataTable
              columns={columns}
              rows={meetings}
            />
        }
      </Box>
    </Box>
  )
}

export default Meeting