import { useTheme } from '@emotion/react';
import { CheckCircle } from '@mui/icons-material';
import { Box, Button, Divider, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={3}>
          {children}
        </Box>
      )}
    </div>
  );
}


const CheckOut = () => {

  const [tabValue, setTabValue] = useState(0);

  const theme = useTheme()

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab sx={{ textTransform: 'none' }} label="Billing Information" />
          <Tab sx={{ textTransform: 'none' }} label="Shipping Information" />
          <Tab sx={{ textTransform: 'none' }} label="Payment Information" />
        </Tabs>
      </Box>

      <CustomTabPanel value={tabValue} index={0}>
        <Box>
          <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Billing Information</Typography>
          <Typography>Please fill all information below</Typography>

          <Stack flex={1} gap={2} mt={3}>
            <TextField id="standard-basic" label="Name" variant="standard" />
            <TextField id="standard-basic" label="Business Address" variant="standard" />
            <TextField id="standard-basic" label="First Name*" variant="standard" />
            <TextField id="standard-basic" label="Sector" variant="standard" />
            <TextField id="standard-basic" label="Country" variant="standard" />
            <TextField id="standard-basic" label="Last Name*" variant="standard" />
            <Button onClick={() => setTabValue(1)} variant='contained' sx={{textWrap:'nowrap', alignSelf: 'flex-end', justifySelf: 'end', mt: 2 }}>Processing to Shipping</Button>
          </Stack>

        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={1}>
        <Stack>
          <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Shipping Information</Typography>
          <Typography>Please fill all information below</Typography>
          <Paper sx={{
            pt: 3, pl: 3, pr: 3, pb: 1, mt: 4,
            border: `1px solid ${theme.palette.primary.main}`,
            bgcolor: 'light.main',
            cursor: 'pointer'
          }}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 2 }}>OFFICE ADDRESS</Typography>
              <CheckCircle sx={{ alignSelf: 'flex-end', color: 'primary.main' }} />
            </Stack>
            <Typography>James Honda</Typography>
            <Typography>1246 Virgil Street Pensacola, FL 32501 Mo. 012-345-6789</Typography>
            <Divider sx={{ mt: 2 }} />
            <Stack direction='row' justifyContent='space-between'>
              <Button>Edit</Button>
              <Button>Remove</Button>
            </Stack>
          </Paper>
          <Paper sx={{
            pt: 3, pl: 3, pr: 3, pb: 1, mt: 4,
            cursor: 'pointer'
            // border: `1px solid ${theme.palette.primary.main}`,
          }}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 2 }}>HOME ADDRESS</Typography>
              {/* <CheckCircle sx={{ alignSelf: 'flex-end', color: 'primary.main' }} /> */}
            </Stack>
            <Typography>James Honda</Typography>
            <Typography>1246 Virgil Street Pensacola, FL 32501 Mo. 012-345-6789</Typography>
            <Divider sx={{ mt: 2 }} />
            <Stack direction='row' justifyContent='space-between'>
              <Button>Edit</Button>
              <Button>Remove</Button>
            </Stack>
          </Paper>
          <Stack sx={{ mt: 4 }} gap={2} direction='row' justifyContent='space-between'>
            <Button onClick={() => setTabValue(0)} sx={{textWrap:'nowrap'}} variant='outlined' >Back to Billing Info</Button>
            <Button onClick={() => setTabValue(2)} sx={{textWrap:'nowrap'}} variant='contained' >Continue to Payment</Button>
          </Stack>
        </Stack>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2}>
        <Stack>
          <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Payment Selection</Typography>
          <Typography>Please fill all information below</Typography>
          <Stack direction={{xs:'column',lg: 'row'}} justifyContent='space-around' mt={4} gap={2 }>
            <Button variant='outlined'>Save Payment Method</Button>
            <Button endIcon={<CheckCircle sx={{ color: 'primary.main' }} />} variant='outlined'>Credit/Debit Card</Button>
            <Button variant='outlined'>Cash On Delivery</Button>
          </Stack>
          <Stack mt={5} gap={2}>
            <TextField size='small' label='Name on card' />
            <TextField size='small' label='Card Number' />
            <TextField size='small' label='Exprit' />
            <TextField size='small' label='CCV' />
          </Stack>
          <Stack sx={{ mt: 4 }} gap={2} direction='row' justifyContent='space-between'>
            <Button onClick={() => setTabValue(1)} sx={{textWrap:'nowrap'}} variant='outlined' >Back to Shipping Info</Button>
            <Link to='/dashboard/complete'>
              <Button variant='contained' sx={{textWrap:'nowrap'}}>Continue to Payment</Button>
            </Link>
          </Stack>
        </Stack>
      </CustomTabPanel>

    </Box>
  )
}

export default CheckOut