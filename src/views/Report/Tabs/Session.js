import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react'
import Chart from './Chart';
import ServiceList from './ServiceList';
import { useState } from 'react';
import CaseList from './CaseList';

const Session = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab label="Chart View" value="2" 
             sx={(theme) => ({
              backgroundColor: value === '2' ? '#e3f2fd' : 'transparent',
              transition: 'background-color 0.3s ease',
              marginRight: 2
            })}/>
            <Tab label="List View" value="1"
             sx={(theme) => ({
              backgroundColor: value === '1' ? '#e3f2fd' : 'transparent',
              transition: 'background-color 0.3s ease',
              marginRight: 2
            })} />
          </TabList>
        <TabPanel value="1" sx={{ p: 0 }}><ServiceList /></TabPanel>
        <TabPanel value="2" ><Chart /></TabPanel>
      </TabContext>
    </Box>
  );
}

export default Session