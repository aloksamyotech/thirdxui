/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Grid, Card, Typography, Box, MenuItem, Chip, TextField, Button, Autocomplete, FormControlLabel, Checkbox } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { LocalizationProvider, DatePicker, DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FilterPanel = ({
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
  dateOpenedFilters,
  dateOpenedFilter,
  setDateOpenedFilter,
  owners,
  ownerFilter,
  setOwnerFilter,
  dateAddedFilter,
  dateAdded,
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
  selectedFilters = []
}) => {
  useEffect(() => {
    if (!dateAddedFilter || !setDateAddedFilter) return;
    setDateAddedFilter(dayjs());
  }, [dateAddedFilter, setDateAddedFilter]);

  const handleReset = () => {
    if (setFormType) setFormType('');
    if (setDateFilter) setDateFilter('');
    if (setDistrictFilter) setDistrictFilter('');
    if (setGenderFilter) setGenderFilter('');
    if (setStatusFilter) setStatusFilter('');
    if (setServiceTypeFilter) setServiceTypeFilter('');
    if (setDateOpenedFilter) setDateOpenedFilter('');
    if (setOwnerFilter) setOwnerFilter('');
    if (setDateAddedFilter) setDateAddedFilter('');
    if (setListNameFilter) setListNameFilter('');
    if (setFormNameFilter) setFormNameFilter('');
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
  };

  if (!showFilter) return null;

  const filterMapping = {
    formType: {
      data: formTypes,
      label: 'By Form Type',
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
    dateOpenedFilter: {
      data: dateOpenedFilters,
      label: 'Date Opened',
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
    dateAddedFilter: {
      label: 'By Date Added',
      onChange: setDateAddedFilter,
      value: dateAdded,
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
      label: 'By Configuration Name',
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
                <>
                  <LocalizationProvider key={filterKey} dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={filter.label}
                        value={filter.value || dayjs()}
                        onChange={(newValue) => filter.onChange(newValue)}
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
                              height: 260,
                              marginLeft:'50px'
                            },
                            '& .MuiPickersCalendarHeader-root': {
                              maxWidth: '220px',
                              fontSize: '1.2rem'
                            },
                            '& .MuiDayPicker-header': {
                              maxWidth: '220px'
                            },
                            '& .MuiDayPicker-monthContainer': {
                              maxWidth: '220px'
                            },
                            '& .MuiPickersDay-root': {
                              maxWidth: '220px',
                              height: '30px',
                              margin: '0 2px',
                              fontSize: '0.6rem'
                            }
                          }
                        }}
                      />
                  </LocalizationProvider>
                </>
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
                                  : 'white',
                              backgroundColor:
                                selected?.toLowerCase() === 'active'
                                  ? '#e5f8fe'
                                  : selected?.toLowerCase() === 'inactive'
                                  ? '#ffeae9'
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
                                : 'white',
                            backgroundColor:
                              option.value?.toLowerCase() === 'active'
                                ? '#e5f8fe'
                                : option.value?.toLowerCase() === 'inactive'
                                ? '#ffeae9'
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
                      onChange={(newValue) => filter.onChange(newValue)}
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
                  control={
                    <Checkbox
                      checked={filter.value || false}
                      onChange={(e) => filter.onChange(e.target.checked)}
                      // sx={{
                      //   color: '#4ba1f8',
                      //   '&.Mui-checked': {
                      //     color: '#4ba1f8',
                      //   },
                      // }}
                    />
                  }
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
