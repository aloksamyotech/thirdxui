import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react'
import Chart from './Chart';
import ServiceList from './ServiceList';
import { useState } from 'react';
import CaseList from './CaseList';

const Cases = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary">
            <Tab label="Chart View" value="2" />
            <Tab label="List View" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: 0 }}><CaseList /></TabPanel>
        <TabPanel value="2" ><Chart /></TabPanel>
      </TabContext>
    </Box>
  );
}

export default Cases