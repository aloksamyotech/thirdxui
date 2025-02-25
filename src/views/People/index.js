import { useState } from 'react';
import {
  Stack,
  Grid,
  Typography,
  Box,
  Card,
  IconButton,
  Tooltip,
  Pagination,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import AddCaseForm from './AddPeople.js';
import CloseIcon from '@mui/icons-material/Close';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Lead = () => {
  const [showForm, setShowForm] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleSelectPerson = () => {
    setShowForm(true);
    handleCloseDialog();
  };

  const CustomHeader = ({ pageSize, setPageSize, page, setPage, totalPages }) => {
    return (
      <Box sx={{ height: '50px', display: 'flex', alignItems: 'center' }}>
        <GridToolbarContainer
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
            width: '100%',
            height: '100%',
            padding: '0 12px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              ml: 2,
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            PEOPLE LIST
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Rows per page:</Typography>
            <Select value={pageSize} onChange={(e) => setPageSize(e.target.value)} size="small" sx={{ height: '30px' }}>
              {[5, 10, 20, 50].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
            <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} size="small" />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  const columns = [
    {
      field: 'person',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* Conditional Icon Rendering */}
            {params.row.type === 'person' ? <PersonIcon /> : <ApartmentIcon />}

            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {params.row.name} #{params.row.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.address}
              </Typography>
            </Box>
          </Stack>

          <Tooltip title="Info" arrow>
            <IconButton>
              <InfoIcon color="action" />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  const rows = [
    { id: 'C-001', name: 'John Doe', address: '123 Main Street, New York, NY 10001', type: 'person' },
    { id: 'C-002', name: 'Jane Smith', address: '456 Elm Street, Los Angeles, CA 90001', type: 'apartment' },
    { id: 'C-003', name: 'Michael Johnson', address: '789 Oak Street, Chicago, IL 60601', type: 'person' },
    { id: 'C-004', name: 'Emily Davis', address: '321 Pine Avenue, Houston, TX 77001', type: 'apartment' },
    { id: 'C-005', name: 'David Brown', address: '654 Maple Drive, Miami, FL 33101', type: 'person' },
    { id: 'C-006', name: 'Sophia Wilson', address: '987 Cedar Lane, San Francisco, CA 94101', type: 'apartment' }
  ];
  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      {showForm ? (
        <AddCaseForm onCancel={() => setShowForm(false)} />
      ) : (
        <Grid>
          <Stack direction="row" alignItems="center" mb={2} spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
              Add People
            </Typography>
            <Tooltip title="Add Case" arrow>
              <IconButton
                onClick={handleOpenDialog}
                sx={{
                  backgroundColor: '#2196f3',
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
                    backgroundColor: '#1565c0',
                    color: '#ffffff'
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: { minHeight: 300, maxHeight: 350 }
            }}
          >
            <DialogTitle sx={{ fontSize: '1rem', textAlign: 'center' }}>
              Choose which type of person you would like to add
              <IconButton onClick={handleCloseDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Stack direction="row" spacing={4} justifyContent="center">
                <Box
                  onClick={handleSelectPerson}
                  sx={{
                    width: 160,
                    height: 160,
                    bgcolor: '#e0e0e0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { bgcolor: '#d6d6d6' }
                  }}
                >
                  <PersonIcon sx={{ fontSize: 50, color: '#333' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                    Service User
                  </Typography>
                </Box>

                <Box
                  onClick={handleSelectPerson}
                  sx={{
                    width: 160,
                    height: 160,
                    bgcolor: '#e0e0e0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { bgcolor: '#d6d6d6' }
                  }}
                >
                  <VolunteerActivismIcon sx={{ fontSize: 50, color: '#333' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                    Volunteer
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>
          </Dialog>

          <Box width="100%">
            <Card style={{ height: '600px' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={65}
                getRowId={(row) => row.id}
                pageSize={pageSize}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
                pagination
                page={page - 1}
                onPageChange={(newPage) => setPage(newPage + 1)}
                rowCount={rows.length}
                paginationMode="client"
                components={{
                  Toolbar: () => (
                    <CustomHeader
                      pageSize={pageSize}
                      setPageSize={setPageSize}
                      page={page}
                      setPage={setPage}
                      totalPages={Math.ceil(rows.length / pageSize)}
                    />
                  )
                }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    display: 'none'
                  },
                  '& .MuiDataGrid-row:nth-of-type(2n)': {
                    backgroundColor: '#f9f9f9'
                  },
                  '& .MuiDataGrid-cell': {
                    textAlign: 'left',
                    fontSize: '14px'
                  }
                }}
                disableSelectionOnClick
                hideFooter
              />
            </Card>
          </Box>
        </Grid>
      )}
    </Card>
  );
};

export default Lead;
