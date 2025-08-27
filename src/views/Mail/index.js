import { useState, useEffect } from 'react';
import { Stack, Grid, Typography, Box, Card, TextField, IconButton, Tooltip, InputBase, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FilterPanel from 'components/FilterPanel';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import CustomHeader from 'components/CustomHeader';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChooseTypeDialog from './ChooseTypeDialog';

const Mail = () => {
  const navigate = useNavigate();
  const [listName, setListName] = useState('');
  const [listFilters, setListFilters] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [value, setValue] = useState('1');
  const [tag, setTag] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [includeArchives, setIncludeArchives] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [tagOptions, setTagOptions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const tags = [
    { value: 'urgent', label: 'Urgent' },
    { value: 'follow-up', label: 'Follow-up' }
  ];

  const columns = [
    {
      field: 'person',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <PersonIcon />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 450 }}>
                {params.row.name} {params.row.serialNumber}
              </Typography>
            </Box>
          </Stack>

          <Tooltip title="Info" arrow>
            <IconButton>
              <InfoIcon sx={{ color: '#49494c' }} />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (listName && listName !== '') {
        queryParams.append('name', listName);
      }

      if (tag && tag !== '') {
        queryParams.append('tag', tag);
      }
      if (startDate) {
        queryParams.append('startDate', new Date(startDate).toISOString());
      }
      if (endDate) {
        queryParams.append('endDate', new Date(endDate).toISOString());
      }
      if (searchQuery && searchQuery.trim() !== '') {
        queryParams.append('search', searchQuery.trim());
      }

      queryParams.append('page', paginationModel.page + 1);
      queryParams.append('limit', paginationModel.pageSize);
      queryParams.append('tabValue', value);
      if (!includeArchives) {
        queryParams.append('archive', 'false');
      }

      const url = `${urls.mail.fetchWithPagination}?${queryParams.toString()}`;

      const response = await getApi(url);

      const allMail = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const formattedUsers = allMail?.map((user, index) => {
        return {
          id: user._id,
          serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
          name: user.name || ''
        };
      });

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered mails:', error);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [includeArchives]);

  const handleReset = () => {
    setListName('');
    setIsFiltered(false);
    setIncludeArchives(false);
    fetchMails();
  };

  useEffect(() => {
    if (listName || searchQuery || isFiltered || tag || startDate || endDate) {
      handleFilter();
    }
  }, [listName , searchQuery , tag , value , startDate , endDate]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchMails = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize
      });

      queryParams.append('tabValue', value);

      if (!includeArchives) {
        queryParams.append('archive', 'false');
      }

      const response = await getApi(`${urls.mail.fetchWithPagination}?${queryParams.toString()}`);
      const allMail = response?.data?.data || [];
      const pagination = response?.data?.meta || {};

      const formattedUsers = allMail.map((user, index) => ({
        id: user._id,
        serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
        name: user.name || ''
      }));

      setRows(formattedUsers);
      setTotalRows(pagination?.total);

      const uniqueList = [...new Set(allMail.map((item) => item.name).filter(Boolean))].map((value) => ({
        value,
        label: value
      }));

      setListFilters(uniqueList);
    } catch (error) {
      console.error('Failed to fetch mails:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchtTagData = async () => {
    try {
      const response = await getApi(urls.tag.getAllTags);

      const options = response?.data?.allTags?.map((item) => ({
        value: item._id,
        label: item.name
      }));
      setTagOptions(options);
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  useEffect(() => {
    fetchMails();
    fetchtTagData();
  }, [paginationModel]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      <TabContext value={value}>
        <Grid>
          <Stack direction="row" alignItems="center" justifyContent="space-between" m={1} marginBlock={3}>
            <Tooltip title="Add" arrow>
              <IconButton
                onClick={() => setDialogOpen(true)}
                sx={{
                  backgroundColor: '#009fc7',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  paddingInline: '15px',
                  paddingBlock: '7px',
                  borderRadius: '10px',
                  width: '220px',
                  height: '35px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  gap: 1,
                  fontSize: '14px',
                  padding: '22px',
                  '&:hover': {
                    backgroundColor: '#009fc7'
                  }
                }}
              >
                Add Mailing List <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>

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
                  label="Service User"
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
                  label="Volunteers"
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
                  label="Donors"
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
              </TabList>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '30px',
                paddingLeft: '16px',
                border: '1px solid #e0e0e0',
                width: '489px',
                height: '45px'
              }}
            >
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleFilter();
                  }
                }}
                sx={{
                  '& .MuiInputBase-input::placeholder': {
                    fontSize: '12 px',
                    opacity: 1
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '14px'
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '13px'
                  },
                  '& .MuiInputBase-root.Mui-focused': {
                    backgroundColor: '#e0e0e0'
                  },
                  flex: 1,
                  color: 'text.primary'
                }}
              />
              <IconButton
                onClick={handleFilter}
                sx={{
                  marginRight: '8px',
                  width: 18,
                  height: 18,
                  cursor: 'pointer'
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Stack>
          <Grid container spacing={2}>
            <FilterPanel
              showFilter={showFilter}
              listNames={listFilters}
              listNameFilter={listName}
              setListNameFilter={(value) => setListName(value)}
              tags={tagOptions}
              tagFilter={tag}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setTagFilter={(value) => setTag(value)}
              includeArchives={includeArchives}
            setIncludeArchives={setIncludeArchives}
              selectedFilters={['startDate','endDate','includeArchives']}
              onReset={handleReset}
            />
            <Grid item xs={9}>
              {value === '1' && (
                <TabPanel value="1">
                  <Card style={{ height: '100vh' }}>
                    <DataGrid
                      rows={
                        loading
                          ? []
                          : rows.map((row, index) => ({
                              ...row,
                              sNo: paginationModel.page * paginationModel.pageSize + index + 1
                            }))
                      }
                      columns={columns}
                      rowCount={totalRows}
                      loading={loading}
                      pagination
                      paginationMode="server"
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      onRowSelectionModelChange={(newSelection) => {
                        setSelectedIds(newSelection);
                      }}
                      onRowClick={(row) => {
                        navigate('/view-mailing-data', { state: { id: row?.id } });
                      }}
                      pageSizeOptions={[5, 10, 25, 50]}
                      rowHeight={65}
                      getRowId={(row) => row.id}
                      slots={{
                        toolbar: () => (
                          <CustomHeader
                            entityType="mailingList"
                            title="Service Users Mailing List"
                            selectedIds={selectedIds}
                            enableBulkActions={false}
                            exportEnabled={true}
                            extraActions={null}
                            refetchData={fetchMails}
                          />
                        ),
                        loadingOverlay: () => (
                          <Box
                            sx={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'self-start',
                              justifyContent: 'center',
                              backgroundColor: 'rgba(255, 255, 255, 0.15)'
                            }}
                          >
                            <SingleRowLoader />
                          </Box>
                        ),
                        noRowsOverlay: () => (loading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
                      }}
                      sx={{
                        '& .MuiDataGrid-columnHeaders': {
                          display: 'none'
                        },
                        '& .MuiDataGrid-cell': {
                          textAlign: 'left',
                          fontSize: '14px'
                        },
                        '& .MuiDataGrid-row:hover': {
                          cursor: 'pointer'
                        }
                      }}
                      disableSelectionOnClick
                    />
                  </Card>
                </TabPanel>
              )}

              {value === '2' && (
                <TabPanel value="2">
                  <Card style={{ height: '100vh' }}>
                    <DataGrid
                      rows={
                        loading
                          ? []
                          : rows.map((row, index) => ({
                              ...row,
                              sNo: paginationModel.page * paginationModel.pageSize + index + 1
                            }))
                      }
                      columns={columns}
                      rowCount={totalRows}
                      loading={loading}
                      pagination
                      paginationMode="server"
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      onRowSelectionModelChange={(newSelection) => {
                        setSelectedIds(newSelection);
                      }}
                      onRowClick={(row) => {
                        navigate('/view-mailing-data', { state: { id: row?.id } });
                      }}
                      pageSizeOptions={[5, 10, 25, 50]}
                      rowHeight={65}
                      getRowId={(row) => row.id}
                      slots={{
                        toolbar: () => (
                          <CustomHeader
                            entityType="mailingList"
                            title="Volunteers Mailing List"
                            selectedIds={selectedIds}
                            enableBulkActions={false}
                            exportEnabled={true}
                            extraActions={null}
                            refetchData={fetchMails}
                          />
                        ),
                        loadingOverlay: () => (
                          <Box
                            sx={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'self-start',
                              justifyContent: 'center',
                              backgroundColor: 'rgba(255, 255, 255, 0.15)'
                            }}
                          >
                            <SingleRowLoader />
                          </Box>
                        ),
                        noRowsOverlay: () => (loading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
                      }}
                      sx={{
                        '& .MuiDataGrid-columnHeaders': {
                          display: 'none'
                        },
                        '& .MuiDataGrid-cell': {
                          textAlign: 'left',
                          fontSize: '14px'
                        },
                        '& .MuiDataGrid-row:hover': {
                          cursor: 'pointer'
                        }
                      }}
                      disableSelectionOnClick
                    />
                  </Card>
                </TabPanel>
              )}

              {value === '3' && (
                <TabPanel value="3">
                  <Card style={{ height: '100vh' }}>
                    <DataGrid
                      rows={
                        loading
                          ? []
                          : rows.map((row, index) => ({
                              ...row,
                              sNo: paginationModel.page * paginationModel.pageSize + index + 1
                            }))
                      }
                      columns={columns}
                      rowCount={totalRows}
                      loading={loading}
                      pagination
                      paginationMode="server"
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      onRowSelectionModelChange={(newSelection) => {
                        setSelectedIds(newSelection);
                      }}
                      onRowClick={(row) => {
                        navigate('/view-mailing-data', { state: { id: row?.id } });
                      }}
                      pageSizeOptions={[5, 10, 25, 50]}
                      rowHeight={65}
                      getRowId={(row) => row.id}
                      slots={{
                        toolbar: () => (
                          <CustomHeader
                            entityType="mailingList"
                            title="Donors Mailing List"
                            selectedIds={selectedIds}
                            enableBulkActions={false}
                            exportEnabled={true}
                            extraActions={null}
                            refetchData={fetchMails}
                          />
                        ),
                        loadingOverlay: () => (
                          <Box
                            sx={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'self-start',
                              justifyContent: 'center',
                              backgroundColor: 'rgba(255, 255, 255, 0.15)'
                            }}
                          >
                            <SingleRowLoader />
                          </Box>
                        ),
                        noRowsOverlay: () => (loading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
                      }}
                      sx={{
                        '& .MuiDataGrid-columnHeaders': {
                          display: 'none'
                        },
                        '& .MuiDataGrid-cell': {
                          textAlign: 'left',
                          fontSize: '14px'
                        },
                        '& .MuiDataGrid-row:hover': {
                          cursor: 'pointer'
                        }
                      }}
                      disableSelectionOnClick
                    />
                  </Card>
                </TabPanel>
              )}
            </Grid>
          </Grid>
        </Grid>
      </TabContext>
      <ChooseTypeDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Card>
  );
};

export default Mail;
