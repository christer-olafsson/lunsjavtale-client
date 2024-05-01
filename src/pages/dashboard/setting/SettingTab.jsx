import { Delete } from "@mui/icons-material";
import { Avatar, Box, Button, Paper, Stack, Tab, Tabs, Typography, styled, tabClasses, tabsClasses, useMediaQuery } from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";
import General from "./tabs/General";
import Account from "./tabs/Account";
import Notification from "./tabs/Notification";
import Security from "./tabs/Security";
import Payment from "./tabs/Payment";


const TabItem = styled(Tab)(({ theme }) => ({
  position: "relative",
  borderRadius: "4px",
  textAlign: "center",
  textTransform: 'none',
  transition: "all .5s",
  padding: "5px 10px",
  color: "#555555",
  height: "auto",
  marginRight: '10px',
  float: "none",
  fontSize: "14px",
  fontWeight: "500",
  [theme.breakpoints.up("md")]: {
    minWidth: 120,
  },
  [`&.${tabClasses.selected}`]: {
    backgroundColor: '#fff',
    fontWeight: 600,
    border: '1px solid lightgray'
    // boxShadow: "0 7px 10px -5px rgba(76, 175, 80, 0.4)",
  },
}));

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
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const tabName = [
  'General ', 'Account', 'Notification', 'Security', 'Payment'
]

const SettingTab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));


  return (
    <Paper elevation={isMobile ? 0 : 4}>
      <Stack direction='row' sx={{ justifyContent: 'center', }}>
        <Tabs
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
          sx={{
            width: "100%",
            bgcolor: 'light.main',
            borderRadius: '8px',
            py: 2,
            [`& .${tabsClasses.indicator}`]: {
              display: "none",
            },
          }}
        >
          {
            tabName.map((item) => (
              <TabItem key={item} disableRipple label={item} />
            ))
          }
        </Tabs>
      </Stack>

      <Box sx={{ p: {xs:1,lg:3} }}>
        <CustomTabPanel value={tabIndex} index={0}><General /></CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={1}><Account/></CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={2}><Notification/></CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={3}><Security/></CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={4}><Payment/></CustomTabPanel>
      </Box>

    </Paper>
  )
}

export default SettingTab