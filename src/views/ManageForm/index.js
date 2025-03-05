import {
  Stack,
  Grid,
  Typography,
  Card,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddFormModal from './AddForm.js';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import GetAppIcon from '@mui/icons-material/GetApp';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import FilterPanel from "components/FilterPanel"; 

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

const columns = [
  { field: 'description', headerName: 'DESCRIPTION', flex: 1 },
  { field: 'campaign', headerName: 'FORM CAMPAIGN', flex: 1 },
  {
    field: 'title',
    headerName: 'FORM DISPLAY TITLE',
    flex: 1,
    renderCell: () => <Chip label="HELP US..." sx={{ bgcolor: '#e5f8fe', color: '#79dbfb', fontWeight: 'bold' }} />
  }
];

const initialRows = [
  { id: 1, description: 'Self Referral form', campaign: 'Beach Cleaning -Corporate volunteer project 2019', title: 'Satisfaction Survey' },
  { id: 2, description: 'Community Referral form', campaign: 'Form Campaign', title: 'Community Referral' },
  { id: 3, description: 'Satisfaction survey', campaign: 'Beach Cleaning -Corporate volunteer project 2019', title: 'Volunteer Signup' },
  { id: 4, description: 'Volunteer sign up form', campaign: 'Form Campaign' },
  { id: 5, description: 'Workshop sign up form', campaign: 'Beach Cleaning -Corporate volunteer project 2019' }
];
const Lead = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [formType, setFormType] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [rows, setRows] = useState(initialRows);
  const [formTypeAnchor, setFormTypeAnchor] = useState(null);
  const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
  const [showFilter, setShowFilter] = useState(true);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <>
      <Grid>
        <AddFormModal open={openAdd} onClose={handleCloseAdd} />
        <Card sx={{ backgroundColor: '#eef2f6' }}>
          <Grid>
            <Stack direction="row" alignItems="center" mb={2} spacing={2}>
              <Typography variant="h4">Add Form</Typography>
              <Tooltip title="Add Case" arrow>
                <IconButton
                  onClick={handleOpenAdd}
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
          </Grid>

          <Grid container spacing={3}>
              <FilterPanel
                showFilter={showFilter}
                formTypes={formTypes}
                setFormType={setFormType}
                dateFilters={dateFilters}
                setDateFilter={setDateFilter}
              />

            <Grid item xs={9}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ bgcolor: '#eef2f6', p: 1, borderRadius: 1 }}>
                <Stack direction="row" spacing={1}>
                  <IconButton title="Export" sx={{ color: 'grey' }}>
                    <GetAppIcon />
                  </IconButton>
                  <IconButton title="Filter" sx={{ color: 'grey' }}>
                    <FilterListIcon />
                  </IconButton>
                  <IconButton title="Search" sx={{ color: 'grey' }}>
                    <SearchIcon />
                  </IconButton>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <IconButton title="Download PDF" sx={{ color: 'grey' }}>
                    <PictureAsPdfIcon />
                  </IconButton>
                  <IconButton title="Print" sx={{ color: 'grey' }}>
                    <PrintIcon />
                  </IconButton>
                </Stack>
              </Stack>
              <Card style={{ height: '440px' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  rowHeight={60}
                  getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
                  sx={{
                    '& .even-row': { backgroundColor: '#ffffff' },
                    '& .odd-row': { backgroundColor: '#f5f5f5' },
                    '& .MuiDataGrid-row': {
                      borderBottom: '1px solid #ccc'
                    },
                    '& .MuiDataGrid-columnHeader': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default Lead;
