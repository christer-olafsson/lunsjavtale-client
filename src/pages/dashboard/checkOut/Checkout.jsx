import { useTheme } from '@emotion/react';
import { ArrowBack, CheckCircle, Close, Edit } from '@mui/icons-material'
import { Autocomplete, Box, Button, Divider, IconButton, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CButton from '../../../common/CButton/CButton';
import CDialog from '../../../common/dialog/CDialog';
import OrderSummary from './OrderSummary';

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


// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };


const Checkout = () => {
  const [tabValue, setTabValue] = useState(0);

  const theme = useTheme()

  const handleTabChange = (event,newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{ maxWidth: '1368px' }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Link to='/dashboard/myside/cart'>
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Checkout</Typography>
        <Box></Box>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 2, lg: 3 }} mt={3}>

        <Box sx={{
          width: { xs: '100%', lg: '70%' },
          p: { xs: 0, lg: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
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
                  <Button onClick={()=> setTabValue(1)} variant='contained' sx={{ width: 'fit-content', alignSelf: 'flex-end', justifySelf: 'end', mt: 2 }}>Processing to Shipping</Button>
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
                <Button onClick={()=> setTabValue(2)} variant='contained' sx={{ width: 'fit-content', alignSelf: 'flex-end', mt: 4 }}>Continue to Payment</Button>
              </Stack>
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={2}>
              <Stack>
                <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Payment Selection</Typography>
                <Typography>Please fill all information below</Typography>
                <Stack direction='row' justifyContent='space-around' mt={4}>
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
                <Link style={{ alignSelf: 'flex-end', marginTop: '30px' }} to='/dashboard/myside/complete'>
                  <Button variant='contained' sx={{ width: 'fit-content' }}>Continue to Order</Button>
                </Link>
              </Stack>
            </CustomTabPanel>

          </Box>
        </Box>
        <OrderSummary/>
      </Stack>
    </Box>
  )
}

export default Checkout