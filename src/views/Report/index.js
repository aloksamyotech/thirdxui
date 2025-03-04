import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import Service from './Tabs/Service';
import Cases from './Tabs/Cases';
import Session from './Tabs/Session';
import Survey from './Tabs/Survey';

const Report = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff', borderRadius: '10px', minHeight: '100vh' }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary" sx={{gap:2 , display: 'flex'}}>
            <Tab
              label="Service User Report"
              value="1"
              sx={(theme) => ({
                backgroundColor: value === '1' ? theme.palette.secondary.light : 'transparent',
                transition: 'background-color 0.3s ease'
              })}
            />

            <Tab
              label="Cases Report"
              value="2"
              sx={(theme) => ({
                backgroundColor: value === '2' ? theme.palette.secondary.light : 'transparent',
                transition: 'background-color 0.3s ease'
              })}
            />

            <Tab
              label="Sessions Report"
              value="3"
              sx={(theme) => ({
                backgroundColor: value === '3' ? theme.palette.secondary.light : 'transparent',
                transition: 'background-color 0.3s ease'
              })}
            />

            <Tab
              label="Survey Report"
              value="4"
              sx={(theme) => ({
                backgroundColor: value === '4' ? theme.palette.secondary.light : 'transparent',
                transition: 'background-color 0.3s ease'
              })}
            />
          </TabList>

          <TabPanel value="1" sx={{ px: 0 }}>
            <Service />
          </TabPanel>
          <TabPanel value="2" sx={{ px: 0 }}>
            <Cases />
          </TabPanel>
          <TabPanel value="3" sx={{ px: 0 }}>
            <Session />
          </TabPanel>
          <TabPanel value="4" sx={{ px: 0 }}>
            <Survey />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Report;
