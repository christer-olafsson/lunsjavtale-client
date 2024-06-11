import { Add, BorderColor, DateRangeOutlined, Delete, DeleteForeverOutlined, DeleteOutline, EditOutlined, LockOpenOutlined, LockOutlined, ModeEditOutlineOutlined, MoreHoriz, MoreVert, Remove, ScheduleOutlined, Search } from '@mui/icons-material'
import { Avatar, Box, Button, FormControl, IconButton, Input, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import NewMeeting from './NewMeeting';
import EditMeeting from './EditMeeting';
import CDialog from '../../../common/dialog/CDialog';
import DataTable from '../../../components/dashboard/DataTable';
import { useEffect, useState } from 'react';
import { FOOD_MEETINGS } from './graphql/query';
import { useLazyQuery } from '@apollo/client';

const rows = [
  { id: '987', name: 'Phoenix Baker', username: 'phoenix11', email: 'phoenix@untitledui.com', type: 'Remote', meetingDate: '10 Feb, 2023', meetingTime: '3.00pm', startIn: '22hours', status: 'upcoming' },
  { id: '988', name: 'Lana Steiner', username: 'lana432', email: 'lana@untitledui.com', type: 'Interview', meetingDate: '13 Feb, 2023', meetingTime: '2.00pm', startIn: '16hours', status: 'upcoming' },
  { id: '999', name: 'Demi Wilkinson', username: 'demi435', email: 'demi232@untitledui.com', type: 'Lively', meetingDate: '10 Jan, 2023', meetingTime: '10.00am', startIn: '00hours', status: 'complete' },
];


const Meeting = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [createMeetingDialogOpen, setCreateMeetingDialogOpen] = useState(false);
  const [deleteMeetingDialogOpen, setDeleteMeetingDialogOpen] = useState(false);
  const [editMeetingDialogOpen, setEditMeetingDialogOpen] = useState(false);
  const [foodMeetings, setFoodMeetings] = useState([])


  const [getFoodMeetings, { loading, error }] = useLazyQuery(FOOD_MEETINGS, {
    fetchPolicy: "network-only",
    onCompleted: (res) => {
      setFoodMeetings(res.foodMeetings.edges.map(item => item.node));
      },
      });
    console.log(foodMeetings)

  const handleEdit = (row) => {
    setEditMeetingDialogOpen(true)
  }

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };


  function handleDelete(row) {
    setDeleteMeetingDialogOpen(true)
  }

  const columns = [
    {
      field: 'info', width: 250,
      renderHeader: () => (
        <Typography sx={{ fontSize: { xs: '12px', fontWeight: 600, lg: '15px' } }}>Info</Typography>
      ),
      renderCell: (params) => {
        const { row } = params;
        return (
          <Stack sx={{ height: '100%' }} direction='row' gap={1} alignItems='center'>
            <Avatar src='' />
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{row.companyName}</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{row.email}</Typography>
            </Box>
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
    {
      field: 'delete', headerName: '', width: 150,
      renderCell: (params) => {
        return (
          <IconButton>
            <DeleteOutline />
          </IconButton>
        )
      },
    },
  ];


  useEffect(() => {
    getFoodMeetings()
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
        }}>10 meetings</Typography>
      </Stack>
      <Stack direction={{xs:'column',md: 'row'}} gap={2} justifyContent='space-between' mt={3} sx={{ height: '40px' }}>
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
      {/* delete meeting */}
      <CDialog closeDialog={() => setDeleteMeetingDialogOpen(false)} maxWidth='sm' openDialog={deleteMeetingDialogOpen}>
        <Box>
          <img src="/Featured icon.png" alt="" />
          <Typography sx={{ fontSize: { xs: '18px', lg: '22px' }, fontWeight: 600 }}>Delete Meeting?</Typography>
          <Typography sx={{ fontSize: '14px', mt: 1 }}>Are you sure you want to delete this Meeting? This action cannot be undone.</Typography>
          <Stack direction='row' gap={2} mt={3}>
            <Button onClick={() => setDeleteMeetingDialogOpen(false)} fullWidth variant='outlined'>Cancel</Button>
            <Button fullWidth variant='contained' color='error'>Delete</Button>
          </Stack>
        </Box>
      </CDialog>
      <Box mt={{xs:10,md:3}}>
        <DataTable
          columns={columns}
          rows={rows}
        />
      </Box>
    </Box>
  )
}

export default Meeting