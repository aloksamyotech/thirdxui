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
import { toast } from 'react-toastify';

const Tag = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [tags, setTags] = useState([]);

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
    { field: 'name', headerName: 'Configrution', flex: 1 },
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

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getApi(urls.tag.getAllTags);
        setTags(response?.data?.allTags);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchTags();
  }, []);

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
              // value={searchQuery}
              // onChange={handleSearchChange}
              // onKeyPress={(e) => {
              //   if (e.key === 'Enter') {
              //     handleFilter();
              //   }
              // }}
              sx={{
                flex: 1,
                color: 'text.primary'
              }}
            />
            <IconButton
              // onClick={handleFilter}
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
            statuses={statusFilter}
            setStatusFilter={setStatus}
            selectedFilters={['configurationNameFilter', 'statusFilter']}
          />
          <Grid item xs={9}>
            <TableStyle>
              <Box width="100%">
                <Card style={{ height: 'auto' }}>
                  <DataGrid
                    rows={tags}
                    columns={columns}
                    rowHeight={65}
                    getRowId={(row) => row._id}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    components={{
                      Toolbar: () => <CustomHeader />
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
