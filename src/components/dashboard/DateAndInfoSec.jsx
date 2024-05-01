import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import DateSelector from './DateSelector'
import { removeSelectedDate } from '../../redux/selectedDateSlice'
import { useDispatch, useSelector } from 'react-redux'

const DateAndInfoSec = () => {
  const selectedDate = useSelector((state) => state.selectedDate.date)
  const dispatch = useDispatch()
  return (
    <Box>
      <Stack direction='row' alignItems='center' justifyContent='center' sx={{
        // position:{xs:'absolute',lg:'static'},
        top: 80,
        // width:'100%',
        bgcolor: 'light.main',
        p: 2, borderRadius: '8px', mb: 2,
        // display: { xs: 'none', lg: 'block' }
      }}>
        <Stack sx={{ width: '100%' }} alignItems='center' justifyContent='center'>
          <Typography sx={{ fontSize: '17px', fontWeight: '600', mb: 2, color: 'primary.main' }}>Select Some Date</Typography>
          <DateSelector />
        </Stack>
      </Stack>
      <Box sx={{
        bgcolor: 'light.main',
        p: 2, borderRadius: '8px', mb: 2
      }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
          <Typography sx={{ fontSize: '17px', fontWeight: '600' }}>Selected Dates</Typography>
          <Button onClick={() => dispatch(removeSelectedDate())}>Clear All</Button>
        </Stack>
        {
          selectedDate.length === 0 ?
            <Typography>No Date Selected!</Typography> :
            <Grid container spacing={1}>
              {
                selectedDate.map((date, id) => (
                  <Grid item xs={6} key={id}>

                    <Typography sx={{
                      border: '1px solid lightgray',
                      borderRadius: '8px',
                      p: 1,
                      fontSize: '16px',
                      fontWeight: '400'
                    }}>{date}</Typography>
                  </Grid>
                ))
              }
            </Grid>
        }
      </Box>
      <Box sx={{
        bgcolor: 'light.main',
        p: 2, borderRadius: '8px', mb: 2
      }}>
        <Typography sx={{ fontSize: '17px', fontWeight: '600' }}>Company Information</Typography>
        <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Provato Solutions AS</Typography>
      </Box>
      <Box sx={{
        bgcolor: 'light.main',
        p: 2, borderRadius: '8px', mb: 2
      }}>
        <Typography sx={{ fontSize: '17px', fontWeight: '600' }}>Address</Typography>
        <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>1901 Thornridge Cir. Shiloh, Hawaii 81063</Typography>
      </Box>
    </Box>
  )
}

export default DateAndInfoSec