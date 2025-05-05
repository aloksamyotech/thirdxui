import React, { useEffect } from 'react';
import { Grid, Card, Typography, Box, MenuItem, TextField } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { LocalizationProvider, DatePicker, DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FilterPanel = ({
  showFilter,
  formTypes,
  setFormType,
  dateFilters,
  setDateFilter,
  districts,
  setDistrictFilter,
  genders,
  setGenderFilter,
  statuses,
  setStatusFilter,
  serviceTypes,
  setServiceTypeFilter,
  dateOpenedFilters,
  setDateOpenedFilter,
  owners,
  setOwnerFilter,
  dateAddedFilter,
  setDateAddedFilter,
  listNames,
  setListNameFilter,
  formNames,
  setFormNameFilter,
  tags,
  setTagFilter,
  names,
  setNameFilter,
  receipts,
  setReceiptIdFilter,
  campaigns,
  setCampaignFilter,
  caseIds,
  setCaseIdFilter,
  countriesWithFlags,
  setCountryOfOriginFilter,
  donorTypes,
  setDonorTypeFilter,
  durationOptions,
  setDurationFilter,
  amountRanges,
  setAmountRangeFilter,
  recruitmentCampaigns,
  setRecruitmentCampaignFilter,
  activityTypes,
  setActivityTypeFilter,
  sessionNames,
  setSessionNameFilter,
  configurationNames,
  setConfigurationNameFilter,
  timeOptions,
  setTimeFilter,
  sessionLeads,
  setSessionLeadFilter,
  selectedFilters = []
}) => {
  useEffect(() => {
    if (!dateAddedFilter || !setDateAddedFilter) return;
    setDateAddedFilter(dayjs());
  }, [dateAddedFilter, setDateAddedFilter]);

  if (!showFilter) return null;

  const filterMapping = {
    formType: {
      data: formTypes,
      label: 'Form Type',
      onChange: setFormType,
      type: 'select'
    },
    dateFilter: {
      data: dateFilters,
      label: 'By Date',
      onChange: setDateFilter,
      type: 'select'
    },
    districtFilter: {
      data: districts,
      label: 'By Borough/District',
      onChange: setDistrictFilter,
      type: 'select'
    },
    genderFilter: {
      data: genders,
      label: 'By Gender',
      onChange: setGenderFilter,
      type: 'select'
    },
    statusFilter: {
      data: statuses,
      label: 'By Status',
      onChange: setStatusFilter,
      type: 'select'
    },
    serviceTypeFilter: {
      data: serviceTypes,
      label: 'By Service Type',
      onChange: setServiceTypeFilter,
      type: 'select'
    },
    dateOpenedFilter: {
      data: dateOpenedFilters,
      label: 'By Date Opened',
      onChange: setDateOpenedFilter,
      type: 'date'
    },
    ownerFilter: {
      data: owners,
      label: 'By Owner',
      onChange: setOwnerFilter,
      type: 'select'
    },
    dateAddedFilter: {
      label: 'By Date Added',
      onChange: setDateAddedFilter,
      value: dateAddedFilter,
      type: 'date'
    },
    listNameFilter: {
      data: listNames,
      label: 'By List Name',
      onChange: setListNameFilter,
      type: 'select'
    },
    formNameFilter: {
      data: formNames,
      label: 'By Form Name',
      onChange: setFormNameFilter,
      type: 'select'
    },
    tagFilter: {
      data: tags,
      label: 'By Tags',
      onChange: setTagFilter,
      type: 'select'
    },
    nameFilter: {
      data: names,
      label: 'By Name',
      onChange: setNameFilter,
      type: 'select'
    },
    receiptIdFilter: {
      data: receipts,
      label: 'By Receipt ID',
      onChange: setReceiptIdFilter,
      type: 'select'
    },
    campaignFilter: {
      data: campaigns,
      label: 'By Campaign',
      onChange: setCampaignFilter,
      type: 'select'
    },
    caseIdFilter: {
      data: caseIds,
      label: 'By Case ID',
      onChange: setCaseIdFilter,
      type: 'select'
    },
    countryOfOriginFilter: {
      data: countriesWithFlags,
      label: 'By Country of Origin',
      onChange: setCountryOfOriginFilter,
      type: 'select'
    },
    donorTypeFilter: {
      data: donorTypes,
      label: 'By Donor Type',
      onChange: setDonorTypeFilter,
      type: 'select'
    },
    durationFilter: {
      data: durationOptions,
      label: 'By Duration',
      onChange: setDurationFilter,
      type: 'select'
    },
    amountRangeFilter: {
      data: amountRanges,
      label: 'By Amount Range',
      onChange: setAmountRangeFilter,
      type: 'select'
    },
    recruitmentCampaignFilter: {
      data: recruitmentCampaigns,
      label: 'By Recruitment Campaign',
      onChange: setRecruitmentCampaignFilter,
      type: 'select'
    },
    activityTypeFilter: {
      data: activityTypes,
      label: 'By Activity Type',
      onChange: setActivityTypeFilter,
      type: 'select'
    },
    sessionNameFilter: {
      data: sessionNames,
      label: 'By Session Name',
      onChange: setSessionNameFilter,
      type: 'select'
    },
    configurationNameFilter: {
      data: configurationNames,
      label: 'By Configuration Name',
      onChange: setConfigurationNameFilter,
      type: 'select'
    },
    timeFilter: {
      data: timeOptions,
      label: 'By Time',
      onChange: setTimeFilter,
      type: 'time'
    },
    sessionLeadFilter: {
      data: sessionLeads,
      label: 'By Session Lead',
      onChange: setSessionLeadFilter,
      type: 'select'
    }
  };

  return (
    <Grid item xs={3}>
      <Card
        sx={{
          p: 2,
          backgroundColor: '#ffffff',
          borderRadius: 2,
          border: '1px solid #e0e0e0'
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <FilterListIcon sx={{ color: '#4ba1f8', mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Filters
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {selectedFilters?.map((filterKey) => {
            const filter = filterMapping[filterKey];
            if (!filter) return null;

            if (filter.type === 'date') {
              return (
                <LocalizationProvider key={filterKey} dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={filter.label}
                    value={filter.value || dayjs()}
                    onChange={(newValue) => filter.onChange(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </LocalizationProvider>
              );
            }

            if (filter.type === 'select') {
              return (
                <TextField
                  key={filterKey}
                  select
                  label={filter.label}
                  fullWidth
                  size="small"
                  value={filter.value || ''}
                  onChange={(e) => filter.onChange(e.target.value)}
                >
                  {filter.data?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.flag && <img src={option.flag} alt={option.label} style={{ width: 20, height: 15, marginRight: 8 }} />}
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }

            if (filter.type === 'time') {
              return (
                <LocalizationProvider key={filterKey} dateAdapter={AdapterDayjs}>
                  <DesktopTimePicker
                    label={filter.label}
                    ampm={true}
                    value={filter.value || null}
                    onChange={(newValue) => filter.onChange(newValue)}
                    minutesStep={1}
                    views={['hours', 'minutes', 'seconds']}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </LocalizationProvider>
              );
            }

            return null;
          })}
        </Box>
      </Card>
    </Grid>
  );
};

export default FilterPanel;
