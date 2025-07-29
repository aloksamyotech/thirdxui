import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Divider, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Service from './Tabs/Service';
import Cases from './Tabs/Cases';
import Session from './Tabs/Session';
import Survey from './Tabs/Survey';
import Donor from './Tabs/Donor';
import Attendee from './Tabs/Attendee'
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
          value: country?.name?.common,
          label: country?.name?.common,
          flag: country?.flags?.png
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
const FilterPanelProp ={
                    showFilter:true,
                    statuses: statusFilter,
                    statusFilter: status,
                    setStatusFilter: setStatus,
                    dateAddedFilters,
                    dateOpenedFilter,
                    setDateOpenedFilter,
                    names: nameFilterOptions,
                    nameFilter: selectedName,
                    setNameFilter: setSelectedName,
                    caseIds: uniqueIds,
                    caseIdFilter: caseId,
                    setCaseIdFilter,
                    countriesWithFlags,
                    countryOfOriginFilter,
                    setCountryOfOriginFilter,
                    selectedFilters: ['countryOfOriginFilter', 'dateOpenedFilter', 'nameFilter', 'statusFilter', 'caseIdFilter'],
                    customDateLabel: 'By Date',
                  }
  return (
    <>
      <Grid container spacing={2}>
           <Grid item xs={12}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto' }}>
              <TabList
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{ whiteSpace: 'nowrap' }}
                TabIndicatorProps={{ style: { backgroundColor: '#666CFF' } }}
              >
                <Tab
                  label="Service User Report"
                  value="1"
                  sx={{
                    backgroundColor: value === '1' ? '#666CFF1A' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    marginRight: 2,
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#2E2E30E5',
                    '&.Mui-selected': {
                      color: '#666CFF',
                      backgroundColor: '#666CFF1A',
                      borderColor: '#666CFF'
                    }
                  }}
                />
                <Tab
                  label="Cases Report"
                  value="2"
                  sx={{
                    backgroundColor: value === '2' ? '#666CFF1A' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    marginRight: 2,
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#2E2E30E5',
                    '&.Mui-selected': {
                      color: '#666CFF',
                      backgroundColor: '#666CFF1A',
                      borderColor: '#666CFF'
                    }
                  }}
                />
                <Tab
                  label="Sessions Report"
                  value="3"
                  sx={{
                    backgroundColor: value === '3' ? '#666CFF1A' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    marginRight: 2,
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#2E2E30E5',
                    '&.Mui-selected': {
                      color: '#666CFF',
                      backgroundColor: '#666CFF1A',
                      borderColor: '#666CFF'
                    }
                  }}
                />
                <Tab
                  label="Key Indicators Report"
                  value="4"
                  sx={{
                    backgroundColor: value === '4' ? '#666CFF1A' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    marginRight: 2,
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#2E2E30E5',
                    '&.Mui-selected': {
                      color: '#666CFF',
                      backgroundColor: '#666CFF1A',
                      borderColor: '#666CFF'
                    }
                  }}
                />
                <Tab
                  label="Attendance Report"
                  value="5"
                  sx={{
                    backgroundColor: value === '5' ? '#666CFF1A' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    marginRight: 2,
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#2E2E30E5',
                    '&.Mui-selected': {
                      color: '#666CFF',
                      backgroundColor: '#666CFF1A',
                      borderColor: '#666CFF'
                    }
                  }}
                />
                <Tab
                  label="Donor Report"
                  value="6"
                  sx={{
                    backgroundColor: value === '6' ? '#666CFF1A' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    fontWeight: '600',
                    fontSize: '14px',
                    color: '#2E2E30E5',
                    '&.Mui-selected': {
                      color: '#666CFF',
                      backgroundColor: '#666CFF1A',
                      borderColor: '#666CFF'
                    }
                  }}
                />
              </TabList>
            </Box>

           {value === '1' && ( <TabPanel
              value="1"
              sx={{
                px: 0,
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                width: '100%',
                flexWrap: 'nowrap',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  minWidth: 0,
                }}
              >
                <Service
                  countryOfOriginFilter={countryOfOriginFilter}
                  selectedName={selectedName}
                  status={status}
                  caseId={caseId}
                  dateOpenedFilter={dateOpenedFilter}
                  FilterPanelProp={FilterPanelProp}
                />
              </Box>
            </TabPanel>
              )}
              {value === '2' && (
            <TabPanel
              value="2"
              sx={{
                px: 0,
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                width: '100%',
                flexWrap: 'nowrap',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  minWidth: 0,
                }}
              >
                <Cases
                  countryOfOriginFilter={countryOfOriginFilter}
                  selectedName={selectedName}
                  status={status}
                  caseId={caseId}
                  dateOpenedFilter={dateOpenedFilter}
                  FilterPanelProp={FilterPanelProp}
                />
              </Box>
            </TabPanel>
            )}
            {value === '3' && (
            <TabPanel
              value="3"
              sx={{
                px: 0,
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                width: '100%',
                flexWrap: 'nowrap',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  minWidth: 0,
                }}
              >
                <Session
                  countryOfOriginFilter={countryOfOriginFilter}
                  selectedName={selectedName}
                  status={status}
                  caseId={caseId}
                  dateOpenedFilter={dateOpenedFilter}
                  FilterPanelProp={FilterPanelProp}
                />
              </Box>
            </TabPanel>
              )}
              {value === '4' && (
            <TabPanel
              value="4"
              sx={{
                px: 0,
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                width: '100%',
                flexWrap: 'nowrap',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  minWidth: 0,
                }}
              >
                <Survey 
                  countryOfOriginFilter={countryOfOriginFilter}
                  selectedName={selectedName}
                  status={status}
                  caseId={caseId}
                  dateOpenedFilter={dateOpenedFilter}
                  FilterPanelProp={FilterPanelProp}/>
              </Box>
            </TabPanel>
            )}
            {value === '5' && (
              <TabPanel
              value="5"
              sx={{
                px: 0,
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                width: '100%',
                flexWrap: 'nowrap',
              }}
              >
              <Box
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  minWidth: 0,
                }}
              >
                <Attendee
                  countryOfOriginFilter={countryOfOriginFilter}
                  selectedName={selectedName}
                  status={status}
                  caseId={caseId}
                  dateOpenedFilter={dateOpenedFilter}
                 FilterPanelProp={FilterPanelProp}
                />
              </Box>
            </TabPanel>
            )}
            {value === '6' && (
            <TabPanel
              value="6"
              sx={{
                px: 0,
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                width: '100%',
                flexWrap: 'nowrap',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  minWidth: 0,
                }}
              >
                <Donor selectedName={selectedName} status={status} caseId={caseId} dateOpenedFilter={dateOpenedFilter} FilterPanelProp={FilterPanelProp} />
              </Box>
            </TabPanel>)}
          </TabContext>
        </Grid>
      </Grid>
    </>
  );
};

export default Report;
