import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react'
import { useQuery } from '@apollo/client'
import UserProfile from './general/UserProfile';
import CompanyProfile from './general/CompanyProfile';
import { ME } from '../../../../graphql/query'


const General = () => {
  const [value, setValue] = React.useState('1');

  const { data: user } = useQuery(ME);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ textTransform: 'none' }} label="Brukerprofil" value="1" />
            {
              user?.me.role !== 'employee' &&
              <Tab sx={{ textTransform: 'none' }} label="Bedriftsprofil" value="2" />
            }
          </TabList>
        </Box>
        <TabPanel value="1">
          <UserProfile />
        </TabPanel>
        {
          user?.me.role !== 'employee' &&
          <TabPanel value="2">
            <CompanyProfile />
          </TabPanel>
        }
      </TabContext>
    </Box>
  )
}

export default General