/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Grid, Card, Typography, Box, MenuItem, Chip, TextField, Button, Autocomplete, FormControlLabel, Checkbox } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const FilterPanel = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  showFilter,
  formTypes,
  formType,
  setFormType,
  dateFilters,
  dateFilter,
  setDateFilter,
  districts,
  districtFilter,
  setDistrictFilter,
  genders,
  genderFilter,
  setGenderFilter,
  statuses,
  statusFilter,
  setStatusFilter,
  serviceTypes,
  serviceTypeFilter,
  setServiceTypeFilter,
  createdBy,
  createdByFilter,
  setCreatedByFilter,
  service,
  serviceFilter,
  setServiceFilter,
  dateOpenedFilters,
  dateOpenedFilter,
  setDateOpenedFilter,
  owners,
  ownerFilter,
  setOwnerFilter,
  locations,
  locationFilter,
  setLocationFilter,
  dateAddedFilters,
  dateAddedFilter,
  setDateAddedFilter,
  listNames,
  listNameFilter,
  setListNameFilter,
  formNames,
  formNameFilter,
  setFormNameFilter,
  tags,
  tagFilter,
  setTagFilter,
  names,
  nameFilter,
  setNameFilter,
  receipts,
  receiptIdFilter,
  setReceiptIdFilter,
  campaigns,
  campaignFilter,
  setCampaignFilter,
  caseIds,
  caseIdFilter,
  setCaseIdFilter,
  countriesWithFlags,
  countryOfOriginFilter,
  setCountryOfOriginFilter,
  donorTypes,
  donorTypeFilter,
  setDonorTypeFilter,
  durationOptions,
  durationFilter,
  setDurationFilter,
  amountRanges,
  amountRangeFilter,
  setAmountRangeFilter,
  recruitmentCampaigns,
  recruitmentCampaignFilter,
  setRecruitmentCampaignFilter,
  activityTypes,
  activityTypeFilter,
  setActivityTypeFilter,
  sessionNames,
  sessionNameFilter,
  setSessionNameFilter,
  configurationNames,
  configurationNameFilter,
  setConfigurationNameFilter,
  timeOptions,
  timeFilter,
  setTimeFilter,
  sessionLeads,
  sessionLeadFilter,
  setSessionLeadFilter,
  includeArchives,
  setIncludeArchives,
  selectedFilters = [],
  customDateLabel,
  listTypeFilter,
  listType,
  setListType,
  includeServiceuser,
  setIncludeServiceuser,
  formTitles,
  formTitle,
  setFormTitle,
  dateCreated,
  setDateCreated,
  dateSubmitted,
  setDateSubmitted
}) => {
  useEffect(() => {
    if (!dateAddedFilter || !setDateAddedFilter) return;
    setDateAddedFilter(null);
  }, [dateAddedFilter, setDateAddedFilter]);

  const handleReset = () => {
    if (setStartDate) setStartDate('');
    if (setEndDate) setEndDate('');
    if (setFormType) setFormType('');
    if (setDateFilter) setDateFilter('');
    if (setDistrictFilter) setDistrictFilter('');
    if (setGenderFilter) setGenderFilter('');
    if (setStatusFilter) setStatusFilter('');
    if (setServiceTypeFilter) setServiceTypeFilter('');
    if (setServiceFilter) setServiceFilter('');
    if (setDateOpenedFilter) setDateOpenedFilter('');
    if (setOwnerFilter) setOwnerFilter('');
    if (setLocationFilter) setLocationFilter('');
    if (setDateAddedFilter) setDateAddedFilter('');
    if (setListNameFilter) setListNameFilter('');
    if (setFormNameFilter) setFormNameFilter('');
    if (setCreatedByFilter) setCreatedByFilter('');
    if (setTagFilter) setTagFilter('');
    if (setNameFilter) setNameFilter('');
    if (setReceiptIdFilter) setReceiptIdFilter('');
    if (setCampaignFilter) setCampaignFilter('');
    if (setCaseIdFilter) setCaseIdFilter('');
    if (setCountryOfOriginFilter) setCountryOfOriginFilter('');
    if (setDonorTypeFilter) setDonorTypeFilter('');
    if (setDurationFilter) setDurationFilter('');
    if (setAmountRangeFilter) setAmountRangeFilter('');
    if (setRecruitmentCampaignFilter) setRecruitmentCampaignFilter('');
    if (setActivityTypeFilter) setActivityTypeFilter('');
    if (setSessionNameFilter) setSessionNameFilter('');
    if (setConfigurationNameFilter) setConfigurationNameFilter('');
    if (setTimeFilter) setTimeFilter('');
    if (setSessionLeadFilter) setSessionLeadFilter('');
    if (setIncludeArchives) setIncludeArchives(false);
    if (setListType) setListType('');
    if (setIncludeServiceuser) setIncludeServiceuser(false);
    if (formTitle) setFormTitle('');
    if (dateCreated) setDateCreated('');
    if (dateSubmitted) setDateSubmitted('');
  };

  if (!showFilter) return null;

  const filterMapping = {
    startDate: {
      label: 'Start Date',
      onChange: setStartDate,
      value: startDate,
      type: 'date'
    },
    endDate: {
      label: 'End Date',
      onChange: setEndDate,
      value: endDate,
      type: 'date'
    },
    formType: {
      data: formTypes,
      label: 'Form Type',
      onChange: setFormType,
      value: formType,
      type: 'select'
    },
    dateFilter: {
      data: dateFilters,
      label: 'By Date',
      onChange: setDateFilter,
      value: dateFilter,
      type: 'select'
    },
    districtFilter: {
      data: districts,
      label: 'By Borough/District',
      onChange: setDistrictFilter,
      value: districtFilter,
      type: 'select'
    },
    genderFilter: {
      data: genders,
      label: 'By Gender',
      onChange: setGenderFilter,
      value: genderFilter,
      type: 'select'
    },
    statusFilter: {
      data: statuses,
      label: 'Select Status',
      onChange: setStatusFilter,
      value: statusFilter,
      type: 'select'
    },
    serviceTypeFilter: {
      data: serviceTypes,
      label: 'Select Service Type',
      onChange: setServiceTypeFilter,
      value: serviceTypeFilter,
      type: 'select'
    },
    createdByFilter: {
      data: createdBy,
      label: 'Created By',
      onChange: setCreatedByFilter,
      value: createdByFilter,
      type: 'select'
    },
    serviceFilter: {
      data: service,
      label: 'Select Service',
      onChange: setServiceFilter,
      value: serviceFilter,
      type: 'select'
    },
    dateOpenedFilter: {
      data: dateOpenedFilters,
      label: customDateLabel || 'Start Date',
      onChange: setDateOpenedFilter,
      value: dateOpenedFilter,
      type: 'date'
    },
    ownerFilter: {
      data: owners,
      label: 'By Owner',
      onChange: setOwnerFilter,
      value: ownerFilter,
      type: 'select'
    },
    locationFilter: {
      data: locations,
      label: 'By Location',
      onChange: setLocationFilter,
      value: locationFilter,
      type: 'select'
    },
    dateAddedFilter: {
      data: dateAddedFilters,
      label: 'By Date Added',
      onChange: setDateAddedFilter,
      value: dateAddedFilter,
      type: 'date'
    },
    listNameFilter: {
      data: listNames,
      label: 'List Name',
      onChange: setListNameFilter,
      value: listNameFilter,
      type: 'select'
    },
    formNameFilter: {
      data: formNames,
      label: 'By Form Name',
      onChange: setFormNameFilter,
      value: formNameFilter,
      type: 'select'
    },
    tagFilter: {
      data: tags,
      label: 'By Tags',
      onChange: setTagFilter,
      value: tagFilter,
      type: 'select'
    },
    nameFilter: {
      data: names,
      label: 'Name',
      onChange: setNameFilter,
      value: nameFilter,
      type: 'select'
    },
    receiptIdFilter: {
      data: receipts,
      label: 'By Receipt ID',
      onChange: setReceiptIdFilter,
      value: receiptIdFilter,
      type: 'select'
    },
    campaignFilter: {
      data: campaigns,
      label: 'By Campaign',
      onChange: setCampaignFilter,
      value: campaignFilter,
      type: 'select'
    },
    caseIdFilter: {
      data: caseIds,
      label: 'Case ID',
      onChange: setCaseIdFilter,
      value: caseIdFilter,
      type: 'select'
    },
    countryOfOriginFilter: {
      data: countriesWithFlags,
      label: 'Select country of origin',
      onChange: setCountryOfOriginFilter,
      value: countryOfOriginFilter,
      type: 'select'
    },
    donorTypeFilter: {
      data: donorTypes,
      label: 'By Donor Type',
      onChange: setDonorTypeFilter,
      value: donorTypeFilter,
      type: 'select'
    },
    durationFilter: {
      data: durationOptions,
      label: 'By Duration',
      onChange: setDurationFilter,
      value: durationFilter,
      type: 'select'
    },
    amountRangeFilter: {
      data: amountRanges,
      label: 'By Amount Range',
      onChange: setAmountRangeFilter,
      value: amountRangeFilter,
      type: 'select'
    },
    recruitmentCampaignFilter: {
      data: recruitmentCampaigns,
      label: 'By Recruitment Campaign',
      onChange: setRecruitmentCampaignFilter,
      value: recruitmentCampaignFilter,
      type: 'select'
    },
    activityTypeFilter: {
      data: activityTypes,
      label: 'By Activity Type',
      onChange: setActivityTypeFilter,
      value: activityTypeFilter,
      type: 'select'
    },
    sessionNameFilter: {
      data: sessionNames,
      label: 'By Session Name',
      onChange: setSessionNameFilter,
      value: sessionNameFilter,
      type: 'select'
    },
    configurationNameFilter: {
      data: configurationNames,
      label: 'Configuration Name',
      onChange: setConfigurationNameFilter,
      value: configurationNameFilter,
      type: 'select'
    },
    timeFilter: {
      data: timeOptions,
      label: 'By Time',
      onChange: setTimeFilter,
      value: timeFilter,
      type: 'time'
    },
    sessionLeadFilter: {
      data: sessionLeads,
      label: 'By Session Lead',
      onChange: setSessionLeadFilter,
      value: sessionLeadFilter,
      type: 'select'
    },
    includeArchives: {
      label: 'Include Archives',
      onChange: setIncludeArchives,
      value: includeArchives,
      type: 'checkbox'
    },
    listTypeFilter: {
      data: listType,
      label: 'By List Type',
      onChange: setListType,
      value: listType,
      type: 'select'
    },
    includeServiceuser: {
      label: 'Include Service User',
      onChange: setIncludeServiceuser,
      value: includeServiceuser,
      type: 'checkbox'
    },
    formDisplayTitle: {
      data: formTitles,
      label: 'Form Display Title',
      onChange: setFormTitle,
      value: formTitle,
      type: 'select'
    },
    dateCreated: {
      data: dateCreated,
      label: 'By Date Created',
      onChange: setDateCreated,
      value: dateCreated,
      type: 'date'
    },
    dateSubmitted: {
      data: dateCreated,
      label: 'By Date Submitted',
      onChange: setDateCreated,
      value: dateCreated,
      type: 'date'
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
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <FilterAltOutlinedIcon sx={{ color: '#808191' }} />
            <Typography variant="subtitle1" color="#808191">
              Filters
            </Typography>
          </Box>
          <Button
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            size="small"
            sx={{
              color: '#4ba1f8',
              '&:hover': {
                backgroundColor: 'rgba(75, 161, 248, 0.1)'
              }
            }}
          >
            Reset
          </Button>
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
                    value={filter.value || null}
                    onChange={(newValue) => {
                      if (newValue) {
                        const formattedDate = newValue.format('YYYY-MM-DD');
                        filter.onChange(formattedDate);
                      } else {
                        filter.onChange(null);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                    PopperProps={{
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, 8]
                          }
                        }
                      ],
                      sx: {
                        '& .MuiPaper-root': {
                          width: 220,
                          height: 320,
                          marginLeft: '50px',
                          overflow: 'hidden'
                        },
                        '& .MuiCalendarPicker-root': {
                          width: 240,
                          height: 320,
                          margin: 0,
                          overflow: 'hidden'
                        },
                        '& .MuiPickersFadeTransitionGroup-root': {
                          width: 220,
                          overflow: 'hidden'
                        }
                      }
                    }}
                  />
                </LocalizationProvider>
              );
            }

            if (filter.type === 'select') {
              if (filterKey === 'statusFilter') {
                return (
                  <TextField
                    key={filterKey}
                    select
                    label={filter.label}
                    fullWidth
                    size="small"
                    value={filter.value || ''}
                    onChange={(e) => filter.onChange(e.target.value)}
                    SelectProps={{
                      renderValue: (selected) =>
                        selected ? (
                          <Chip
                            label={filter.data?.find((status) => status.value === selected)?.label || selected}
                            sx={{
                              color:
                                selected?.toLowerCase() === 'active'
                                  ? '#79dbfb'
                                  : selected?.toLowerCase() === 'inactive'
                                  ? '#ff6a67'
                                  : selected?.toLowerCase() === 'open'
                                  ? '#2e7d32'
                                  : selected?.toLowerCase() === 'close'
                                  ? '#c62828'
                                  : selected?.toLowerCase() === 'pending'
                                  ? '#f9a825'
                                  : 'white',
                              backgroundColor:
                                selected?.toLowerCase() === 'active'
                                  ? '#e5f8fe'
                                  : selected?.toLowerCase() === 'inactive'
                                  ? '#ffeae9'
                                  : selected?.toLowerCase() === 'open'
                                  ? '#91FD91'
                                  : selected?.toLowerCase() === 'close'
                                  ? '#FDA191'
                                  : selected?.toLowerCase() === 'pending'
                                  ? '#FFF68D'
                                  : '#e0e0e0',

                              fontWeight: 500,
                              px: 1
                            }}
                          />
                        ) : (
                          ''
                        )
                    }}
                  >
                    {filter.data?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Chip
                          label={option.label}
                          sx={{
                            color:
                              option.value?.toLowerCase() === 'active'
                                ? '#79dbfb'
                                : option.value?.toLowerCase() === 'inactive'
                                ? '#ff6a67'
                                : option.value?.toLowerCase() === 'open'
                                ? '#2e7d32'
                                : option.value?.toLowerCase() === 'close'
                                ? '#c62828'
                                : option.value?.toLowerCase() === 'pending'
                                ? '#f9a825'
                                : 'white',
                            backgroundColor:
                              option.value?.toLowerCase() === 'active'
                                ? '#e5f8fe'
                                : option.value?.toLowerCase() === 'inactive'
                                ? '#ffeae9'
                                : option.value?.toLowerCase() === 'open'
                                ? '#91FD91'
                                : option.value?.toLowerCase() === 'close'
                                ? '#FDA191'
                                : option.value?.toLowerCase() === 'pending'
                                ? '#FFF68D'
                                : '#e0e0e0',

                            fontWeight: 500
                          }}
                        />
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }
              return (
                <Box key={filterKey}>
                  <Autocomplete
                    options={filter.data || []}
                    getOptionLabel={(option) => option.label}
                    value={filter.data?.find((option) => option.value === filter.value) || null}
                    onChange={(_, newValue) => filter.onChange(newValue?.value || '')}
                    renderInput={(params) => <TextField {...params} label={filter.label} size="small" fullWidth />}
                    renderOption={(props, option) => (
                      <li {...props}>
                        {option.flag && <img src={option.flag} alt={option.label} style={{ width: 20, height: 15, marginRight: 8 }} />}
                        {option.label}
                      </li>
                    )}
                    ListboxProps={{
                      style: {
                        maxHeight: '200px'
                      }
                    }}
                    PopperProps={{
                      placement: 'bottom-start'
                    }}
                  />
                </Box>
              );
            }

            if (filter.type === 'time') {
              return (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TextField
                      label={filter.label}
                      type="time"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: 300 }}
                      value={filter.value || ''}
                      onChange={(e) => filter.onChange(e.target.value)}
                      format="hh:mm A"
                      renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                      sx={{
                        '& .MuiInputBase-root.Mui-focused': {
                          backgroundColor: '#e0e0e0'
                        }
                      }}
                    />
                  </LocalizationProvider>
                </>
              );
            }

            if (filter.type === 'checkbox') {
              return (
                <FormControlLabel
                  key={filterKey}
                  control={<Checkbox checked={filter.value || false} onChange={(e) => filter.onChange(e.target.checked)} />}
                  label={filter.label}
                />
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
