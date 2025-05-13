import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Divider, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Service from './Tabs/Service';
import Cases from './Tabs/Cases';
import Session from './Tabs/Session';
import Survey from './Tabs/Survey';
import Donor from './Tabs/Donor';
import FilterPanel from 'components/FilterPanel';

const statusFilter = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

const dateAddedFilters = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 1 Year' }
];

const nameFilter = [
  { value: 'name1', label: 'Name 1' },
  { value: 'name2', label: 'Name 2' }
];

const caseIds = [
  { value: 'case001', label: 'Case 001' },
  { value: 'case002', label: 'Case 002' }
];

const Report = () => {
  const [value, setValue] = useState('1');
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [name, setNameFilter] = useState('');
  const [countriesWithFlags, setCountriesWithFlags] = useState([]);
  const [caseId, setCaseIdFilter] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
          flag: country.flags.png
        }));
        setCountriesWithFlags(countries);
      });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          statuses={statusFilter}
          setStatusFilter={setStatus}
          dateAddedFilters={dateAddedFilters}
          setDateAddedFilter={setDateOpenedFilter}
          names={nameFilter}
          setNameFilter={setNameFilter}
          caseIds={caseIds}
          setCaseIdFilter={setCaseIdFilter}
          countriesWithFlags={countriesWithFlags}
          selectedFilters={['countryOfOriginFilter', 'dateOpenedFilter', 'nameFilter', 'statusFilter', 'caseIdFilter']}
        />

        <Grid item xs={9}>
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              sx={{
                display: 'flex'
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
                label="Surveys Report"
                value="4"
                sx={(theme) => ({
                  backgroundColor: value === '4' ? '#e3f2fd' : 'transparent',
                  transition: 'background-color 0.3s ease'
                })}
              />
              <Tab
                label="Donor Report"
                value="5"
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
            <TabPanel value="5" sx={{ px: 0 }}>
              <Donor />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </>
  );
};

export default Report;
