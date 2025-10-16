import { useState, useEffect } from 'react';
import { Stack, Button, Grid, Typography, Box, Card, TextField, InputBase, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import TableStyle from '../../ui-component/TableStyle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import FilterPanel from 'components/FilterPanel.js';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import AddCaseForm from 'views/AddTransaction';
import { Dialog } from '@mui/material';
import CustomHeader from 'components/CustomHeader';

const dateAddedFilters = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 1 Year' }
];

const Financial = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [name, setNameFilter] = useState('');
  const [nameFilters, setNameFilters] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [campaign, setCampaignFilter] = useState('');
  const [user, setUser] = useState([]);
  const [assignedTo, setAssignedTo] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const navigate = useNavigate();
  const [isFiltered, setIsFiltered] = useState(false);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);
  const [campaignTypeOptions, setCampaignTypeOptions] = useState([]);
  const [donorOptions, setDonorOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const renderWithDash = (value) => {
    return value !== 'N/A' && value !== undefined && value !== null && value !== '' ? value : '-';
  };

  const columns = [
    {
      field: 'title',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => <Typography>{renderWithDash(params.value)}</Typography>
    },
    {
      field: 'type',
      headerName: 'Name',
      flex: 1.5,
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: 'normal',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {renderWithDash(params.value)}
        </Typography>
      )
    },
    {
      field: 'code',
      headerName: 'Campaign',
      flex: 1,
      renderCell: (params) => <Typography>{renderWithDash(params.value)}</Typography>
    },
    {
      field: 'status',
      headerName: 'Amount',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const rawValue = params.value;

        const formatAmount = (amount) => {
          if (!amount) return '-';
          const numericValue = parseFloat(String(amount).replace(/[^0-9.]/g, ''));
          if (isNaN(numericValue)) return '-';
          if (numericValue >= 1_000_000_000) return `$${(numericValue / 1_000_000_000).toFixed(1)}B`;
          if (numericValue >= 1_000_000) return `$${(numericValue / 1_000_000).toFixed(1)}M`;
          if (numericValue >= 1_000) return `$${(numericValue / 1_000).toFixed(1)}K`;
          return `$${numericValue}`;
        };

        return <Typography sx={{ color: 'green' }}>{renderWithDash(formatAmount(rawValue))}</Typography>;
      }
    },
    {
      field: 'more',
      headerName: 'Transaction Id',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <Typography>{renderWithDash(params.value)}</Typography>
    }
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (assignedTo) queryParams.append('donorId', assignedTo);
      if (campaignName) queryParams.append('campaign', campaignName);
       if (startDate) {
        queryParams.append('startDate', new Date(startDate).toISOString());
      }
      if (endDate) {
        queryParams.append('endDate', new Date(endDate).toISOString());
      }
      if (dateOpenedFilter && dateOpenedFilter !== '') {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('createdAt', formattedDate);
      }

      if (searchQuery && searchQuery.trim() !== '') {
        queryParams.append('search', searchQuery.trim());
      }

      queryParams.append('page', paginationModel.page + 1);
      queryParams.append('limit', paginationModel.pageSize);

      const url = `${urls.transaction.fetchWithPagination}?${queryParams.toString()}`;
      const response = await getApi(url);

      const allTransaction = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const formattedUsers = allTransaction.map((item, index) => {
        const donor = item?.donorId;
        const donorName =
          donor?.subRole === 'donar_individual'
            ? `${donor?.personalInfo?.firstName || ''} ${donor?.personalInfo?.lastName || ''}`.trim()
            : donor?.companyInformation?.companyName || '';

        return {
          id: item._id || index,
          title: renderWithDash(item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''),
          type: renderWithDash(donorName),
          code: renderWithDash(item.campaign?.name),
          status: renderWithDash(item.amountPaid != null ? `₹${item.amountPaid}` : ''),
          more: renderWithDash(item.transactionId)
        };
      });

      setTotalRows(pagination?.total);
      setRows(formattedUsers);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setCampaignName('');
    setCampaignFilter('');
    setNameFilter('');
    setDateOpenedFilter('');
    setIsFiltered(false);
    fetchData();
  };

  useEffect(() => {
    if (assignedTo || dateOpenedFilter || isFiltered || searchQuery || startDate || endDate || campaignName) {
      handleFilter();
    }
  }, [assignedTo, dateOpenedFilter, startDate, endDate,searchQuery, campaignName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getApi(
        `${urls.transaction.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`
      );

      const allTransaction = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };
      const formattedTransactions = allTransaction?.map((item, index) => {
        const donorName =
          `${item?.donorId?.personalInfo?.firstName || ''} ${item?.donorId?.personalInfo?.lastName || ''}`.trim() ||
          item?.donorId?.companyInformation?.companyName;

        return {
          id: item._id || index,
          title: renderWithDash(item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''),
          type: renderWithDash(donorName),
          code: renderWithDash(item.campaign?.name || item.campaign),
          status: renderWithDash(item.amountPaid != null ? `₹${item.amountPaid}` : ''),
          more: renderWithDash(item.transactionId)
        };
      });

      setRows(formattedTransactions);

      setTotalRows(pagination?.total);
      const nameOptions = allTransaction
        .filter((item) => item?.donorId)
        .map((item) => {
          const donor = item.donorId;
          const hasPersonalInfo = donor?.personalInfo?.firstName || donor?.personalInfo?.lastName;
          const label = hasPersonalInfo
            ? `${donor.personalInfo?.firstName || ''} ${donor.personalInfo?.lastName || ''}`.trim()
            : donor.companyInformation?.companyName || '';

          return {
            value: donor._id || '',
            label
          };
        })
        .filter((option) => option.value && option.label);

      setNameFilters(nameOptions);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);

        const options = response?.data?.allConfiguration
          ?.filter((item) => item.configurationType === 'Campaign')
          ?.map((item) => ({
            value: item._id,
            label: item.name
          }));

        setCampaignTypeOptions(options);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchCampaign();
  }, []);
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await getApi(urls.serviceuser.getalldonor);
        const options = response?.data?.allDonor?.map((donor) => ({
          value: donor._id,
          label:
            donor.companyInformation?.companyName || `${donor.personalInfo?.firstName || ''} ${donor.personalInfo?.lastName || ''}`.trim()
        }));

        setDonorOptions(options);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    fetchDonors();
  }, []);

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={1} marginBlock={3}>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={handleOpen}
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
              Add Transaction
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <AddCaseForm onCancel={handleClose} fetchTransections={fetchData} />
          </Dialog>

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
            dateAddedFilters={dateAddedFilters}
            dateOpenedFilter={dateOpenedFilter}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
            names={donorOptions}
            nameFilter={assignedTo}
            setNameFilter={(value) => setAssignedTo(value)}
            campaigns={campaignTypeOptions}
            campaignFilter={campaignName}
            setCampaignFilter={(value) => setCampaignName(value)}
            selectedFilters={['startDate','endDate',"campaignFilter",]}
            onReset={handleReset}
            customDateLabel="By Date"
          />

          <Grid item xs={9}>
            <TableStyle>
              <Box width="100%">
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
                    rowHeight={65}
                    loading={loading}
                    getRowId={(row) => row.id}
                     onRowClick={(params) => {
                        navigate('/view-transaction', { state: { id : params?.row?.id } });
                      }}
                    pagination
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    onRowSelectionModelChange={(newSelection) => {
                      setSelectedIds(newSelection);
                    }}
                    pageSizeOptions={[5, 10, 25, 50]}
                    slots={{
                      toolbar: () => (
                        <CustomHeader
                          entityType="donationTransaction"
                          title="Transaction Information"
                          selectedIds={selectedIds}
                          enableBulkActions={false}
                          exportEnabled={true}
                          extraActions={null}
                          refetchData={fetchData}
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
                    getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
                    sx={{
                      '& .MuiDataGrid-columnHeaders': {
                        fontSize: '14px',
                        backgroundColor: '#f9f9f9'
                      },
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

export default Financial;
