import { Box, Card, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from 'react-router';
import { DataGrid } from '@mui/x-data-grid';
import CustomHeader from 'components/CustomHeader';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';


const ViewMailingListData = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const location = useLocation();
    const id = location?.state?.id;
    const [selectedIds, setSelectedIds] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10
    });
    const [mailData, setMailData] = useState();

    const fetchMails = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams({
                page: paginationModel.page + 1,
                limit: paginationModel.pageSize
            });

            //   if (!includeArchives) {
            //     queryParams.append('archive', 'false');
            //   }

            const response = await getApi(`${urls.mail.fetchMailingListData}/${id}?${queryParams.toString()}`);
            const users = response?.data?.users || [];
            const pagination = response?.data?.meta || {};

            const formattedUsers = users.map((user, index) => ({
                id: user._id,
                serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
                name: `${user.personalInfo.firstName} ${user.personalInfo.lastName}` || ''
            }));

            setMailData(response?.data?.mailData)

            setRows(formattedUsers);
            setTotalRows(pagination?.total);
        } catch (error) {
            console.error('Failed to fetch mails:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMails();
    }, []);

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

    return (
        <>
            <Grid item xs={12}>
                <Stack direction="row" alignItems="center">
                    <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
                        <IconButton onClick={() => navigate(-1)}>
                            <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
                        </IconButton>
                        {mailData?.name}
                    </Typography>
                </Stack>
            </Grid>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <Card sx={{ height: '500px', width: '100%', backgroundColor: '#ffff' }}>
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
                            pageSizeOptions={[5, 10, 25, 50]}
                            rowHeight={65}
                            getRowId={(row) => row.id}
                            slots={{
                                toolbar: () => (
                                    <CustomHeader
                                        entityType="mailingList"
                                        title={mailData?.name}
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
                                }
                            }}
                            disableSelectionOnClick
                        />
                    </Card>
                </Grid>
            </Grid>
        </>
    )
};

export default ViewMailingListData;