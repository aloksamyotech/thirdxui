import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Divider, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Service from './Tabs/Service';
import Cases from './Tabs/Cases';
import Session from './Tabs/Session';
import Survey from './Tabs/Survey';
import Donor from './Tabs/Donor';
import FilterPanel from 'components/FilterPanel';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';
import config from '../../config';

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
  const [countryOfOriginFilter, setCountryOfOriginFilter] = useState('');
  const [nameFilterOptions, setNameFilterOptions] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [uniqueIds, setUniqueIds] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCountryOfOriginFilter('');
    setSelectedName('');
    setStatus('');
    setCaseIdFilter('');
    setDateOpenedFilter('');
  };

  useEffect(() => {
    fetch(config.filter_Country)
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

  const fetchUserName = async () => {
    try {
      const response = await getApi(`${urls.serviceuser.fetchWithPagination}`);

      const users = response?.data?.data || [];

      const nameOptions = users.map((user) => ({
        value: user._id,
        label: `${user.personalInfo?.firstName || ''} ${user.personalInfo?.lastName || ''}`.trim()
      }));

      const uniqueIdList = users.map((user) => ({
        value: user._id,
        label: user.uniqueId
      }));

      setUniqueIds(uniqueIdList);

      setNameFilterOptions(nameOptions);
    } catch (error) {
      console.error('Error fetching user names:', error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          statuses={statusFilter}
          statusFilter={status}
          setStatusFilter={setStatus}
          dateAddedFilters={dateAddedFilters}
          dateOpenedFilter={dateOpenedFilter}
          setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
          names={nameFilterOptions}
          nameFilter={selectedName}
          setNameFilter={setSelectedName}
          caseIds={uniqueIds}
          caseIdFilter={caseId}
          setCaseIdFilter={setCaseIdFilter}
          countriesWithFlags={countriesWithFlags}
          countryOfOriginFilter={countryOfOriginFilter}
          setCountryOfOriginFilter={(value) => setCountryOfOriginFilter(value)}
          selectedFilters={['countryOfOriginFilter', 'dateOpenedFilter', 'nameFilter', 'statusFilter', 'caseIdFilter']}
          customDateLabel="By Date"
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
                  marginRight: 2,
                  fontWeight: '600',
                  fontSize: '14px'
                })}
              />

              <Tab
                label="Cases Report"
                value="2"
                sx={(theme) => ({
                  backgroundColor: value === '2' ? '#e3f2fd' : 'transparent',
                  transition: 'background-color 0.3s ease',
                  marginRight: 2,
                  fontWeight: '600',
                  fontSize: '14px'
                })}
              />

              <Tab
                label="Sessions Report"
                value="3"
                sx={(theme) => ({
                  backgroundColor: value === '3' ? '#e3f2fd' : 'transparent',
                  transition: 'background-color 0.3s ease',
                  marginRight: 2,
                  fontWeight: '600',
                  fontSize: '14px'
                })}
              />

              <Tab
                label="Surveys Report"
                value="4"
                sx={(theme) => ({
                  backgroundColor: value === '4' ? '#e3f2fd' : 'transparent',
                  transition: 'background-color 0.3s ease',
                  fontWeight: '600',
                  fontSize: '14px'
                })}
              />
              <Tab
                label="Donor Report"
                value="5"
                sx={(theme) => ({
                  backgroundColor: value === '4' ? '#e3f2fd' : 'transparent',
                  transition: 'background-color 0.3s ease',
                  fontWeight: '600',
                  fontSize: '14px'
                })}
              />
            </TabList>

            <TabPanel value="1" sx={{ px: 0 }}>
              <Service
                countryOfOriginFilter={countryOfOriginFilter}
                selectedName={selectedName}
                status={status}
                caseId={caseId}
                dateOpenedFilter={dateOpenedFilter}
              />
            </TabPanel>
            <TabPanel value="2" sx={{ px: 0 }}>
              <Cases
                countryOfOriginFilter={countryOfOriginFilter}
                selectedName={selectedName}
                status={status}
                caseId={caseId}
                dateOpenedFilter={dateOpenedFilter}
              />
            </TabPanel>
            <TabPanel value="3" sx={{ px: 0 }}>
              <Session
                countryOfOriginFilter={countryOfOriginFilter}
                selectedName={selectedName}
                status={status}
                caseId={caseId}
                dateOpenedFilter={dateOpenedFilter}
              />
            </TabPanel>
            <TabPanel value="4" sx={{ px: 0 }}>
              <Survey />
            </TabPanel>
            <TabPanel value="5" sx={{ px: 0 }}>
              <Donor selectedName={selectedName} status={status} caseId={caseId} dateOpenedFilter={dateOpenedFilter} />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </>
  );
};

export default Report;
