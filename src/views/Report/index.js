import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import Service from './Tabs/Service';
import Cases from './Tabs/Cases';
import Session from './Tabs/Session';
import Survey from './Tabs/Survey';
import FilterPanel from 'components/FilterPanel';

const Report = () => {
  const [value, setValue] = useState('1');
  const [showFilter, setShowFilter] = useState(true);
  const [formType, setFormType] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const formTypes = [
    { value: 'Self Referral form', label: 'Self Referral form' },
    { value: 'Community Referral form', label: 'Community Referral form' },
    { value: 'Satisfaction survey', label: 'Satisfaction survey' },
    { value: 'Volunteer sign up form', label: 'Volunteer sign up form' },
    { value: 'Workshop sign up form', label: 'Workshop sign up form' }
  ];

  const dateFilters = [
    { value: 'today', label: 'All Dates' },
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
    { value: 'year', label: 'Last 2 months' }
  ];
  return (
    <>
      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          formTypes={formTypes}
          setFormType={setFormType}
          dateFilters={dateFilters}
          setDateFilter={setDateFilter} />
        <Grid item xs={9}>
          <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff', borderRadius: '10px', minHeight: '100vh' }}>
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                sx={{
                  display: 'flex',
                  gap: 2,
                  borderBottom: '1px solid #1e87e4'
                }}
              >
                <Tab
                  label="Service User Report"
                  value="1"
                  sx={(theme) => ({
                    backgroundColor: value === '1' ? '#e3f2fd' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    marginRight: 2
                  })}
                />

                <Tab
                  label="Cases Report"
                  value="2"
                  sx={(theme) => ({
                    backgroundColor: value === '2' ? '#e3f2fd' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    marginRight: 2
                  })}
                />

                <Tab
                  label="Sessions Report"
                  value="3"
                  sx={(theme) => ({
                    backgroundColor: value === '3' ? '#e3f2fd' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    marginRight: 2
                  })}
                />

                <Tab
                  label="Survey Report"
                  value="4"
                  sx={(theme) => ({
                    backgroundColor: value === '4' ? '#e3f2fd' : 'transparent',
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
        </Grid>
      </Grid>
    </>
  );
};

export default Report;
