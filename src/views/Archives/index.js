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
import DeleteIcon from '@mui/icons-material/Delete';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
const Archieves = () => {
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
            backgroundColor: '#F5F5F5',
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
              <UnarchiveOutlinedIcon color="action" />
            </IconButton>
            <IconButton>
              <DeleteIcon color="error" />
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
    <Card sx={{ backgroundColor: '#EEF2F6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" mb={2} spacing={2}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
            Archives
          </Typography>
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
                  bgcolor: '#E0E0E0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': { bgcolor: '#D6D6D6' }
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
                  bgcolor: '#E0E0E0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': { bgcolor: '#D6D6D6' }
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
                  backgroundColor: '#F9F9F9'
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
    </Card>
  );
};
export default Archieves;