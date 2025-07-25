import React, { useState, useEffect } from 'react';
import { Button, Grid, Stack, Box, Typography, InputBase, IconButton, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';

const Duplicate = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getApi(urls.duplicate.getallDuplicateUsers);
        const formatted = [];

        response?.data?.forEach((group, groupIndex) => {
          const names = [];
          const emails = [];
          const phones = [];
          const dobs = [];
          const ids = [];
          const added = [];
          group.users.forEach((user) => {
            ids.push(user._id);
            names.push(`${user.personalInfo?.firstName || ''} ${user.personalInfo?.lastName || '-'}`.trim());
            emails.push(user.contactInfo?.email || '-');
            phones.push(user.contactInfo?.homePhone || '-');
            dobs.push(user.personalInfo?.dateOfBirth ? new Date(user.personalInfo.dateOfBirth).toLocaleDateString() : '-');
            added.push(user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-');
          });

          formatted.push({
            id: groupIndex + 1,
            ids,
            names,
            emails,
            phones,
            dobs,
            groupIndex,
            added
          });
        });
        setUser(formatted);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  const columns = [
    {
      field: 'names',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            height: '100%',
            py: 3.5
          }}
        >
          {params.row.names.map((name, idx) => (
            <Typography key={idx} sx={{ fontSize: '12px' }}>
              {name}
            </Typography>
          ))}
        </Box>
      )
    },

    {
      field: 'emails',
      headerName: 'Email',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '15px',
            height: '100%'
          }}
        >
          {params.row.emails.map((email, idx) => (
            <Typography key={idx} sx={{ fontSize: '12px' }}>
              {email}
            </Typography>
          ))}
        </Box>
      )
    },
    {
      field: 'phones',
      headerName: 'Phone',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '25px',
            height: '100%'
          }}
        >
          {params.row.phones.map((phone, idx) => (
            <Typography key={idx} sx={{ fontSize: '12px' }}>
              {phone}
            </Typography>
          ))}
        </Box>
      )
    },
    {
      field: 'dobs',
      headerName: 'Date of Birth',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '15px',
            height: '100%'
          }}
        >
          {params.row.dobs.map((dob, idx) => (
            <Typography key={idx} sx={{ fontSize: '12px' }}>
              {dob}
            </Typography>
          ))}
        </Box>
      )
    },
    {
      field: 'view',
      headerName: 'View',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() =>
            navigate('/view-duplicates', {
              state: {
                ids: params.row.ids,
                names: params.row.names,
                emails: params.row.emails,
                phones: params.row.phones,
                dobs: params.row.dobs,
                added: params.row.added
              }
            })
          }
          sx={{ backgroundColor: '#e6f7ff' }}
        >
          <Visibility sx={{ fontSize: '16px' }} />
        </IconButton>
      )
    }
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
              fontWeight: '500',
              color: '#333',
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            Duplicate List
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  return (
    <>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography fontWeight="600" fontSize="14px" display="flex" alignItems="center">
            Duplicates
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '30px',
              paddingLeft: '16px',
              border: '1px solid #e0e0e0',
              width: '489px',
              height: '40px'
            }}
          >
            <InputBase
              placeholder="Search..."
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
          <Grid item xs={12}>
            <Box sx={{ boxShadow: 1, borderRadius: 2, overflow: 'hidden', bgcolor: '#fff', height: '500px' }}>
              <DataGrid
                rows={loading ? [] : user}
                columns={columns}
                loading={loading}
                getRowId={(row) => row.id}
                pagination={false}
                getRowHeight={() => 'auto'}
                hideFooterPagination
                hideFooter
                slots={{
                  toolbar: () => <CustomHeader />,
                  loadingOverlay: () => (
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      <SingleRowLoader />
                    </Box>
                  ),
                  noRowsOverlay: () => (loading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
                }}
                sx={{
                  '& .MuiDataGrid-row': {
                    borderBottom: '1px solid #ccc'
                  },
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Duplicate;
