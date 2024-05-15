import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import DateSelector from './DateSelector'
import { removeSelectedDate } from '../../redux/selectedDateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'
import { ME } from '../../graphql/query'

const DateAndInfoSec = () => {
  const selectedDate = useSelector((state) => state.selectedDate.date)
  const { data: user } = useQuery(ME)
 
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
        display: {xs:'none',lg: 'block'},
        bgcolor: 'light.main',
        p: 2, borderRadius: '8px', mb: 2
      }}>
        <Typography sx={{ fontSize: '17px', fontWeight: '600', mb: 1 }}>Company Information</Typography>
        <Stack direction='row' gap={2}>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Id :</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{user?.me.company.id}</Typography>
        </Stack>
        <Stack direction='row' gap={2}>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Name :</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{user?.me.company.name}</Typography>
        </Stack>
        <Stack direction='row' gap={2}>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Email :</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{user?.me.company.email}</Typography>
        </Stack>
        <Stack direction='row' gap={2}>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Address :</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{user?.me.address}</Typography>
        </Stack>
        <Stack direction='row' gap={2}>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Post Code :</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{user?.me.company.postCode}</Typography>
        </Stack>
        <Stack direction='row' gap={2}>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Total Employe :</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>{user?.me.company.totalEmployee}</Typography>
        </Stack>
      </Box>
    </Box>
  )
}

export default DateAndInfoSec