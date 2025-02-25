/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';

import AddPolicy from './AddPolicy';

// ----------------------------------------------------------------------

const policyData = [
  {
    id: 1,
    policyNumber: '5588',
    policyType: 'Auto Insurance',
    policyStartDate: '08/01/2024',
    phoneEndDate: '09/01/2024',
    policyStatus: 'active'
  }
];
const PolicyManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'policyNumber',
      headerName: 'Policy Number',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'policyType',
      headerName: 'Policy Type',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'policyStartDate',
      headerName: 'Policy start Date',
      flex: 1
    },
    {
      field: 'phoneEndDate',
      headerName: 'Policy end Date',
      flex: 1
    },
    {
      field: 'policyStatus',
      headerName: 'Policy status',
      flex: 1
    }
  ];
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddPolicy open={openAdd} handleClose={handleCloseAdd} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Policy-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Policy
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={policyData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default PolicyManagement;
