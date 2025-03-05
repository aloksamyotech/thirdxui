import { useState } from 'react';
import { Stack, Grid, Typography, Box, Card,Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import AddTag from './AddTag.js';
import AntSwitch from 'components/AntSwitch.js';

const Tag = () => {
  const [showForm, setShowForm] = useState(false);
  const columns = [
    { field: 'name', headerName: 'CONFIGURATION', flex: 1 },
    {
      field: 'status',
      headerName: 'STATUS',
      renderCell: (params) => <AntSwitch defaultChecked={params.value} color="primary" />,
      flex: 1
    }
  ];

  const rows = [
    { id: 1, name: 'Adoption Enquirer', status: true },
    { id: 2, name: 'Adoption Gift Recipients', status: true },
    { id: 3, name: 'Past Adopters', status: true },
    { id: 4, name: 'Current Adopters', status: true },
    { id: 5, name: 'Self Referral', status: true }
  ];

  return (
    <Card sx={{ backgroundColor: '#EEF2F6' }}>
      {showForm ? (
        <AddTag onCancel={() => setShowForm(false)} />
      ) : (
        <Grid>
          <Stack direction="row" alignItems="center" mb={2} spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
              Add Tag Category
            </Typography>
            <Tooltip title="Add Tag Category" arrow>
              <IconButton
                onClick={() => setShowForm(true)}
                sx={{
                  backgroundColor: '#41C048',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: 3,
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#41C048',
                    color: '#ffffff'
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Box width="100%">
            <Card style={{ height: '465px' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={65}
                getRowId={(row) => row.id}
                pageSize={5}
                sx={{
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#f5f5f5'
                  },
                  '& .MuiDataGrid-row:nth-of-type(2n)': {
                    backgroundColor: '#F9F9F9'
                  },
                  '& .MuiDataGrid-cell': {
                    textAlign: 'left',
                    fontSize: '14px'
                  }
                }}
                disableSelectionOnClick
              />
            </Card>
          </Box>
        </Grid>
      )}
    </Card>
  );
};
export default Tag;
