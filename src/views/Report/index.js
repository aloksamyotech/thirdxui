import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import Service from './Tabs/Service'
import Cases from './Tabs/Cases'
import Session from './Tabs/Session'
import Survey from './Tabs/Survey'

const Report = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (<>
    <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff', borderRadius: '10px', minHeight: '100vh' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary">
            <Tab label="Service User Report" value="1" />
            <Tab label="Cases Report" value="2" />
            <Tab label="Session Report" value="3" />
            <Tab label="Survey Report" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ px: 0 }}><Service /></TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}><Cases /></TabPanel>
        <TabPanel value="3" sx={{ px: 0 }}><Session /></TabPanel>
        <TabPanel value="4" sx={{ px: 0 }}><Survey /></TabPanel>
      </TabContext>
    </Box>
  </>
  )
}

export default Report