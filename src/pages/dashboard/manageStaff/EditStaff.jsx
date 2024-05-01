import { Close } from '@mui/icons-material'
import { Avatar, Box, Button, FormGroup, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CButton from '../../../common/CButton/CButton';
import { useTheme } from '@emotion/react';

const allergies = [
  'Gluten (oats, wheat, rye, spelt, barley)',
  'Peanuts',
  'Milks',
  'Fishs',
  'Shellfish',
  'Egg',
];

const EditStaff = ({ closeDialog }) => {
  const [staffImg, setStaffImg] = useState('');
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const theme = useTheme()

  const toggleAllergy = (allergy) => {
    const isSelected = selectedAllergies.includes(allergy);
    if (isSelected) {
      setSelectedAllergies(selectedAllergies.filter(item => item !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' mb={4}>
        <Typography variant='h4'>Edit Here</Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>
      <Stack direction='row' alignItems='center' gap={2}>
        <Avatar sx={{ width: {xs:'60px',lg:'96px'}, height: {xs:'60px',lg:'96px'} }} src={staffImg ? URL.createObjectURL(staffImg) : ''} />
        <Box sx={{
          bgcolor: 'primary.main',
          width: {xs:'200px',lg:'100%'},
          padding: '12px 24px',
          borderRadius: '6px',
          color: '#fff'
        }}>
          <input onChange={e => setStaffImg(e.target.files[0])} type="file" id='staffImg' accept='jpg,png' />
        </Box>
      </Stack>
      <FormGroup>
        <Stack mt={4}>
          <Stack direction='row' gap={2} mb={2}>
          <Stack flex={1} gap={2}>
              <TextField size='small' label='Name' />
              <TextField size='small' label='Email' />
              <TextField size='small' label='Job Title' />
            </Stack>
            <Stack flex={1} gap={2}>
              <TextField size='small' label='Last Name' />
              <TextField size='small' label='Phone Number' />
            </Stack>
          </Stack>
        </Stack>
      </FormGroup>

      <Box mt={2}>
        <Typography variant='h6' mb={1}>Allergies</Typography>
        {
            <Stack direction='row' flexWrap='wrap'>
              {allergies.map((allergy, index) => (
                <Box
                  key={index}
                  onClick={() => toggleAllergy(allergy)}
                  sx={{
                    padding: { xs: '3px 5px', md: '6px 10px' },
                    margin: '5px',
                    cursor: 'pointer',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                    color: selectedAllergies.includes(allergy) ? '#fff' : 'inherit',
                    bgcolor: selectedAllergies.includes(allergy) ? 'primary.main' : 'transparent',
                    userSelect: 'none'
                  }}
                >
                  <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>{allergy}</Typography>
                </Box>
              ))}
            </Stack>
        }
      </Box>

      <Box sx={{
        padding: { xs: '5px 10px', md: '12px 24px' },
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px', mt: 2,
        textAlign: 'center'
      }}>
        <Typography sx={{fontSize:{xs:'14px',lg:'16px'}}}>Nuts (almonds, hazelnuts, walnuts, cashews, pecans, pistachios, brazil nuts and
          macadamia nuts)</Typography>
      </Box>

      <CButton variant='contained' style={{ width: '100%', mt: 2, height: { xs: '45px', md: '45px' } }}>
        Update
      </CButton>

    </Box >
  )
}

export default EditStaff