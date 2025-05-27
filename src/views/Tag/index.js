import { useState } from 'react';
import { Stack, Grid, Typography, Box, Card, TextField, Tooltip, IconButton, InputBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AntSwitch from 'components/AntSwitch.js';
import FilterPanel from 'components/FilterPanel.js';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';

const Tag = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [configurationNameFilter, setConfigurationNameFilter] = useState('');
  const [configurationNames, setconfigurationNames] = useState([]);
  const [tags, setTags] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);

  const statusFilter = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const CustomHeader = () => {
    return (
      <Box sx={{ height: '50px', display: 'flex', alignItems: 'center' }}>
        <GridToolbarContainer
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            width: '100%',
            height: '100%',
            padding: '0 12px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: '450',
              color: '#333',
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            Tag List
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Configuration',
      flex: 1,
      renderCell: (params) => {
        const value = params.value;
        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
        return capitalized;
      }
    },
    // { field: 'tagCategoryName', headerName: 'Category', flex: 1 },
    // { field: 'tagDescription', headerName: 'Description', flex: 1 },
    {
      field: 'isActive',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const handleToggle = (event) => {
          const newStatus = event.target.checked;
          handleStatusChange(params.row._id, newStatus);
        };

        return <AntSwitch defaultChecked={params.value} color="primary" onChange={handleToggle} />;
      }
    }
  ];

  const handleFilter = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (status) queryParams.append('status', status === 'active' ? 'true' : 'false');
      if (searchQuery) queryParams.append('search', searchQuery);
      if (configurationNameFilter) queryParams.append('categoryName', configurationNameFilter);
      queryParams.append('page', paginationModel.page + 1);
      queryParams.append('limit', paginationModel.pageSize);
      const url = `${urls.tag.fetchWithPagination}?${queryParams.toString()}`;
      const response = await getApi(url);
      const allTags = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      setTags(allTags);
      setTotalRows(pagination?.total);
      setIsFiltered(true);
    } catch (error) {
      toast.error('Failed to fetch filtered tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (configurationNameFilter || status || searchQuery || isFiltered) {
      handleFilter();
    }
  }, [configurationNameFilter, status, searchQuery]);

  const handleReset = () => {
    setStatus('');
    setConfigurationNameFilter('');
    setSearchQuery('');
    setIsFiltered(false);
    fetchTags();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    handleFilter();
  };

  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await getApi(`${urls.tag.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`);
      const allTags = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      setTags(allTags);
      setTotalRows(pagination?.total);
      const uniqueList = [...new Set(allTags.map((item) => item.tagCategoryName).filter(Boolean))].map((value) => ({
        value,
        label: value
      }));
      setconfigurationNames(uniqueList);
    } catch (error) {
      toast.error('Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [paginationModel]);

  const handleStatusChange = async (tagId, newStatus) => {
    try {
      await updateApi(`${urls.tag.updateStatus}/${tagId}`, {
        isActive: newStatus
      });
      toast.success('Tag update successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => navigate('/add-tag')}
              sx={{
                backgroundColor: '#009fc7',
                borderRadius: '4px',
                width: '220px',
                height: '35px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                gap: 1,
                fontSize: '14px',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  color: '#ffffff'
                }
              }}
            >
              Add New Tag
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '30px',
              paddingLeft: '16px',
              border: '1px solid #e0e0e0',
              width: '350px',
              height: '40px'
            }}
          >
            <InputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              sx={{
                flex: 1,
                color: 'text.primary'
              }}
            />
            <IconButton
              onClick={handleSearch}
              sx={{
                marginRight: '8px',
                width: 32,
                height: 32,
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
            configurationNames={configurationNames}
            configurationNameFilter={configurationNameFilter}
            setConfigurationNameFilter={(value) => setConfigurationNameFilter(value)}
            statuses={statusFilter}
            statusFilter={status}
            setStatusFilter={(value) => setStatus(value)}
            selectedFilters={['configurationNameFilter', 'statusFilter']}
            onReset={handleReset}
            onApplyFilter={handleFilter}
          />

          <Grid item xs={9}>
            <TableStyle>
              <Box width="100%">
                <Card style={{ height: '100vh' }}>
                  <DataGrid
                    rows={
                      loading
                        ? []
                        : tags.map((row, index) => ({
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
                    pageSizeOptions={[10]}
                    rowHeight={65}
                    getRowId={(row) => row._id}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    slots={{
                      toolbar: () => <CustomHeader />,
                      loadingOverlay: () => (
                        <Box
                          sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'self-start',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                          }}
                        >
                          <SingleRowLoader />
                        </Box>
                      ),
                      noRowsOverlay: () => (loading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
                    }}
                    getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
                    sx={{
                      '& .MuiDataGrid-row': {
                        borderBottom: '1px solid #ccc'
                      }
                    }}
                  />
                </Card>
              </Box>
            </TableStyle>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Tag;
