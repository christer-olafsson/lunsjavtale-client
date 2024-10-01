/* eslint-disable react/prop-types */
import { Close, AccessTime, CalendarToday, Person, Email, Phone, Title, Description, Topic } from '@mui/icons-material'
import { Box, Divider, IconButton, Stack, Typography, Paper, Chip, Grid } from '@mui/material'
import { format } from 'date-fns'
import React from 'react'

const MeetingDetails = ({ data, closeDialog }) => {

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
        <Typography variant='h4' fontWeight='bold'>Meeting Details</Typography>
        <IconButton onClick={closeDialog} sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}>
          <Close />
        </IconButton>
      </Stack>

      <Chip
        label={`STATUS: ${data?.status.toUpperCase()}`}
        sx={{
          mb: 3,
          fontWeight: 'bold',
          color: '#fff',
          bgcolor: data?.status === 'attended' ? 'success.main' :
            data?.status === 'postponed' ? 'error.main' : 'warning.main',
          px: 2,
          py: 3,
          fontSize: '1rem'
        }}
      />

      {data?.note && (
        <Paper variant="outlined" sx={{ p: 2, mb: 3, borderColor: 'primary.main' }}>
          <Typography variant='subtitle1' fontWeight='bold' color='primary.main' gutterBottom>Note:</Typography>
          <Typography variant='body1'>{data?.note}</Typography>
        </Paper>
      )}

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <AccessTime color='primary' />
            <Typography><b>Submit Time:</b> {format(data?.createdOn, 'dd-MM-yyyy hh:mm a')}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <CalendarToday color='primary' />
            <Typography><b>Meeting Time:</b> {format(data?.meetingTime, 'dd-MM-yyyy hh:mm a')}</Typography>
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <DetailItem icon={<Title />} label="Meeting Title" value={data?.title} />
            <DetailItem icon={<Description />} label="Meeting Type" value={data?.meetingType} />
            <DetailItem icon={<Description />} label="Description" value={data?.description} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h6' fontWeight='bold' mb={2}>
            <Topic color='primary' sx={{ mr: 1, verticalAlign: 'middle' }} />
            Topics:
          </Typography>
          <Stack direction='row' flexWrap='wrap' gap={1}>
            {data?.topics?.edges.map(item => (
              <Chip key={item.node.id} label={item.node.name} color='primary' variant='outlined' />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

const DetailItem = ({ icon, label, value }) => (
  <Stack direction='row' alignItems='center' spacing={1}>
    {React.cloneElement(icon, { color: 'primary' })}
    <Typography><b>{label}:</b> {value}</Typography>
  </Stack>
)

export default MeetingDetails